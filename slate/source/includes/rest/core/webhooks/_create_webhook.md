## Create webhook
> Request:

```shell
curl https://api.smooch.io/v1/webhooks \
     -X POST \
     -d '{"target": "http://example.com/callback"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

```js
smooch.webhooks.create({
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