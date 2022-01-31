## cdk8s-skooner


Implementation of a basic [Skooner](https://github.com/skooner-k8s/skooner) Kubernetes dashboard construct for cdk8s. It provides multi-language high level
abstractions for authoring Skooner K8s manifests.

### Usage

To include cdk8s-skooner in your project:

```typescript
import { Skooner } from 'cdk8s-skooner';

//  after defining your chart
new Skooner(chart, 'my-skooner');

```
This will allow the generation of the Skooner deployment and service (ClusterIP)

### Additional options

The generation of Skooner manifest can be customized by passing parameters to the constructor.

#### Access Types

The access type adjusts the way the user can access the Skooner application. It provides three basic modes:

- Port: Skooner service is create with a node port for quick access to the Sooner dashboard
- Ingress: Generates an Ingress resource that allows access to the dashboard (an ingress controller must be already
  setup on the cluster)
- None: Skooner service is generated with a ClusterIP

#### Login Types

Login Types customizes the way the user can log in to the application dashboard. It provides three options:

- OIDC: Adds environment variables to the deployment that allow application to ingest the OIDC's secret, url and
  id. The environment variables read that information from a pre-existing secret
- Service Account: Generates service account and cluster role bindings manifests to allow user to login to eht application
  using a service token

#### Labels

Additional labels can be passed to the construct and will be propagated to the different resource manifests

### Examples

Below are several examples that demonstrate the capabilities of the construct. Each example will generate
the manifests for Skooner and customize them to meet the specific needs,

Create the necessary OIDC environment variables and set it up to use an ingress
```typescript
  new Skooner(chart, 'test', {
    accessType: AccessType.INGRESS,
    accessHost: 'test.test.com',
    loginType: LoginType.OIDC,
  });
```

Setup access to the application on port 8080 using a node port. Setup the necessary environment variables to
use OIDC. Finally, setup some additional labels.
```typescript
  new Skooner(chart, 'test', {
    accessType: AccessType.NODE_PORT,
    port: 8080,
    loginType: LoginType.OIDC,
    labels: { testKey: 'testValue', testKey2: 'testValue2' },
  })
```

Generate the necessary Service account and role bindings to allow access via service account token
```typescript
  new Skooner(chart, 'test', {
    loginType: LoginType.SERVICE_ACCOUNT,
  });
```
