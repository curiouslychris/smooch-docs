# Webhooks

Webhooks are a fantastic way to extend the Smooch platform beyond the built-in feature set. You can use webhooks to build your own Smooch chat clients, to integrate more deeply with your favorite CRM, or to [build a bot](https://github.com/smooch/smooch-bot).

These webhook APIs require a `jwt` credential with `app` level scope. Furthermore, a webhook can only operate within the scope of a single Smooch app.

<aside class="notice">
An app is limited to 10 webhooks. A webhook can subscribe to multiple trigger events. We recommend using a single webhook that registers to all the events you need.
</aside>

### Webhook triggers

When a webhook trigger is triggered, a `POST` request will be made to the URL configured in your webhook object along with a JSON payload specific for the event type.

Triggers are specified in an optional `triggers` array in the request body. If `triggers` is not specified the webhook will be configured with the `message` trigger by default.

| trigger                   |                                                                |
|---------------------------|----------------------------------------------------------------|
| **message**<br/>*default* | all messages                                                   |
| **message:appUser**       | only messages with role `appUser`                              |
| **message:appMaker**      | only messages with role `appMaker` or `whisper`                |
| **conversation:read**     | when a user reads a conversation                               |
| **postback**              | when a user clicks on a postback action                        |
| **merge:appUser**         | when two or more users are merged into one                     |
| **delivery:success**      | when a message is successfully delivered to a customer channel |
| **delivery:failure**      | when a message fails to be delivered to a customer channel     |
| **payment:success**       | when a payment is successfully received from a channel         |
| <strong>*</strong>        | when any of the above triggers occurs                          |
