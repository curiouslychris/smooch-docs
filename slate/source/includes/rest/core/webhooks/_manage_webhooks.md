## Manage Webhooks

Smooch exposes REST API methods to:

- [Create webhook](#create-webhook)
- [List webhooks](#list-webhooks)
- [Get webhook](#get-webhook)
- [Update webhook](#update-webhook)
- [Delete webhook](#delete-webhook)

### Create webhook

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/webhooks \
     -X POST \
     -d '{"target": "http://example.com/callback"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```

```js
smooch.webhooks.create('5963c0d619a30a2e00de36b8', {
    target: 'http://example.com/callback'
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
  "webhook": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "triggers": [
      "message"
    ],
    "secret": "8564b3e6a8b20a4bdb68b05d9ea97aace9bc5936",
    "target": "http://example.com/callback"
  }
}
```

<api>`POST /v1/webhooks`</api>

Create a webhook for the specified app. The response body will include a secret which will be transmitted with each webhook invocation and can be used to verify the authenticity of the caller.

Alternatively, you can use the Webhooks integration in the Smooch dashboard to easily create a webhook.

| **Arguments**             |   |
|---------------------------|---|
| **target**<br/><span class='req'>required</span> | URL to be called when the webhook is triggered. |
| **triggers**<br/><span class='opt'>optional</span>  | An array of triggers you wish to have the webhook listen to. If unspecified the default trigger is `message`. This property is case sensitive. [More details](#webhook-triggers). |

### List webhooks

> Request:

```shell
  curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/webhooks \
       -H 'authorization: Bearer your-account-jwt'
```

```js
smooch.webhooks.list('5963c0d619a30a2e00de36b8').then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
  "webhooks": [
    {
      "_id": "55c8d9758590aa1900b9b9f6",
      "triggers": [
        "message"
      ],
      "secret": "8564b3e6a8b20a4bdb68b05d9ea97aace9bc5936",
      "target": "http://example.com/callback"
    }
  ]
}
```

<api>`GET /v1/webhooks`</api>

List all webhooks configured for a given app.

### Get webhook

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/webhooks/55c8d9758590aa1900b9b9f6 \
     -H 'authorization: Bearer your-account-jwt'
```

```js
smooch.webhooks.get('5963c0d619a30a2e00de36b8', '55c8d9758590aa1900b9b9f6').then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
  "webhook": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "triggers": [
      "message"
    ],
    "secret": "8564b3e6a8b20a4bdb68b05d9ea97aace9bc5936",
    "target": "http://example.com/callback"
  }
}
```

<api>`GET /v1/webhooks/{webhookId}`</api>

Individual webhooks can be fetched using this API.

### Update webhook

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/webhooks/55c8d9758590aa1900b9b9f6 \
     -X PUT \
     -d '{"target": "http://example.com/callback"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```

```js
smooch.webhooks.update('5963c0d619a30a2e00de36b8', '55c8d9758590aa1900b9b9f6', {
    target: 'http://example.com/callback'
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
  "webhook": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "triggers": [
      "message"
    ],
    "secret": "8564b3e6a8b20a4bdb68b05d9ea97aace9bc5936",
    "target": "http://example.com/callback"
  }
}
```

<api>`PUT /v1/webhooks/{webhookId}`</api>

Use this API to update your existing webhooks.

| **Arguments**             |   |
|---------------------------|---|
| **target**<br/><span class='opt'>optional</span> | URL to be called when the webhook is triggered. |
| **triggers**<br/><span class='opt'>optional</span>  | The triggers you wish to have the webhook listen to. The default trigger is `message`. This property is case sensitive. [More details](#webhook-triggers). |

### Delete webhook

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/webhooks/55c8d9758590aa1900b9b9f6 \
     -X DELETE \
     -H 'authorization: Bearer your-account-jwt'
```
```js
smooch.webhooks.delete('5963c0d619a30a2e00de36b8', '55c8d9758590aa1900b9b9f6').then(() => {
    // async code
});
```

> Response:

```
200 OK
```

<api>`DELETE /v1/webhooks/{webhookId}`</api>

Deletes the specified webhook.
