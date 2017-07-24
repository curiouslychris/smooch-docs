# Integrations
This set of endpoints is used to configure and manage various front-end messaging channels. A JWT is required with `account` or `app` scope.

The supported integration types are: Facebook Messenger, Twitter DM, LINE, Telegram, Twilio SMS, WeChat, Viber and Mailgun.

## Create Integration

<api>`POST /v1/apps/{appId}/integrations`</api>

The Create Integration endpoint allows you to provision apps with front-end messaging channels. See the sections below for channel specific instructions.

## Facebook Messenger

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{ "type": "messenger", "pageAccessToken": "your_access_token", "appId": "your_fb_app_id", "appSecret": "your_fb_app_secret"
}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```

```javascript
smooch.integrations.create('55c8d9758590aa1900b9b9f6', {
    type: 'messenger',
    pageAccessToken: 'your_access_token',
    appId: 'your_fb_app_id',
    appSecret: 'your_fb_app_secret'
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
  "integration": {
    "_id": "582dedf230e788746891281a",
    "type": "messenger",
    "pageId": "841556169307254",
    "appId": "1674554616147204"
  }
}
```

Facebook Messenger Setup steps:

1. Take note of your Facebook app ID and secret (apps can be created at [developer.facebook.com](https://developer.facebook.com));
2. The Facebook app must have been submitted to Facebook for approval with the "manage_pages" and "pages_messaging" permissions.

In order to integrate a Facebook Messenger app you must acquire a Page Access Token from your user. Once you have acquired a page access token from your user, call the Create Integration endpoint with your app secret and ID and the user’s page access token.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type: _messenger_. |
| **pageAccessToken**<br/><span class='req'>required</span> | A Facebook Page Access Token. |
| **appId**<br/><span class='req'>required</span> | A Facebook App ID. |
| **appSecret**<br/><span class='req'>required</span> | A Facebook App Secret. |

## Twitter DM

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{ "type": "twitter", "consumerKey": "your_consumer_key", "consumerSecret": "your_consumer_secret", "accessTokenKey": "your_access_token_key", "accessTokenSecret": "your_access_token_secret" }' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```

```javascript
smooch.integrations.create('55c8d9758590aa1900b9b9f6', {
    type: 'twitter',
    consumerKey: 'your_consumer_key',
    consumerSecret: 'your_consumer_secret',
    accessTokenKey: 'your_access_token_key',
    accessTokenSecret: 'your_access_token_secret'
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
  "integration": {
    "_id": "58ecfde7e2aa9fda95fa122c",
    "type": "twitter",
    "userId": "0000000000",
    "username": "Mike Mikeson",
    "accessTokenKey": "your_access_token_key",
    "consumerKey": "your_consumer_key"
  }
}
```

Twitter DM Setup steps:

1. Take note of your Twitter consumer key and secret (apps can be created at [apps.twitter.com](https://apps.twitter.com/)).
2. Your app must have been whitelisted with Twitter for access to the [Account Activity API](https://dev.twitter.com/webhooks/account-activity).

In order to create a Twitter DM integration you must acquire an Access Token Key and Secret from your user.
These can be obtained via the [Twitter OAuth Flow](https://dev.twitter.com/oauth). Once you have acquired an access
token pair from your user, call the Create Integration endpoint with your consumer key and secret, and the user’s
access token pair.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type: _twitter_. |
| **consumerKey**<br/><span class='req'>required</span> | The consumer key for your Twitter app |
| **consumerSecret**<br/><span class='req'>required</span> | The consumer key secret for your Twitter app |
| **accessTokenKey**<br/><span class='req'>required</span> | The access token key obtained from your user via oauth |
| **accessTokenSecret**<br/><span class='req'>required</span> | The access token secret obtained from your user via oauth |

<aside class='notice'>
When adding a Twitter integration, Smooch will automatically configure your Twitter application's webhook to point to
Smooch servers. If a webhook already exists that does not point to Smooch, the request will fail, and you will first
need to [delete your webhook](https://dev.twitter.com/webhooks/reference/del/account_activity/webhooks) in order to
successfully integrate Twitter.
</aside>

## Twilio

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "twilio", "accountSid": "ACa1b4c65ee0722712fab89867cb14eac7", "authToken": "160c024303f53049e1e060fd67ca6aefc", "phoneNumberSid": "PN0674df0ecee0c9819bca0ff0bc0a159e"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```

```javascript
smooch.integrations.create('55c8d9758590aa1900b9b9f6', {
    type: 'twilio',
    accountSid: 'ACa1b4c65ee0722712fab89867cb14eac7',
    authToken: '160c024303f53049e1e060fd67ca6aefc',
    phoneNumberSid: 'PN0674df0ecee0c9819bca0ff0bc0a159e'
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
    "integration": {
      "_id": "5735ddf948011972d621dc08",
      "type": "twilio",
      "phoneNumberSid": "PN0674df0ecee0c9819bca0ff0bc0a159e",
      "phoneNumber": "+15146125236",
      "name": "Mike's Account",
      "accountSid": "ACa1b4c65ee0722712fab89867cb14eac7"
    }
}
```

To configure a Twilio integration, acquire the required information from the user and call the Create Integration endpoint.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type: _twilio_. |
| **accountSid**<br/><span class='req'>required</span> | Twilio Account SID. |
| **authToken**<br/><span class='req'>required</span> | Twilio Auth Token. |
| **phoneNumberSid**<br/><span class='req'>required</span> | SID for specific phone number. |

## Telegram

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "telegram", "token": "192033615:AAEuee2FS2JYKWfDlTulfygjaIGJi4s"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```

```javascript
smooch.integrations.create('55c8d9758590aa1900b9b9f6', {
    type: 'telegram',
    token: '192033615:AAEuee2FS2JYKWfDlTulfygjaIGJi4s'
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
    "integration": {
      "_id": "5735ddfb48011972d621dc09",
      "type": "telegram",
      "username": "mikes_smooch_bot"
    }
}
```

To configure a Telegram integration, acquire the required information from the user and call the Create Integration endpoint.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type: _telegram_. |
| **token**<br/><span class='req'>required</span> | Telegram Bot Token. |

## LINE

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "line", "channelAccessToken": "jZak8gGEYxfy1gIxk869osf2SuT6o11rtLqZQnAx9TiKE7eFXwgnnL58dtwOd1ON9e11GPTDfq+b4hson3dvvYAnAaAnbXYjj1rCUIzgxAa4xVZwGqyS+2rzpswZnGhAuMBWQxCMsF9dwztolUr01wdB04t89/1O/w1cDnyilFU=", "channelSecret": "b85cff984b26eac4297917abd365c4d6"' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```

```javascript
smooch.integrations.create('55c8d9758590aa1900b9b9f6', {
    type: 'line',
    channelAccessToken: 'jZak8gGEYxfy1gIxk869os...',
    channelSecret: 'b85cff984b26eac4297917abd365c4d6'
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
    "integration": {
      "_id": "5735ddfd48011972d621dc0a",
      "type": "line",
      "botName": "Mike Bot"
    }
}
```

For LINE, each of your customers will need to manually configure a webhook in their LINE configuration page that will point to Smooch servers. You must instruct your customers how to configure this manually on their LINE bot page.

Your customers must set the Callback URL field in their [LINE Business Center page](https://business.line.me/en/).

The URL should look like the following: `https://app.smooch.io:443/api/line/webhooks/{appId}`.

Once you've acquired all the required information and the callback url has been configured, call the Create Integration endpoint.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type: _line_. |
| **channelAccessToken**<br/><span class='req'>required</span> | LINE Channel Access Token. |
| **channelSecret**<br/><span class='req'>required</span> | LINE Channel Secret. |

## Viber

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "viber", "token": "df5f8c5233399561-92636b0c5ba30da9-16d4928fc004a72d"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```

```javascript
smooch.integrations.create('55c8d9758590aa1900b9b9f6', {
    type: 'viber',
    token: 'df5f8c5233399561-926...'
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
    "integration": {
        "_id": "5818fa177682fcb51368635d",
        "type": "viber",
        "uri": "MikesBusiness"
    }
}

```
To configure a Viber integration, acquire the Viber Public Account token from the user and call the Create Integration endpoint.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type: _viber_. |
| **token**<br/><span class='req'>required</span> | Viber Public Account token. |

## WeChat

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "wechat", "appId": "ACa1b4c65ee0722712fab89867cb14eac7", "appSecret": "160c024303f53049e1e060fd67ca6aefc"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```

```javascript
smooch.integrations.create('55c8d9758590aa1900b9b9f6', {
    type: 'wechat',
    appId: 'ACa1b4c65ee0722712fab89867cb14eac7',
    appSecret: '160c024303f53049e1e060fd67ca6aefc'
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
    "integration": {
        "_id": "5735ddfd48011972d621dc0a",
        "type": "wechat",
        "appId": "c69175d6d125b772b",
        "webhookSecret": "3889794ab2fd4a70940a97c4b4a6372e"
    }
}
```

To configure a WeChat integration, browse to the Develop section of the [WeChat dashboard](https://mp.weixin.qq.com/) and add the following IP addresses to the whitelist, separated by new lines. This must be done **before** calling the Create Integration endpoint.


    34.224.190.28

    52.6.201.31

    52.0.232.16

From the same page, acquire the WeChat App ID and App Secret from the customer and call the Create Integration endpoint.

In their [WeChat dashboard](https://mp.weixin.qq.com/), the customer must set the "URL" field to `https://app.smooch.io/api/wechat/webhooks/{smoochAppId}`, and set the "Token" field to the value of the webhookSecret found in the response to the call to the Create Integration endpoint.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type: _wechat_. |
| **appId**<br/><span class='req'>required</span> | WeChat App ID. |
| **appSecret**<br/><span class='req'>required</span> | WeChat App Secret. |
| **encodingAesKey**<br/><span class='opt'>optional</span> | AES Encoding Key. |

## Mailgun

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "mailgun", "apiKey": "key-f265hj32f0sd897lqd2j5keb96784043", "domain": "sandbox123.mailgun.org",  "incomingAddress": "mytestemail@sandbox123.mailgun.org"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```

```javascript
smooch.integrations.create('55c8d9758590aa1900b9b9f6', {
    type: 'mailgun',
    apiKey: 'key-f265hj32f0sd897lqd2j5keb96784043',
    domain: 'sandbox123.mailgun.org',
    incomingAddress: 'mytestemail@sandbox123.mailgun.org'
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
    "integration": {
        "type": "mailgun",
        "domain": "sandbox123.mailgun.org",
        "incomingAddress": "mytestemail@sandbox123.mailgun.org",
        "_id": "58adf047b90af0f747cff1d2"
    }
}
```

To configure a Mailgun integration, visit the [API Keys tab](https://app.mailgun.com/app/account/security) in the settings page of the Mailgun dashboard and copy your active API key. Call the Create Integration endpoint with your API Key, a domain you have configured in Mailgun, and the incoming address you would like to use.

| **Arguments**                                             |                                                                                                        |
|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| **type**<br/><span class='req'>required</span>            | The integration type: _mailgun_.                                                                       |
| **apiKey**<br/><span class='req'>required</span>          | The public API key of your Mailgun account.                                                            |
| **domain**<br/><span class='req'>required</span>          | The domain used to relay email. This domain must be configured and verified in your Mailgun account.   |
| **incomingAddress**<br/><span class='req'>required</span> | Smooch will receive all emails sent to this address. It will also be used as the *Reply-To* address.   |

***Note:*** The `incomingAddress` must have the same domain as the one specified in the `domain` parameter.

## MessageBird

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "messagebird", "accessKey": "V0oSoktDijjGiAof265hj32fh", "originator": "12262121021"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```

```javascript
smooch.integrations.create('55c8d9758590aa1900b9b9f6', {
    type: 'messagebird',
    accessKey: 'V0oSoktDijjGiAof265hj32fh',
    originator: '12262121021'
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
    "integration": {
        "type": "messagebird",
        "webhookSecret": "72ade38394d1da51566cede33bd1e67e",
        "originator": "12262121021",
        "_id": "594850b82e4a8e5e04ef2a11"
    }
}
```

To configure a MessageBird integration, acquire the `accessKey` and the MessageBird number you would like to use, then call the Create Integration endpoint.

In the SMS Configurations of the [MessageBird number](https://dashboard.messagebird.com/app/en-ca/numbers) you've used to integrate, add a new rule with the following settings:

* If `[Always]`, Then `Forward to URL` and `POST`. Then, enter the following into the URL field: `https://app.smooch.io/api/messagebird/webhooks/:appId/:integrationId/:webhookSecret`

| **Arguments**                                             |                                                                                                        |
|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| **type**<br/><span class='req'>required</span>            | The integration type: _messagebird_.                                                                       |
| **accessKey**<br/><span class='req'>required</span>          | The public API key of your MessageBird account.                                                            |
| **originator**<br/><span class='req'>required</span> | Smooch will receive all messages sent to this phone number. |

## Apple Push Notification

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "apn", "certificate": "HjkUD4rWvZj7wSDzA8Hu2hd7ICs274Z=="}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```

```javascript
smooch.integrations.create('55c8d9758590aa1900b9b9f6', {
    type: 'apn',
    certificate: 'HjkUD4rWvZj7wSDzA8Hu2hd7ICs274Z=='
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
  "integration": {
    "type": "apn",
    "_id": "58878a8842fadcdb7b70b74c",
    "production": false,
    "autoUpdateBadge": false
  }
}
```

To configure an Apple Push Notification integration, call the create integration endpoint with a **base64** encoded Apple Push Notification certificate
from the [Apple Developer Portal](https://developer.apple.com/).

| **Arguments**                                             |                                                                                |
|-----------------------------------------------------------|--------------------------------------------------------------------------------|
| **type**<br/><span class='req'>required</span>            | The integration type: _apn_.                                                   |
| **certificate**<br/><span class='req'>required</span>     | The binary of your APN certificate base64 encoded.                             |
| **password**<br/><span class='opt'>optional</span>        | The password for your APN certificate.                                         |
| **autoUpdateBadge**<br/><span class='opt'>optional</span> | Use the unread count of the conversation as the application badge. _true/false_|

To base64 encode your certificate you can use this command in the terminal:
<api>`openssl base64 -in YOUR_CERTIFICATE.p12 | tr -d '\n'`</api>

<div class="snippet">
In Node.js:
<pre>
fs.readFile('path/to/your/certificate.p12', function(err, data) {
    const base64Cert = data.toString('base64');
})
</pre>
</div>

## Firebase Cloud Messaging

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "fcm", "serverKey": "AAAA_hSf4g2J2Q3zDh2DbvSh27dhKlm2", "senderId": "1429457686312"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```

```javascript
smooch.integrations.create('55c8d9758590aa1900b9b9f6', {
    type: 'fcm',
    serverKey: 'AAAA_hSf4g2J2Q3zDh2DbvSh27dhKlm2',
    senderId: '1429457686312'
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
  "integration": {
    "_id": "5876a3d4abf286d0c0af1467",
    "type": "fcm",
    "senderId": "1429457686312"
  }
}
```

To configure a Firebase Cloud Messaging integration, first visit the [Firebase Console](https://console.firebase.google.com/).
Copy the `serverKey` and `senderId` from the `Cloud Messaging` tab in the settings of your project and call the create
integrations endpoint with this data.

If you would like to continue using your legacy GCM `serverKey` you can also obtain it from the [Google Developer Console](https://console.developers.google.com).

| **Arguments**                                       |                                        |
|-----------------------------------------------------|----------------------------------------|
| **type**<br/><span class='req'>required</span>      | The integration type: _fcm_.           |
| **serverKey**<br/><span class='req'>required</span> | Your server key from the fcm console.  |
| **senderId**<br/><span class='req'>required</span>  | Your sender id from the fcm console.   |

## List Integrations

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
       -H 'authorization: Bearer your-account-jwt'
```

```javascript
smooch.integrations.list('55c8d9758590aa1900b9b9f6').then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
  "integrations": [
    {
      "_id": "582dedf230e788746891281a",
      "type": "messenger",
      "pageId": "841556169307254",
      "appId": "1674554616147204"
    },
    {
      "_id": "5735ddf948011972d621dc08",
      "type": "twilio",
      "phoneNumberSid": "PN0674df0ecee0c9819bca0ff0bc0a159e",
      "phoneNumber": "+15146125236",
      "name": "Mike's Account",
      "accountSid": "ACa1b4c65ee0722712fab89867cb14eac7"
    },
    {
      "_id": "5735ddfb48011972d621dc09",
      "type": "telegram",
      "username": "mikes_smooch_bot"
    },
    {
      "_id": "5735ddfd48011972d621dc0a",
      "type": "line",
      "mid": "uf0c0bc1813d372ac5af4c5b5faee9923",
      "channelId": "1462776483",
      "botName": "Mike Bot"
    }
  ]
}

```

<api>`GET /v1/apps/{appId}/integrations`</api>

Lists all integrations for a given app.

| Parameter                | Description              |
|--------------------------|--------------------------|
| `types`                  | String, the list can be filtered to return only integrations of a specific type. Possible values are _messenger_, _twitter_, _line_, _telegram_, _twilio_, _mailgun_, _wechat_, and _viber_. More than one value can be specified through comma separation e.g. `?types=twilio,line` |

## Get Integration

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations/5735dded48011972d621dc02 \
       -H 'authorization: Bearer your-account-jwt'
```

```javascript
smooch.integrations.get('55c8d9758590aa1900b9b9f6', '5735dded48011972d621dc02').then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
  "integration": {
    "_id": "582dedf230e788746891281a",
    "type": "messenger",
    "pageId": "841556169307254",
    "appId": "1674554616147204"
  }
}

```

<api>`GET /v1/apps/{appId}/integrations/{integrationId}`</api>

Return the specified integration.

## Delete Integration

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations/5735dded48011972d621dc02 \
       -X DELETE \
       -H 'authorization: Bearer your-account-jwt'
```

```javascript
smooch.integrations.delete('55c8d9758590aa1900b9b9f6', '5735dded48011972d621dc02').then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{}
```

<api>`DELETE /v1/apps/{appId}/integrations/{integrationId}`</api>

Removes the specified integration.
