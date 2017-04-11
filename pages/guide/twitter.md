---
title: Twitter DM
section: guide
layout: two-column
---

# Twitter DM

Our [Twitter DM integration](https://app.smooch.io/integrations/twitter) allows you to send & receive direct messages on Twitter using your own account. You will receive these messages in a [business system](https://docs.smooch.io/guide/business-systems/) or with [webhooks](https://docs.smooch.io/rest/#webhooks).

## Setup

Access to Twitter’s Direct Messages is restricted during the [Beta period](https://dev.twitter.com/webhooks/account-activity). We’ll be granting select access to qualifying customers. Please [contact us](https://smooch.formstack.com/forms/twitter) if you’re interested to connect your Smooch app to Twitter’s Direct Messages. 

Once access is granted, you'll be able to give Smooch access to configure your Twitter account. 

Alternately, you can connect your own Twitter app via the [integration API](https://docs.smooch.io/rest/#twitter) if you already have access. 

You can create a Twitter app [here](https://apps.twitter.com/) and request access to the Twitter DM API [here](https://gnipinc.formstack.com/forms/account_activity_api_configuration_request_form)

## Guiding users from a public Tweet to a private conversation

You can easily send links to your user to direct them to a private conversation from a public Tweet.

Sending `https://twitter.com/messages/compose?recipient_id={your account’s numeric user ID}` will render in twitter a "Send a private message" button like this:

![send private message](/images/twitter_private.png)

You can find our your User ID [here](https://twitter.com/settings/your_twitter_data)

![twitter userid](/images/twitter_userid.png)






