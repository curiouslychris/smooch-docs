# Apps
Endpoints used for provisioning Smooch apps.

## Create App

> Request:

```shell
curl https://api.smooch.io/v1/apps \
     -X POST \
     -d '{"name": "My App"}' \
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
  "app": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "appToken": "3s58wwlgx8xqbidgyyvzunoyw",
    "name": "My App"
  }
}
```

<api>`POST /v1/apps`</api>

Creates a new app. The response body will include the appToken, which can be used to initialize the Web, iOS and Android clients and make calls to the app user facing API.

| **Arguments**             |   |
|---------------------------|---|
| **name**<br/><span class='req'>required</span> | The User facing name of the app. |

## List Apps

> Request:

```shell
  curl https://api.smooch.io/v1/apps \
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
  "apps": [
        {
          "_id": "55c8d9758590aa1900b9b9f6",
          "appToken": "3s58wwlgx8xqbidgyyvzunoyw",
          "name": "My App"
        }
    ],
    "hasMore": false,
    "offset": 0
}
```

<api>`GET /v1/apps`</api>

Lists all apps configured. This API is paginated. It returns a max of 25 apps by default, and accepts offset and limit query parameters. The max limit is 100.

| Parameter                | Description              |
|--------------------------|--------------------------|
| `limit`                  | Integer, the number of records to return (maximum 100, default 25). |
| `offset`                 | Integer, the number of initial records to skip before picking records to return. |

## Get App

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6 \
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
  "app": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "appToken": "3s58wwlgx8xqbidgyyvzunoyw",
    "name": "My App"
  }
}
```

<api>`GET /v1/apps/{appId}`</api>

Fetches an individual app.

## Delete App

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6 \
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

<api>`DELETE /v1/apps/{appId}`</api>

Removes the specified app, including all its enabled integrations.