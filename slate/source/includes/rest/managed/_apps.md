# Apps

App schema and endpoints used for provisioning Smooch apps.

## Create App

> Request:

```curl
curl https://api.smooch.io/v1/apps \
     -X POST \
     -d '{"name": "My App"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-token'
```

```javascript
smooch.apps.create({
    name: 'My App'
}).then((response) => {
    // async code
});
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

```curl
  curl https://api.smooch.io/v1/apps \
       -H 'authorization: Bearer your-account-token'
```

```javascript
smooch.apps.list().then((response) => {
    // async code
});
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

```curl
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6 \
     -H 'authorization: Bearer your-account-token'
```

```javascript
smooch.apps.get('55c8d9758590aa1900b9b9f6').then((response) => {
    // async code
});
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

```curl
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6 \
       -X DELETE \
       -H 'authorization: Bearer your-account-token'
```

```javascript
smooch.apps.delete('55c8d9758590aa1900b9b9f6').then((response) => {
    // async code
});
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

## Schema

### App schema

The schema describes the fields you can expect to be associated with an app.

| Field | Description                                                                                    |
|-------|--------|------------------------------------------------------------------------------------------------|
| **_id**  | A canonical ID that can be used to reference the Smooch app that the event is associated with. |
| **appToken**  | A public token that can be used to initialize Smooch's mobile and Web SDKs and authorize API calls on behalf of appUsers who haven't been secured by JWT. |
| **name**  | the friendly name of the app. |

### Truncated app schema

A truncated version of the app sent with webhook payloads.

| Field | Description                                                                                    |
|-------|--------|------------------------------------------------------------------------------------------------|
| **_id**  | A canonical ID that can be used to reference the Smooch app that the event is associated with. |
