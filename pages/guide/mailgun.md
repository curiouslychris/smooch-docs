---
title: Mailgun
section: guide
layout: two-column
---

# Mailgun

Our [Mailgun integration](https://app.smooch.io/integrations/mailgun) allows you to send & receive messages by email using your own domain. You will receive these messages in a [business system](https://docs.smooch.io/guide/business-systems/) or with [webhooks](https://docs.smooch.io/rest/#webhooks).

## What you'll need

### Mailgun Account
If you don't have a Mailgun Account, you can create one [here](https://app.mailgun.com/new/signup/).

### Domain
You can use Mailgun's sandbox while testing but to use email as a channel in production you'll need to add and configure your domain in the [Mailgun dashboard](https://mailgun.com/app/dashboard). Please refer to [Mailgun's documentation](https://documentation.mailgun.com/user_manual.html#verifying-your-domain) for more information.

While using the sandbox you can only send test messages to the [authorized recipients](https://help.mailgun.com/hc/en-us/articles/217531258-Authorized-Recipients) in your Mailgun dashboard.

## Configuring Mailgun

To get started visit the [Mailgun integration page](https://app.smooch.io/integrations/mailgun) and click Connect.

#### Step 1
Visit the [API Keys tab](https://app.mailgun.com/app/account/security) in the settings page of the Mailgun dashboard and copy paste your active API key in the API key box.

![Mailgun intergration API key](/images/mailgun_api_key.png)

#### Step 2
Choose the domain that you wish to use with Smooch.

![Mailgun integration domain](/images/mailgun_domains.png)

<aside class="notice">
Please note that unverified domains are unable to be used with Smooch until the <a href="https://documentation.mailgun.com/user_manual.html#verifying-your-domain">verification</a> process is complete with Mailgun.
</aside>

#### Step 3
Input the incoming email address that you would like Smooch to use. Smooch will receive all emails sent to this address. This address will also be used as the "Reply-To" address when a user replies to your messages.

![Mailgun integration incoming email address](/images/mailgun_incoming_email.png)

#### Step 4
Click on "Connect your Mailgun account"

![Mailgun integration connect your account](/images/mailgun_connect.png)

#### Step 5
To test the integration, you can send an email to the address you configured in "Step 3". You should receive the message in one of your [business systems](https://docs.smooch.io/guide/business-systems/) or via [webhook](https://docs.smooch.io/rest/#webhooks).

### Unsubscribe Links
All messages sent using the Mailgun integration will include an unsubscribe link. If the user clicks on this link, they will be unsubscribed from the current conversation. You will no longer be able send email messages to this user but other channels will remain open.
Smooch will issue [delivery:failure events](https://docs.smooch.io/rest/#trigger---code-classprettyprintdeliveryfailurecode) if you try to message an unsubscribed user. You'll also be notified while replying in any of your configured [business systems](https://docs.smooch.io/guide/business-systems/).

![Mailgun integration unsubscribe link](/images/mailgun_unsubscribe.png)

If the user sends you a message after they have chosen to unsubscribe, a resubscription will automatically take place and you will be able to message that user again.
