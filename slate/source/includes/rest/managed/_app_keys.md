# App Keys
This set of endpoints is used to provision and revoke secret keys for a Smooch app. A JWT with scope 'account' is required to access the secret keys API.

## Create Key

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/keys \
     -X POST \
     -d '{"name": "key1"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
201 CREATED
```
```json
{
  "key": {
    "secret": "Y4SINFtAUzEjayxgUjJZoTjG",
    "name": "key1",
    "_id": "app_5735dcf248011972d621dc01"
  }
}
```

<api>`POST /v1/apps/{appId}/keys`</api>

Creates a secret key for the specified app. The response body will include a secret as well it's corresponding id, which you can use to generate JSON Web Tokens to securely make API calls on behalf of the app.

| **Arguments**             |   |
|---------------------------|---|
| **name**<br/><span class='req'>required</span> | A friendly identifier for the secret key. |

## List keys

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/keys \
       -H 'authorization: Bearer your-account-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```
```json
{
  "keys": [
    {
      "secret": "5XJ85yjUtRcaQu_pDINblPZb",
      "name": "key1",
      "_id": "app_5723a347f82ba0516cb4ea34"
    },
    {
      "secret": "sTE74doRFsxtiwyT9JGCBQ6H",
      "name": "key2",
      "_id": "app_5723a347f82ba0516cb4ea35"
    }
  ]
}
```

<api>`GET /v1/apps/{appId}/keys`</api>

Lists all secret keys for a given app.

## Get Key

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/keys/app_5723a347f82ba0516cb4ea34 \
       -H 'authorization: Bearer your-account-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```
```json
{
  "key": {
    "secret": "5XJ85yjUtRcaQu_pDINblPZb",
    "name": "key1",
    "_id": "app_5723a347f82ba0516cb4ea34"
  }
}
```

<api>`GET /v1/apps/{appId}/keys/{keyId}`</api>

Returns a secret key.

## Delete Key

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/keys/app_5723a347f82ba0516cb4ea34 \
       -X DELETE \
       -H 'authorization: Bearer your-account-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```
```json
{}
```

<api>`DELETE /v1/apps/{appId}/keys/{keyId}`</api>

Removes a secret key.

## Get JWT

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/keys/app_5723a347f82ba0516cb4ea34/jwt \
       -H 'authorization: Bearer your-account-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```
```json
{
    "jwt": "eyJraWQiOiJhcHBfNTczNDE0NjQwN2E2OWI2MTAwNzQiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6ImFwcCJ9.aDkuZKRXzI3I3XRDtnqbrxIsQQuA7kMrV4r7KcwmeHc"
}
```

<api>`GET /v1/apps/{appId}/keys/{keyId}/jwt`</api>

Returns an app-scoped JWT signed using the requested keyId/secret pair.