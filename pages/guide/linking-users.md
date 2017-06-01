---
title: Linking a Channel
section: guide
layout: two-column
---

# Linking a Channel

Smooch provides a REST API [endpoint](https://docs.smooch.io/rest/#link-app-user-to-channel) for linking users to either Twilio SMS or Messenger. If you have a user's mobile number, you can use this API to initiate contact with them on Twilio SMS or Messenger. You can also add those channels to an existing Smooch user as an alternate channel.

Below, we'll provide a recipe for creating a user, and initiating a link request with them.

## Generate an app scoped token
Before we can call the REST API we will need an app scoped token. If you're not sure how to do that yet, check out the authorization section of the [API Quickstart](/guide/api-quickstart/#authorization).

## Create a user
We need to create a user or use an existing one to link a channel. Use the app scoped token you created above to call the POST Pre-Create App User [endpoint](https://docs.smooch.io/rest/#track-event). See [here](/guide/creating-users/), for more information on creating users.

## Link the user
Take note of the `userId` used to create the user, or the `_id` that was automatically generated for the user. Now call the [Linking API](https://docs.smooch.io/rest/#link-app-user-to-channel), like so:

### For Twilio SMS
```bash
curl https://api.smooch.io/v1/appusers/{{userID-for-created-user}}/channels \
     -X POST \
     -d '{"type": "twilio", "phoneNumber": "+15145555555"}, "confirmation": {"type": "immediate"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-app-scoped-token'
```

### For Messenger
```bash
curl https://api.smooch.io/v1/appusers/{{userID-for-created-user}}/channels \
     -X POST \
     -d '{"type": "messenger", "phoneNumber": "+15145555555"}, "confirmation": {"type": "immediate", "message": {"role": "appMaker", "type":"text", "text": "Let’s connect on Messenger"}}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-app-scoped-token'
```

Messenger linking [requires a special permission](https://developers.facebook.com/docs/messenger-platform/guides/customer-matching#access) on your Facebook page and is subject to a $99 USD one-time fee.
Given this permission requirement, Messenger linking is only possible when targeting an app integrated via our [Integration API](http://docs.smooch.io/rest/#facebook-messenger).

### For Mailgun
```bash
curl https://api.smooch.io/v1/appusers/{{userID-for-created-user}}/channels \
     -X POST \
     -d '{"type": "mailgun", "address": "their@email.com"}, "confirmation": {"type": "immediate"}, "subject": "This will be the subject of the email"' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-app-scoped-token'
```

## Send a message to the user
Now that the user has been created and linked to the target channel, any messages you send to that user via the POST Message [endpoint](http://docs.smooch.io/rest/#post-message) will be delivered to them there.

```bash
curl https://api.smooch.io/v1/appusers/{{userID-for-created-user}}/messages \
     -X POST \
     -d '{"text":"A message over Twilio SMS, as requested.", "role": "appMaker", "type": "text"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-app-scoped-token'
```
