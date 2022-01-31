import { Construct, Node } from 'constructs';
import * as K8s from './imports/k8s';


export interface SkoonerOptions {
  /**
   * Setup external access using a node port, an ingress or neither. If set to ingress, then accessHost must also be provided
   * @default  AccessType.NONE
   */
  readonly accessType?: AccessType;

  /**
   * When using an Ingress access type, provide the hostname for the ingress rule
   */
  readonly accessHost?: string;

  /**
   * Additional labels to apply to resources.
   * @default - none
   */
  readonly labels?: { [name: string]: string };

  /**
   * Port on which to expose the container externally
   * @default 80
   */
  readonly port?: number;

  /**
   * Type of login the generate (OIDC environment variables, service account or none)
   * @default None
   */
  readonly loginType?: LoginType;

  /**
   * Name of the secret used to store OIDC information (url, id, secret) when using OIDC login type
   * @default skooner
   */
  readonly secretNameOIDC?: string;

  /**
   * Name of service account to be created when using Service Account login type
   * @default skooner-sa
   */
  readonly serviceAccountName?: string;

  /**
   * Role to be assigned to service account when using Service Account login type
   * @default cluster-admin
   */
  readonly serviceAccountRole?: string;
}

/**
 * Controls whether we create a node port, an ingress or a cluster IP
 */
export enum AccessType {
  INGRESS = 'Ingress',
  NODE_PORT = 'NodePort',
  NONE = 'None'
}

/**
 * Dictates if we will generate environment varaibles to hook up with an OIDC secret, a service account
 * and assoicate role binding or none of the above
 */
export enum LoginType {
  OIDC = 'OIDC',
  SERVICE_ACCOUNT = 'ServiceAccount',
  NONE = 'None'
}

/**
 * Main class to create the skooner manifests
 */
export class Skooner extends Construct {

  constructor(scope: Construct, id: string, options: SkoonerOptions = { }) {
    super(scope, id);

    // Fixed parameters for the different objects that make up the chart

    const targetPort : number = 4654;
    const skoonerStr : string = 'skooner';
    const namespace : string = 'kube-system';
    const image : string = 'ghcr.io/skooner-k8s/skooner:stable';
    const nodeSelector: {[p: string]: string} = { 'kubernetes.io/os': 'linux' };
    const metadata : K8s.ObjectMeta = { name: skoonerStr, namespace: namespace };

    // Options setup based on end user selections

    const accessType = options.accessType ?? AccessType.NONE;
    const port = options.port ?? 80;
    const accessHost = options.accessHost ?? '';
    const secretNameOIDC = options.secretNameOIDC ?? skoonerStr;
    const loginType = options.loginType ?? LoginType.NONE;
    const label : {[p: string]: string} = { ...options.labels, app: Node.of(this).addr };
    const serviceAccountName = options.serviceAccountName ?? 'skooner-sa';
    const serviceAccountRole = options.serviceAccountRole ?? 'cluster-admin';

    // Main manifest generation processing

    let envVars = this.setupEnvVars(loginType, secretNameOIDC);

    this.setupDeployment(skoonerStr, metadata, label, envVars, image, targetPort, nodeSelector);

    this.setupService(accessType, skoonerStr, metadata, port, targetPort, label);

    this.setupIngress(accessType, accessHost, skoonerStr, metadata);

    this.setupServiceAccount(loginType, skoonerStr, serviceAccountName, serviceAccountRole);

  }

  /**
   * Generate the deployment manifest
   * @param skoonerStr Name to be added to object id
   * @param metadata Metadata to be added to service
   * @param label Labels to be added to deployment
   * @param envVars Environment variables associated with the deployment
   * @param image Image to be pulled and deployed
   * @param targetPort Port used by the container
   * @param nodeSelector node selection constraint value
   * @private
   */
  private setupDeployment(skoonerStr: string, metadata: K8s.ObjectMeta,
    label: { [p: string]: string }, envVars: K8s.EnvVar[],
    image: string, targetPort: number,
    nodeSelector: { [p: string]: string }) {

    new K8s.KubeDeployment(this, 'dep' + skoonerStr, {
      metadata: metadata,
      spec: {
        replicas: 1,
        selector: { matchLabels: label },
        template: {
          metadata: { labels: label },
          spec: {
            containers: [
              {
                env: envVars,
                name: skoonerStr,
                image: image,
                ports: [{ containerPort: targetPort }],
                livenessProbe: {
                  httpGet: {
                    scheme: 'HTTP',
                    path: '/',
                    port: K8s.IntOrString.fromNumber(targetPort),
                  },
                  initialDelaySeconds: 30,
                  timeoutSeconds: 30,
                },
              },
            ],
            nodeSelector: nodeSelector,
          },
        },
      },
    });
  }

