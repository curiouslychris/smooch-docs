## Webhook triggers
> Request:

```shell
curl https://api.smooch.io/v1/webhooks
     -X POST \
     -d '{"target": "http://example.com/callback", "triggers": ["message:appUser"]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

```js
smooch.webhooks.create({
    target: 'http://example.com/callback',
    triggers: [
        'message:appUser'
    ]
}).then((response) => {
    // async code
});
```

A webhook will make a request to the target each time a trigger associated with the webhook occurs. Triggers are specified in an optional `triggers` array in the request body. If `triggers` is not specified the webhook will be configured with the `message` trigger by default.

| trigger                   |                                                                |
|---------------------------|----------------------------------------------------------------|
| **message**<br/>*default* | all messages                                                   |
| **message:appUser**       | only messages with role `appUser`                              |
| **message:appMaker**      | only messages with role `appMaker` or `whisper`                |
| **conversation:start**    | when a user opts in to start receiving messages                |
| **conversation:read**     | when a user reads a conversation                               |
| **postback**              | when a user clicks on a postback action                        |
| **merge:appUser**         | when two or more users are merged into one                     |
| **delivery:success**      | when a message is successfully delivered to a customer channel |
| **delivery:failure**      | when a message fails to be delivered to a customer channel     |
| **payment:success**       | when a payment is successfully received from a channel         |
| <strong>*</strong>        | when any of the above triggers occurs                          |