# Webhooks
Webhooks are a fantastic way to extend the Smooch platform beyond the built-in feature set. You can use webhooks to build your own Smooch chat clients, to integrate more deeply with your favorite CRM, or to [build a bot](https://github.com/smooch/smooch-bot).

These webhook APIs require a `jwt` credential with `app` level scope. Furthermore, a webhook can only operate within the scope of a single Smooch app.

When a webhook trigger is triggered, a JSON payload will be posted to the URL configured in your webhook object. You can see an example of this payload [here](#webhooks-payload).