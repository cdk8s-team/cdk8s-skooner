# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="constructs"></a>

### Skooner <a name="cdk8s-skooner.Skooner" id="cdk8sskoonerskooner"></a>

Main class to create the skooner manifests.

#### Initializers <a name="cdk8s-skooner.Skooner.Initializer" id="cdk8sskoonerskoonerinitializer"></a>

```typescript
import { Skooner } from 'cdk8s-skooner'

new Skooner(scope: Construct, id: string, options?: SkoonerOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cdk8sskoonerskoonerparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#cdk8sskoonerskoonerparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`options`](#cdk8sskoonerskoonerparameteroptions) | [`cdk8s-skooner.SkoonerOptions`](#cdk8s-skooner.SkoonerOptions) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="cdk8s-skooner.Skooner.parameter.scope" id="cdk8sskoonerskoonerparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk8s-skooner.Skooner.parameter.id" id="cdk8sskoonerskoonerparameterid"></a>

- *Type:* `string`

---

##### `options`<sup>Optional</sup> <a name="cdk8s-skooner.Skooner.parameter.options" id="cdk8sskoonerskoonerparameteroptions"></a>

- *Type:* [`cdk8s-skooner.SkoonerOptions`](#cdk8s-skooner.SkoonerOptions)

---





## Structs <a name="Structs" id="structs"></a>

### SkoonerOptions <a name="cdk8s-skooner.SkoonerOptions" id="cdk8sskoonerskooneroptions"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { SkoonerOptions } from 'cdk8s-skooner'

const skoonerOptions: SkoonerOptions = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`accessHost`](#cdk8sskoonerskooneroptionspropertyaccesshost) | `string` | When using an Ingress access type, provide the hostname for the ingress rule. |
| [`accessType`](#cdk8sskoonerskooneroptionspropertyaccesstype) | [`cdk8s-skooner.AccessType`](#cdk8s-skooner.AccessType) | Setup external access using a node port, an ingress or neither. |
| [`labels`](#cdk8sskoonerskooneroptionspropertylabels) | {[ key: string ]: `string`} | Additional labels to apply to resources. |
| [`loginType`](#cdk8sskoonerskooneroptionspropertylogintype) | [`cdk8s-skooner.LoginType`](#cdk8s-skooner.LoginType) | Type of login the generate (OIDC environment variables, service account or none). |
| [`port`](#cdk8sskoonerskooneroptionspropertyport) | `number` | Port on which to expose the container externally. |
| [`secretNameOIDC`](#cdk8sskoonerskooneroptionspropertysecretnameoidc) | `string` | Name of the secret used to store OIDC information (url, id, secret) when using OIDC login type. |
| [`serviceAccountName`](#cdk8sskoonerskooneroptionspropertyserviceaccountname) | `string` | Name of service account to be created when using Service Account login type. |
| [`serviceAccountRole`](#cdk8sskoonerskooneroptionspropertyserviceaccountrole) | `string` | Role to be assigned to service account when using Service Account login type. |

---

##### `accessHost`<sup>Optional</sup> <a name="cdk8s-skooner.SkoonerOptions.property.accessHost" id="cdk8sskoonerskooneroptionspropertyaccesshost"></a>

```typescript
public readonly accessHost: string;
```

- *Type:* `string`

When using an Ingress access type, provide the hostname for the ingress rule.

---

##### `accessType`<sup>Optional</sup> <a name="cdk8s-skooner.SkoonerOptions.property.accessType" id="cdk8sskoonerskooneroptionspropertyaccesstype"></a>

```typescript
public readonly accessType: AccessType;
```

- *Type:* [`cdk8s-skooner.AccessType`](#cdk8s-skooner.AccessType)
- *Default:* AccessType.NONE

Setup external access using a node port, an ingress or neither.

If set to ingress, then accessHost must also be provided

---

##### `labels`<sup>Optional</sup> <a name="cdk8s-skooner.SkoonerOptions.property.labels" id="cdk8sskoonerskooneroptionspropertylabels"></a>

```typescript
public readonly labels: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}
- *Default:* none

