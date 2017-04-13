---
title: Twitter DM
section: guide
layout: two-column
---

# Twitter DM

Our [Twitter DM integration](https://app.smooch.io/integrations/twitter) allows you to send & receive direct messages on Twitter using your own account. You will receive these messages in a [business system](https://docs.smooch.io/guide/business-systems/) or with [webhooks](https://docs.smooch.io/rest/#webhooks).

## Setup

Due to account limits put in place by Twitter during their [beta period](https://dev.twitter.com/webhooks/account-activity), we're restricting access to the channel to companies building software on the [Smooch API](https://docs.smooch.io/rest/). If this describes your business, please [contact Twitter](https://gnipinc.formstack.com/forms/account_activity_api_configuration_request_form?describe_in_your_own_words_what_youre_building=I%20am%20building%20with%20the%20Smooch%20API%20...) mentioning you're a Smooch customer to get priority access.

Alternately, if you already have a whitelisted Twitter app for the [Activity API](https://dev.twitter.com/webhooks/account-activity) you can already connect it via our [Integration API](https://docs.smooch.io/rest/#twitter-dm) and start building Twitter DM features inside your software.

You can create a Twitter app [here](https://apps.twitter.com/) and request access to the Twitter DM API [here](https://gnipinc.formstack.com/forms/account_activity_api_configuration_request_form?describe_in_your_own_words_what_youre_building=I%20am%20building%20with%20the%20Smooch%20API%20...)

## Structured Messages

The [Twitter DM integration](https://app.smooch.io/integrations/twitter) supports sending and receiving [images](/guide/structured-messages/#images-stickers-and-gifs), [GIFs](/guide/structured-messages/#images-stickers-and-gifs) & Emojis. A business can also send [quick replies](/guide/structured-messages/#reply-buttons), [location request](/guide/structured-messages/#location-request-buttons) and [carousel](/guide/structured-messages/#carousel-messages) messages. Refer to the [channel capabilities grid](/guide/channel-capabilities/) to see all the Twitter DM integration capabilities.


## Link to Direct message conversation

You can easily send links to your users to direct them to a private conversation from a public Tweet.

Sending `https://twitter.com/messages/compose?recipient_id={your account’s numeric user ID}` will render in twitter a "Send a private message" button like this:

![send private message](/images/twitter_private.png)

You can find our your User ID [here](https://twitter.com/settings/your_twitter_data)

![twitter userid](/images/twitter_userid.png)

These links also works anywhere on the web. Read more details about the "Send a private message" link [here](https://business.twitter.com/en/help/campaign-editing-and-optimization/public-to-private-conversation.html)