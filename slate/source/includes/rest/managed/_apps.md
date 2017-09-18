# Apps

App schema and endpoints used for provisioning Smooch apps.

## Create App

> Request:

```shell
curl https://api.smooch.io/v1/apps \
     -X POST \
     -d '{"name": "My App", "settings": {"maskCreditCardNumbers": false}}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-token'
```

```javascript
smooch.apps.create({
    name: 'My App',
    settings: {
      maskCreditCardNumbers: false
    }    
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
    "name": "My App",
    "settings": {
      "maskCreditCardNumbers": false
    }    
  }
}
```

<api>`POST /v1/apps`</api>

Creates a new app. The response body will include the app's `_id`, which can be used to initialize the Web, iOS and Android clients.

| **Arguments**             |   |
|---------------------------|---|
| **name**<br/><span class='req'>required</span> | The User facing name of the app. |
| **settings**<br/> | Customizable app settings (see [app settings](#app-settings)). |

## List Apps

> Request:

```shell
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
          "name": "My App",
          "settings": {
            "maskCreditCardNumbers": true
          }          
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
    "name": "My App",
    "settings": {
      "maskCreditCardNumbers": true
    }
  }
}
```

<api>`GET /v1/apps/{appId}`</api>

Fetches an individual app.

## Update App

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6 \
     -X PUT \
     -d '{"name": "My New App", "settings": {"maskCreditCardNumbers": false}}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-token'
```

```javascript
smooch.apps.update('55c8d9758590aa1900b9b9f6', {
  name: 'My New App',
  settings: {
    maskCreditCardNumbers: false
  }
}).then((response) => {
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
    "name": "My New App",
    "settings": {
      "maskCreditCardNumbers": false
    }
  }
}
```

<api>`PUT /v1/apps/{appId}`</api>

Updates an app.

| **Arguments**             |   |
|---------------------------|---|
| **name**<br/><span class='req'>required</span> | The User facing name of the app. |
| **settings**<br/> | Customizable app settings (see [app settings](#app-settings)). |

## Delete App

> Request:

```shell
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
| **_id**  | A canonical ID that can be used to retrieve the Smooch app. Also used to initialize Smooch's Mobile and Web SDKs.   |
| **appToken** (_deprecated_)  | A public token used to initialize older versions of the Smooch Mobile and Web SDKs. |
| **name**  | the friendly name of the app. |
| **settings** | Customizable app settings (see [app settings](#app-settings)). |

### App settings

The customizable settings associated with an app.

| Field | Description                                                                                    |
|-------|--------|------------------------------------------------------------------------------------------------|
| **maskCreditCardNumbers** | A boolean specifying whether credit card numbers should be masked when sent through Smooch. |

### Truncated app schema

A truncated version of the app sent with webhook payloads.

| Field | Description                                                                                    |
|-------|--------|------------------------------------------------------------------------------------------------|
| **_id**  | A canonical ID that can be used to retrieve the Smooch app. Also used to initialize Smooch's Mobile and Web SDKs.   |