Additional labels to apply to resources.

---

##### `loginType`<sup>Optional</sup> <a name="cdk8s-skooner.SkoonerOptions.property.loginType" id="cdk8sskoonerskooneroptionspropertylogintype"></a>

```typescript
public readonly loginType: LoginType;
```

- *Type:* [`cdk8s-skooner.LoginType`](#cdk8s-skooner.LoginType)
- *Default:* None

Type of login the generate (OIDC environment variables, service account or none).

---

##### `port`<sup>Optional</sup> <a name="cdk8s-skooner.SkoonerOptions.property.port" id="cdk8sskoonerskooneroptionspropertyport"></a>

```typescript
public readonly port: number;
```

- *Type:* `number`
- *Default:* 80

Port on which to expose the container externally.

---

##### `secretNameOIDC`<sup>Optional</sup> <a name="cdk8s-skooner.SkoonerOptions.property.secretNameOIDC" id="cdk8sskoonerskooneroptionspropertysecretnameoidc"></a>

```typescript
public readonly secretNameOIDC: string;
```

- *Type:* `string`
- *Default:* skooner

Name of the secret used to store OIDC information (url, id, secret) when using OIDC login type.

---

##### `serviceAccountName`<sup>Optional</sup> <a name="cdk8s-skooner.SkoonerOptions.property.serviceAccountName" id="cdk8sskoonerskooneroptionspropertyserviceaccountname"></a>

```typescript
public readonly serviceAccountName: string;
```

- *Type:* `string`
- *Default:* skooner-sa

Name of service account to be created when using Service Account login type.

---

##### `serviceAccountRole`<sup>Optional</sup> <a name="cdk8s-skooner.SkoonerOptions.property.serviceAccountRole" id="cdk8sskoonerskooneroptionspropertyserviceaccountrole"></a>

```typescript
public readonly serviceAccountRole: string;
```

- *Type:* `string`
- *Default:* cluster-admin

Role to be assigned to service account when using Service Account login type.

---



## Enums <a name="Enums" id="enums"></a>

### AccessType <a name="AccessType" id="accesstype"></a>

| **Name** | **Description** |
| --- | --- |
| [`INGRESS`](#cdk8sskooneraccesstypeingress) | *No description.* |
| [`NODE_PORT`](#cdk8sskooneraccesstypenodeport) | *No description.* |
| [`NONE`](#cdk8sskooneraccesstypenone) | *No description.* |

---

Controls whether we create a node port, an ingress or a cluster IP.

#### `INGRESS` <a name="cdk8s-skooner.AccessType.INGRESS" id="cdk8sskooneraccesstypeingress"></a>

---


#### `NODE_PORT` <a name="cdk8s-skooner.AccessType.NODE_PORT" id="cdk8sskooneraccesstypenodeport"></a>

---


#### `NONE` <a name="cdk8s-skooner.AccessType.NONE" id="cdk8sskooneraccesstypenone"></a>

---


### LoginType <a name="LoginType" id="logintype"></a>

| **Name** | **Description** |
| --- | --- |
| [`OIDC`](#cdk8sskoonerlogintypeoidc) | *No description.* |
| [`SERVICE_ACCOUNT`](#cdk8sskoonerlogintypeserviceaccount) | *No description.* |
| [`NONE`](#cdk8sskoonerlogintypenone) | *No description.* |

---

Dictates if we will generate environment varaibles to hook up with an OIDC secret, a service account and assoicate role binding or none of the above.

#### `OIDC` <a name="cdk8s-skooner.LoginType.OIDC" id="cdk8sskoonerlogintypeoidc"></a>

---


#### `SERVICE_ACCOUNT` <a name="cdk8s-skooner.LoginType.SERVICE_ACCOUNT" id="cdk8sskoonerlogintypeserviceaccount"></a>

---


#### `NONE` <a name="cdk8s-skooner.LoginType.NONE" id="cdk8sskoonerlogintypenone"></a>

---

