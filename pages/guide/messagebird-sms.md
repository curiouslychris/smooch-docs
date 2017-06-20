---
title: MessageBird SMS
section: guide
layout: two-column
---

## MessageBird SMS

[MessageBird](https://www.messagebird.com/en-us/sms-gateway) is an SMS marketing, notification and communication service that allows users to send and receive personalized text messages.

Smooch lets you integrate MessageBird SMS into your software with a single API that also connects to other channels like Messenger, Viber, chat SDKs and more.

Our MessageBird integration allows you to receive and send text messages from a MessageBird number. Refer to the [channel capabilities grid](/guide/channel-capabilities/) to see all the MessageBird integration capabilities.

### Configuring MessageBird

Add the MessageBird integration through the [Smooch dashboard](https://app.smooch.io/integrations/messagebird) or via the [REST API](https://docs.smooch.io/rest/#messagebird). After the integration, you will be provided with a Smooch webhook URL. You will need to go to your MessageBird Number configurations and add the following rule to the number you want to use with Smooch:

![Messagebird number](/images/messagebird_webhook.png)

Into the `URL` field, you will need to provide the Smooch webhook URL provided by the Smooch dashboard. If you used the REST API to create the integration, you will need to use the `webhookSecret` from the response to write the following with the respective value to your integration: `https://app.smooch.io/api/messagebird/webhooks/:appId/:integrationId/:webhookSecret`.