  /**
   * Generate the service for the application. Depending on the access type, it will create a
   * cluster IP or a node port
   * @param accessType Indicates the type of service to be created (node port or cluster IP)
   * @param skoonerStr Name to be added to object id
   * @param metadata Metadata to be added to service
   * @param port Port number to expose service
   * @param targetPort Port number on the container
   * @param label Selector label
   * @private
   */
  private setupService(accessType: AccessType, skoonerStr: string,
    metadata: K8s.ObjectMeta, port: number,
    targetPort: number, label: { [p: string]: string }) {

    let serviceType = 'ClusterIP';
    if (accessType == AccessType.NODE_PORT) {
      serviceType = 'NodePort';
    }

    new K8s.KubeService(this, 'svc' + skoonerStr, {
      metadata: metadata,
      spec: {
        type: serviceType,
        ports: [{
          port: port,
          targetPort: K8s.IntOrString.fromNumber(targetPort),
        }],
        selector: label,
      },
    });
  }

  /**
   * Generate the OIDC related enviroment varaibles if needed
   * @param loginType If value set to OIDC, generate the environment variables,
   * otherwise return an empty array
   * @param secretNameOIDC Name of the secret where the values for the OIDC parameters
   * are stored
   * @private
   */
  private setupEnvVars(loginType: LoginType, secretNameOIDC: string) {
    let envVars: K8s.EnvVar[] = [];
    if (loginType == LoginType.OIDC) {
      envVars = [
        {
          name: 'OIDC_URL',
          valueFrom: {
            secretKeyRef: {
              name: secretNameOIDC,
              key: 'url',
            },
          },
        },
        {
          name: 'OIDC_CLIENT_ID',
          valueFrom: {
            secretKeyRef: {
              name: secretNameOIDC,
              key: 'id',
            },
          },
        },
        {
          name: 'OIDC_SECRET',
          valueFrom: {
            secretKeyRef: {
              name: secretNameOIDC,
              key: 'secret',
            },
          },
        },
      ];
    }
    return envVars;
  }

  /**
   * Create and ingress for the application, if needed
   * @param accessType If set to Ingress and the accessHost is not empty, create the ingress
   * @param accessHost If not empty and the accessType is set ot Ingress, create the ingress
   * @param skoonerStr Name to be added to object id
   * @param metadata Metadata to be added to ingress
   * @private
   */
  private setupIngress(accessType: AccessType, accessHost: string, skoonerStr: string, metadata: K8s.ObjectMeta) {
    if (accessType == AccessType.INGRESS && accessHost != '') {
      new K8s.KubeIngress(this, 'ing' + skoonerStr, {
        metadata: metadata,
        spec: {
          rules: [{
            host: accessHost,
            http: {
              paths: [{
                path: '/',
                pathType: 'Prefix',
                backend: {
                  service: {
                    name: skoonerStr,
                    port: {
                      number: 80,
                    },
                  },
                },
              }],
            },
          }],
        },
      });
    }
  }

  /**
   * Generate manifest for service account and role binding if needed
   * @param loginType If value is set to Service account, generate hte manifests
   * @param skoonerStr Name to be added to object id
   * @param serviceAccountName Name of the service account to be created
   * @param serviceAccountRole Role to be given to service account
   * @private
   */
  private setupServiceAccount(loginType: LoginType, skoonerStr: string, serviceAccountName: string, serviceAccountRole: string) {
    if (loginType == LoginType.SERVICE_ACCOUNT) {
      new K8s.KubeServiceAccount(this, 'sa' + skoonerStr, {
        metadata: { name: serviceAccountName },
      });

      new K8s.KubeClusterRoleBinding(this, 'crb' + skoonerStr, {
        metadata: { name: serviceAccountName },
        roleRef: {
          apiGroup: 'rbac.authorization.k8s.io',
          kind: 'ClusterRole',
          name: serviceAccountRole,
        },
        subjects: [{
          kind: 'ServiceAccount',
          name: serviceAccountName,
          namespace: 'default',
        }],
      },
      );
    }
  }

}