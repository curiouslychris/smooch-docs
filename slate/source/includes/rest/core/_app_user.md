# App User

The app user object represents an end user using your app. The app user document contains basic profile information such as `givenName`, `surname`, and `email`, as well as any custom user properties you choose to configure.

The `/v1/apps/{appId}/appusers` path gives you APIs that can be used to update the user's properties, retrieve conversation history, post a message, and track app user events.

## userId

App users may be created with an optional `userId` parameter. This is a unique identifier that is chosen by the API consumer and it can be used to synchronize a single conversation across multiple clients. To understand how this works, see the section covering [users on multiple clients](/guide/multi-client-users).

<aside class="notice">
If a `userId` has been specified for a given app user, it can be used in place of the `appUser._id` in any `/v1/apps/{appId}/appusers/` API path.
</aside>

## Get App User

> Request by smoochId:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f \
     -H 'authorization: your-account-jwt'
```
```js
smooch.appUsers.get('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f').then((response) => {
    // async code
});
```

> Request by userId:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/steveb@channel5.com \
     -H 'authorization: your-account-jwt'
```
```js
smooch.appUsers.get('5963c0d619a30a2e00de36b8', 'steveb@channel5.com').then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
    "appUser": {
        "_id": "deb920657bbc3adc3fec7963",
        "userId": "steveb@channel5.com",
        "givenName": "Steve",
        "surname": "Brule",
        "email": "steveb@channel5.com",
        "signedUpAt": "2015-10-08T23:52:11.677Z",
        "properties": {},
        "conversationStarted": true,
        "clients": [
          {
            "active": true,
            "appVersion": "1.0",
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "ios",
            "pushNotificationToken": "<...>",
            "info": {
              "appName": "ShellApp",
              "devicePlatform": "x86_64",
              "os": "iPhone OS",
              "osVersion": "9.2"
            },
            "raw": {
              "appName": "ShellApp",
              "devicePlatform": "x86_64",
              "os": "iPhone OS",
              "osVersion": "9.2"
            }
          }
        ]
    }
}
```

<api>`GET /v1/apps/{appId}/appusers/{smoochId|userId}`</api>

Retrieve a specific app user. Like all other `/v1/apps/{appId}/appusers/` paths, an app user can be identified using either the `smoochId` or the `userId`.

## Update App User

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f \
     -X PUT \
     -d '{"givenName": "Steve"}' \
     -H 'content-type: application/json' \
     -H 'authorization: your-account-jwt'
```
```js
smooch.appUsers.update('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
    givenName: 'Steve'
}).then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
  "appUser": {
    "_id": "deb920657bbc3adc3fec7963",
    "userId": "steveb@channel5.com",
    "givenName": "Steve",
    "surname": "Brule",
    "email": "steveb@channel5.com",
    "signedUpAt": "2015-10-08T23:52:11.677Z",
    "properties": {},
    "conversationStarted": true,
    "clients": [
      {
        "active": true,
        "appVersion": "1.0",
        "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
        "lastSeen": "2016-03-09T19:09:01.431Z",
        "platform": "ios",
        "pushNotificationToken": "<...>",
        "info": {
          "appName": "ShellApp",
          "devicePlatform": "x86_64",
          "os": "iPhone OS",
          "osVersion": "9.2"
        }
      }
    ]
  }
}
```

<api>`PUT /v1/apps/{appId}/appusers/{smoochId|userId}`</api>

Update an app user's basic profile information and specify custom profile data via `properties`. This API is additive; only the specific fields specified in the request body, and only the specific JSON sub-fields included in the `properties` field will be updated. In other words, omitting a field will not delete that field.

| **Arguments**                 |                            |
|-------------------------------|----------------------------|
| **givenName**<br/><span class='opt'>optional</span>  | The user's given name (first name). |
| **surname**<br/><span class='opt'>optional</span>    | The user's surname (last name). |
| **email**<br/><span class='opt'>optional</span>      | The user's email address. |
| **signedUpAt**<br/><span class='opt'>optional</span> | The date at which the user signed up. Must be ISO 8601 time format (`YYYY-MM-DDThh:mm:ss.sssZ`) |
| **properties**<br/><span class='opt'>optional</span> | A flat object containing custom defined user properties. |

## Delete User Profile

> Request by smoochId:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/profile \
     -X DELETE \
     -H 'authorization: Bearer your-account-jwt'
```
```js
smooch.appUsers.deleteProfile('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f').then((response) => {
    // async code
});
```

> Request by userId:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/steveb@channel5.com/profile \
     -X DELETE \
     -H 'authorization: Bearer your-account-jwt'
```
```js
smooch.appUsers.deleteProfile('5963c0d619a30a2e00de36b8', 'steveb@channel5.com').then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
    "appUser": {
        "_id": "deb920657bbc3adc3fec7963",
        "userId": "steveb@channel5.com",
        "signedUpAt": "2015-10-08T23:52:11.677Z",
        "properties": {},
        "conversationStarted": true,
        "clients": [
          {
            "active": true,
            "appVersion": "1.0",
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "ios",
            "pushNotificationToken": "<...>"
          }
        ]
    }
}
```

<api>`DELETE /v1/apps/{appId}/appusers/{smoochId|userId}/profile`</api>

Delete a user's profile. Calling this API will clear `givenName`, `surname`, `email` and every custom property for the specified user.

For every client owned by the user, it will also clear `displayName`, `avatarUrl` and any channel specific information stored in the `info` field.

## Pre-Create App User

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers \
     -X POST \
     -d '{"userId": "steveb@channel5.com", "givenName": "Steve", "properties": {"favoriteFood": "prizza"}}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```
```js
smooch.appUsers.create('5963c0d619a30a2e00de36b8', 'steveb@channel5.com', {
    givenName: 'Steve',
    properties: {
        favoriteFood: 'prizza'
    }
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
    "appUser": {
        "_id": "deb920657bbc3adc3fec7963",
        "userId": "steveb@channel5.com",
        "givenName": "Steve",
        "signedUpAt": "2015-10-08T23:52:11.677Z",
        "properties": {
          "favoriteFood": "prizza"
        },
        "conversationStarted": false,
        "credentialRequired": false
    }
}
```

<api>`POST /v1/apps/{appId}/appusers`</api>

| **Arguments**                 |                            |
|-------------------------------|----------------------------|
| **userId**<br/><span class='req'>required</span>     | A unique identifier for the app user. The `userId` can be used to link a user to the same conversation [across multiple clients](/guide/multi-client-users).|
| **credentialRequired**<br/><span class='opt'>optional</span> | Default is `false`. Set to `true` to ensure that the created app user requires a `jwt` credential. See [authenticating your users](/#authenticating-users-optional) for more information.
| **givenName**<br/><span class='opt'>optional</span>  | The user's given name (first name). |
| **surname**<br/><span class='opt'>optional</span>    | The user's surname (last name). |
| **email**<br/><span class='opt'>optional</span>      | The user's email address. |
| **signedUpAt**<br/><span class='opt'>optional</span> | The date at which the user signed up. Must be ISO 8601 time format (`YYYY-MM-DDThh:mm:ss.sssZ`) |
| **properties**<br/><span class='opt'>optional</span> | A flat object containing custom defined user properties. |

In the vast majority of cases app users will be automatically created by the Smooch SDKs or Messaging Channel integrations. In some cases however it might be necessary to pre-create an app user object before that user runs your app for the first time. This API facilitates this scenario. A `userId` must be specified so that a future `login` call made from a device can use the same `userId` to link the device to the pre-created app user.

Suppose for example you begin a conversation with an end user `bob@example.com` over email and you wish to transfer this conversation history over into Smooch once that user logs in to your app. To facilitate this, you can call `POST /v1/apps/{appId}/appusers` to pre-create a Smooch identity with `userId` `bob@example.com`, to which you can import that existing conversation history. After Bob signs in to your app and your app calls `login` with the same `userId`, they will see their conversation history.

## Get App User Channel Entities

> Request:

```shell
curl https https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/deb920657bbc3adc3fec7963/channels \
    -H 'authorization: Bearer your-account-jwt'
```

```js
smooch.appUsers.getChannels('5963c0d619a30a2e00de36b8', 'deb920657bbc3adc3fec7963').then((response) => {
    //Async code
});
```

> Response:

```
200 OK
```
```json
{
    "channels": [
        {
            "type": "twilio",
            "phoneNumber": "+15145555555"
        },
        {
            "type": "messenger",
            "userId": "198273192387"
        }
    ]
}
```

<api>`GET /v1/apps/{appId}/appusers/{smoochId|userId}/channels`</api>

Retrieves all of the app user's channel entity IDs.

## Get App User Business System IDs

> Request:

```shell
curl https https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/deb920657bbc3adc3fec7963/businesssystems \
    -H 'authorization: Bearer your-account-jwt'
```

```js
smooch.appUsers.getBusinessSystems('5963c0d619a30a2e00de36b8', 'deb920657bbc3adc3fec7963').then((response) => {
    //Async code
});
```

> Response:

```
200 OK
```
```json
{
    "businessSystems": [
        {
            "type": "slack",
            "channelId": "C872AE91B"
        },
        {
            "type": "zendesk",
            "ticketId": "9999"
        },
        {
            "type": "hipchat",
            "roomId": 1337
        },
        {
            "type": "helpscout",
            "conversationId": "123456"
        }
    ]
}
```

<api>`GET /v1/apps/{appId}/appusers/{smoochId|userId}/businesssystems`</api>

Retrieves all the [business systems](https://app.smooch.io/integrations/categories/business-systems) an appUser's conversation is connected to.
#### Business system response properties

| **Channel Type**   | **Id Name**                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| slack              | **channelId**<br/>A string representing the Slack channel id.               |
| zendesk            | **ticketId**<br/>A string representing a Zendesk ticket id.                 |
| hipchat            | **roomId**<br/>An integer representing the Hipchat room id.                 |
| helpscout          | **conversationId**<br/>A string representing the Helpscout conversation id. |

## Link App User To Channel

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/deb920657bbc3adc3fec7963/channels \
     -X POST \
     -d '{"type": "twilio", "confirmation": {"type": "prompt"}, "phoneNumber": "+15145555555"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```
```js
smooch.appUsers.linkChannel('5963c0d619a30a2e00de36b8', 'steveb@channel5.com', {
    type: 'twilio',
    phoneNumber: '+15145555555',
    confirmation: {
      type: 'prompt'
    }
}).then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
    "appUser": {
        "_id": "deb920657bbc3adc3fec7963",
        "userId": "steveb@channel5.com",
        "givenName": "Steve",
        "signedUpAt": "2015-10-08T23:52:11.677Z",
        "properties": {
          "favoriteFood": "pizza"
        },
        "conversationStarted": false,
        "credentialRequired": false,
        "clients": [],
        "pendingClients": [
            {
                "id": "d383f9f4-c8d2-42dd-9f7c-f525fad6849d",
                "platform": "twilio",
                "displayName": "+15145555555"
            }
        ]
    }
}
```

<api>`POST /v1/apps/{appId}/appusers/{smoochId|userId}/channels`</api>

| **Arguments**                 |                            |
|-------------------------------|----------------------------|
| **type**<br/><span class='req'>required</span>     | The channel to link. Can be `twilio`, `messenger` or `mailgun`|
| **{entity}**<br/><span class='req'>required</span> | The required entity for linking. This is [different for each channel](#linkable-channels-and-entities).|
| **confirmation**<br/><span class='req'>required</span> | The [confirmation option](#linking-confirmation) for linking. |
| **primary**<br/><span class='opt'>optional</span> | Default is `true`. Flag indicating whether the client will [become the primary](https://docs.smooch.io/guide/sending-messages/#automatic-message-delivery) once linking is complete. |

[Some extra arguments](#linkable-channels-and-entities) are supported depending on the selected type.

Linking allows users to continue conversations on their preferred channels. An appUser's linked channels will be found in the `clients` field.

When a link request is first made, the channel will be added to the `pendingClients` field. At this point, the API call will be considered a success and a response will be returned.
Future updates on the status of the link request can be tracked by listening to the [link:match](#trigger---code-classprettyprintlinkmatchcode), [link:success](#trigger---code-classprettyprintlinksuccesscode) and [link:failure](#trigger---code-classprettyprintlinkfailurecode) webhooks.

<aside class="notice">
The `skipConfirmation` flag is still supported to preserve backwards compatibility, but will only be accepted for `twilio` linking.
</aside>

### Linking confirmation

The **confirmation** option allows you to specify the strategy used to initiate a link with the target user.

| **Arguments**                 |                            |
|-------------------------------|----------------------------|
| **type**<br/><span class='req'>required</span> | The type of confirmation. Types include [immediate](#immediate), [userActivity](#user-activity) or [prompt](#prompt) |
| **message**<br/> | The message used to reach out to the user. Must be a valid message object as per the [post message](#post-message) API |

<aside class="notice">
Messages sent via the Linking API can only be of type `text` and `image` at the moment. If `actions` are included they can only be of type `link`.
The confirmation message will not be added to the appUser's conversation.
</aside>

#### Immediate

Available on: `Twilio`, `Messenger`, `Mailgun`

If you specify an `immediate` confirmation, Smooch will not wait for the user to confirm the link before converting the pending client to a full client. On a successful link, the [link:success](#trigger---code-classprettyprintlinksuccesscode) webhook will be triggered.

If the `message` property is provided, Smooch will attempt to deliver it to the channel prior to completing the link. Successfully sending this message will trigger a [link:match](#trigger---code-classprettyprintlinkmatchcode) webhook. Failure to deliver this message will result in a [link:failure](#trigger---code-classprettyprintlinkfailurecode) webhook, and the pending client will be removed from the user.

#### User activity

Available on: `Twilio`, `Messenger`

If you specify a `userActivity` confirmation, Smooch will wait for the user to confirm the link before converting the pending client to a full client. If the user performs an activity acknowledging the message was received (for example accepting the message request on Facebook Messenger), the [link:success](#trigger---code-classprettyprintlinksuccesscode) webhook will be triggered.

The `message` property is mandatory for this confirmation type. Smooch will attempt to deliver it to the channel prior to listening for the user's activity. This is a good opportunity to welcome the user to the new channel and invite them to begin messaging you there. Successfully sending this message will trigger a [link:match](#trigger---code-classprettyprintlinkmatchcode) webhook. Failure to deliver this message will result in a [link:failure](#trigger---code-classprettyprintlinkfailurecode) webhook, and the pending client will be removed from the user.

#### Prompt

Available on: `Twilio`

If you specify a prompt confirmation, the user will be prompted to either accept or deny your link request. The message sent to prompt the user can't be customized.

Successfully sending the prompt will trigger a [link:match](#trigger---code-classprettyprintlinkmatchcode) webhook. Failure to deliver this message or a denial of the prompt will result in a [link:failure](#trigger---code-classprettyprintlinkfailurecode) webhook, and the pending client will be removed from the user.

### Linkable channels and entities

Given that there is no way for you to provide Smooch with the necessary ID to connect LINE, WeChat or Telegram, we have limited the API to accept ‘Twilio’ and 'Messenger' for now.

| Channel type                 | Required entity              | Extra properties             |
|------------------------------|------------------------------|------------------------------|
| twilio                       | **phoneNumber**<br/> A String of the appUser's phone number. It must contain the `+` prefix and the country code.<br/> Examples of valid phone numbers: `+1 212-555-2368`, `+12125552368`, `+1 212 555 2368`.<br/> Examples of invalid phone numbers: `212 555 2368`, `1 212 555 2368`.                  |
| messenger                    | **phoneNumber**<br/> A String of the appUser's phone number. It must contain the `+` prefix and the country code.<br/> Examples of valid phone numbers: `+1 212-555-2368`, `+12125552368`, `+1 212 555 2368`.<br/> Examples of invalid phone numbers: `212 555 2368`, `1 212 555 2368`.                  | `givenName` and `surname` may be specified as additional criteria to increase the likelihood of a match. |
| mailgun                      | **address**<br/> A String of the appUser's email address | `subject` may be specified to set the subject for the outgoing email. <br/><br/> Default `subject`: "New message from {appName}" |

<aside class="notice">
Messenger linking [requires a special permission](https://developers.facebook.com/docs/messenger-platform/guides/customer-matching#access) on your Facebook page and is subject to a $99 USD one-time fee.
Given this permission requirement, Messenger linking is only possible when targeting an app integrated via our [Integration API](#facebook-messenger).
A confirmation `message` is also required to initiate a link for the Messenger channel.
</aside>

## Unlink App User From Channel

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/deb920657bbc3adc3fec7963/channels/twilio \
     -X DELETE \
     -d '{"type": "twilio"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```
```js
smooch.appUsers.unlinkChannel('5963c0d619a30a2e00de36b8', 'steveb@channel5.com', 'twilio')
.then(() => {
    // async code
});
```

> Response:

```
200 OK
```

<api>`DELETE /v1/apps/{appId}/appusers/{smoochId|userId}/channels/{channel}`</api>

Removes the specified channel from the appUser's clients.

## Schema

### App user schema

The appUser schema describes the appUser data sent in webhook payloads, and in GET appUser responses.

| Field                                         | Description                                                                                                               |
|-----------------------------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------|
| **_id**  | A canonical ID that can be used to retrieve the appUser.                                                                  |
| **userId** <span class="opt">optional</span>| An optional ID that if specified can also be used to retreive the appUser.                                                |
| **properties**  | A flat object of optional properties set by the app maker.                                                           |
| **signedUpAt**  | A datetime string with the format **yyyy-mm-ddThh:mm:ssZ** representing the moment an appUser was created.                |
| **clients**  | An array of objects representing the clients associated with the appUser. See the [client schema](#client-schema) below for details. |
| **pendingClients**  | As clients, but containing linked clients which have not been confirmed yet (i.e. Twilio SMS)                             |
| **devices** (_deprecated_)  | Identical to the clients array, but **deprecated**.                                                                |
| **conversationStarted**  | A boolean representing of whether a message has been sent or not.                                                         |
| **credentialRequired**  | A boolean representing whether the appUser is secured by a JSON Web Token or not.                                         |
| **email** <span class="opt">optional</span>| An optional email address.                                                                                                |
| **givenName** <span class="opt">optional</span>| An optional given name.                                                                                                   |
| **surname** <span class="opt">optional</span>| An optional surname.                                                                                                      |

### Truncated app user schema

The truncated appUser is a partial selection of properties from the appUser model. The truncated appUser is provided in the payloads of certain webhooks.


| Field | Description                                              |
|-------|--------|----------------------------------------------------------|
| **_id**  | A canonical ID that can be used to retrieve the appUser. |
| **userId** <span class="opt">optional</span>| An optional ID that if specified can also be used to retrieve the appUser.                                                |
| **conversationStarted** <span class="opt">optional</span>| A boolean representing of whether a message has been sent or not.                                                         |

### Client schema

Client specific info

| Field                                          | Description                                                                                                                                    |
|------------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| **active**  | If active is `false` then the appUser is not logged in to the client and signifies that the appUser will not receive APN or FCM notifications. This pertains to the SDKs. |
| **platform**  | Includes one of `"web"`, `"ios"`, `"android"`, `"messenger"`, `"viber"`, `"telegram"`, `"wechat"`, `"line"`, `"twilio"`, and `"frontendEmail"`, `"other"`, or any number of other platforms. |
| **primary**  | Boolean indicating if the platform is the appUser's primary channel. The primary channel is the user's most active channel and the preferred delivery channel for the appMaker's messages.|
| **id**  | A unique identifier for a device if on Web, iOS, or Android, or a client on other channels. |
| **displayName** <span class="opt">optional</span> | The appUser's display name as provided by the client. |
| **avatarUrl** <span class="opt">optional</span> | The URI for an appUser's avatar, as provided by the client. |
| **info** <span class="opt">optional</span>| A flat curated Object with properties that vary for each client platform. All keys are optionals and not guaranteed to be available.                 |
| **raw** <span class="opt">optional</span>| An Object with raw properties that vary for each client platform. All keys are optionals and not guaranteed to be available. See the [raw client info list](#raw-client-info) below for details. |
| **appVersion** <span class="opt">optional</span>| For the SDK in a native app, signifies the version of the app. |
| **lastSeen**  | A datetime string with the format **yyyy-mm-ddThh:mm:ssZ** representing the last time the appUser sent a message, or launched a client like Web, Android, or iOS.  |
| **linkedAt** <span class="opt">optional</span>|             | If the channel was linked to a pre-existing appUser, a timestamp signifying when the linking occurred. Formatted as **yyyy-mm-ddThh:mm:ssZ** |

### Raw client info

Smooch retrieves raw client specific information from each channels and makes it available via the `raw` field of the client.
All keys are optionals and not guaranteed to be available

<aside class="notice">
The list of fields below is an overview of what you can expect in the `raw` field and is provided as a convenience. We recommend following the links to the official specification for each channel for a complete definition.
</aside>

#### Messenger

For Messenger, we retrieve the user's profile via the [user profile API](https://developers.facebook.com/docs/messenger-platform/user-profile).
The response is made available through the `raw` field.

| Field                        | Description |
|------------------------------|-------------|
| **first_name** | First name |
| **last_name** | Last name |
| **profile_pic** | Profile picture |
| **locale** | Locale of the user on Facebook |
| **timezone** | Timezone, number relative to GMT |
| **gender** | Gender |
| **is_payment_enabled** | Is the user eligible to receive messenger platform payment messages |
| **last_ad_referral** | Details of the last Messenger Conversation Ad user was referred from |

#### LINE

For LINE, we retrieve the user's profile via the [get profile API](https://devdocs.line.me/en/#bot-api-get-profile).
The response is made available through the `raw` field.

| Field                        | Description |
|------------------------------|-------------|
| **displayName** | Display name |
| **userId** | User ID |
| **pictureUrl** | Image URL |
| **statusMessage** | Status message |

#### Viber

For Viber, we retrieve the user's profile via the [get user details API](https://developers.viber.com/docs/api/rest-bot-api/#get-user-details).
The response's `user` is made available through the `raw` field.

| Field                        | Description |
|------------------------------|-------------|
| **id** | Unique Viber user id |
| **name** | User’s Viber name |
| **avatar** | URL of the user’s avatar |
| **country** | User’s country code |
| **language** | User’s phone language. Will be returned according to the device language |
| **primary_device_os** | The operating system type and version of the user’s primary device. |
| **api_version** | Max API version, matching the most updated user’s device |
| **viber_version** | The Viber version installed on the user’s primary device |
| **mcc** | Mobile country code |
| **mnc** | Mobile network code |
| **device_type** | The user’s device type |

#### Twitter

For Twitter, we retrieve the user's profile via the [GET users/show API](https://dev.twitter.com/rest/reference/get/users/show).
The response is made available through the `raw` field.

| Field                        | Description |
|------------------------------|-------------|
| **contributors_enabled** | Indicates that the user has an account with “contributor mode” enabled, allowing for Tweets issued by the user to be co-authored by another account. Rarely true (this is a legacy field) |
| **created_at** | The UTC datetime that the user account was created on Twitter. |
| **default_profile** | When true, indicates that the user has not altered the theme or background of their user profile. |
| **default_profile_image** | When true, indicates that the user has not uploaded their own profile image and a default image is used instead. |
| **description** | Nullable. The user-defined UTF-8 string describing their account. |
| **entities** | Entities which have been parsed out of the url or description fields defined by the user. Read more about User Entities. |
| **favourites_count** | The number of Tweets this user has liked in the account’s lifetime. British spelling used in the field name for historical reasons. |
| **follow_request_sent** | Nullable. Perspectival. When true, indicates that the authenticating user has issued a follow request to this protected user account. |
| **following** | Nullable. Perspectival. Deprecated. When true, indicates that the authenticating user is following this user. Some false negatives are possible when set to “false,” but these false negatives are increasingly being represented as “null” instead. |
| **followers_count** | The number of followers this account currently has. Under certain conditions of duress, this field will temporarily indicate “0”. |
| **friends_count** | The number of users this account is following (AKA their “followings”). Under certain conditions of duress, this field will temporarily indicate “0”. |
| **geo_enabled** | When true, indicates that the user has enabled the possibility of geotagging their Tweets. This field must be true for the current user to attach geographic data when using POST statuses / update. |
| **id** | The integer representation of the unique identifier for this User. This number is greater than 53 bits and some programming languages may have difficulty/silent defects in interpreting it. Using a signed 64 bit integer for storing this identifier is safe. Use id_str for fetching the identifier to stay on the safe side. See Twitter IDs, JSON and Snowflake. |
| **id_str** | The string representation of the unique identifier for this User. Implementations should use this rather than the large, possibly un-consumable integer in id. |
| **is_translator** | When true, indicates that the user is a participant in Twitter’s translator community. |
| **lang** | The BCP 47 code for the user’s self-declared user interface language. May or may not have anything to do with the content of their Tweets. |
| **listed_count** | The number of public lists that this user is a member of. |
| **location** | Nullable. The user-defined location for this account’s profile. Not necessarily a location, nor machine-parseable. This field will occasionally be fuzzily interpreted by the Search service. |
| **name** | The name of the user, as they’ve defined it. Not necessarily a person’s name. Typically capped at 20 characters, but subject to change. |
| **notifications** | Nullable. Deprecated. May incorrectly report “false” at times. Indicates whether the authenticated user has chosen to receive this user’s Tweets by SMS. |
| **profile_background_color** | The hexadecimal color chosen by the user for their background. |
| **profile_background_image_url** | A HTTP-based URL pointing to the background image the user has uploaded for their profile. |
| **profile_background_image_url_https** | A HTTPS-based URL pointing to the background image the user has uploaded for their profile. |
| **profile_background_tile** | When true, indicates that the user’s profile_background_image_url should be tiled when displayed. |
| **profile_banner_url** | The HTTPS-based URL pointing to the standard web representation of the user’s uploaded profile banner. By adding a final path element of the URL, it is possible to obtain different image sizes optimized for specific displays. For size variants, please see User Profile Images and Banners. |
| **profile_image_url** | A HTTP-based URL pointing to the user’s profile image. See User Profile Images and Banners. |
| **profile_image_url_https** | A HTTPS-based URL pointing to the user’s profile image. |
| **profile_link_color** | The hexadecimal color the user has chosen to display links with in their Twitter UI. |
| **profile_sidebar_border_color** | The hexadecimal color the user has chosen to display sidebar borders with in their Twitter UI. |
| **profile_sidebar_fill_color** | The hexadecimal color the user has chosen to display sidebar backgrounds with in their Twitter UI. |
| **profile_text_color** | The hexadecimal color the user has chosen to display text with in their Twitter UI. |
| **profile_use_background_image** | When true, indicates the user wants their uploaded background image to be used. |
| **protected** | When true, indicates that this user has chosen to protect their Tweets. See About Public and Protected Tweets. |
| **screen_name** | The screen name, handle, or alias that this user identifies themselves with. screen_names are unique but subject to change. Use id_str as a user identifier whenever possible. Typically a maximum of 15 characters long, but some historical accounts may exist with longer names. |
| **status** | Nullable. If possible, the user’s most recent Tweet or retweet. In some circumstances, this data cannot be provided and this field will be omitted, null, or empty. Perspectival attributes within Tweets embedded within users cannot always be relied upon. |
| **statuses_count** | The number of Tweets (including retweets) issued by the user. |
| **time_zone** | Nullable. A string describing the Time Zone this user declares themselves within. |
| **url** | Nullable. A URL provided by the user in association with their profile. |
| **utc_offset** | Nullable. The offset from GMT/UTC in seconds. |
| **verified** | When true, indicates that the user has a verified account. See Verified Accounts. |
| **is_translation_enabled** | When true, indicates that the user has translation enabled. |
| **has_extended_profile** | When true, indicates that the user has an extended profile. |
| **translator_type** | The type of translator the user has enabled. |
| **profile_location** | Nullable. A URL of the user's profile location. |

#### WeChat

For WeChat, we retrieve the user's profile via the [fetch user profile API](http://open.wechat.com/cgi-bin/newreadtemplate?t=overseas_open/docs/oa/user/fetching-user-profiles#user_fetching-user-profiles).
The response is made available through the `raw` field.

| Field                        | Description |
|------------------------------|-------------|
| **subscribe** | Shows whether the user has followed the Official Account. 0: The user is not a follower, and you cannot obtain other information about this user. |
| **openid** | A unique user ID specific to a given Official Account. A non-follower visiting an Official Account's web pages can also generate a unique OpenID. |
| **nickname** | User nickname |
| **sex** | 1: Male; 2: Female; 0: Not Set |
| **language** | zh_CN: Simplified Chinese |
| **city** | City |
| **province** | Province |
| **country** | Country |
| **headimgurl** | Profile photo URL. The last number in the URL shows the size of the square image, which can be 0 (640*640), 46, 64, 96 and 132. This parameter is null if the user hasn't set a profile photo |
| **subscribe_time** | The timestamp when the user follows the Official Account or the last time if the user has followed several times |

#### Twilio

For Twilio, we extract the user's profile information from [incoming SMS webhooks](https://www.twilio.com/docs/api/twiml/sms/twilio_request), picking out fields that are relevant to the user's profile.

| Field                        | Description |
|------------------------------|-------------|
| **From** | The phone number of the sender. |
| **FromCity** | The city of the sender |
| **FromState** | The state or province of the sender. |
| **FromZip** | The postal code of the called sender. |
| **FromCountry** | The country of the called sender. |

#### Telegram

For Telegram, we retrieve the user's profile via the [fetch user API](https://core.telegram.org/bots/api#user) and the [fetch user profile photos API](https://core.telegram.org/bots/api#userprofilephotos).
The response is made available through the `raw` field.

| Field                        | Description |
|------------------------------|-------------|
| **id** | Unique identifier for this user or bot |
| **first_name** | User‘s or bot’s first name |
| **last_name** | Optional. User‘s or bot’s last name |
| **username** | Optional. User‘s or bot’s username |
| **language_code** | Optional. IETF language tag of the user's language |
| **profile_photos** | This object represent a user's profile pictures  |

#### MessageBird

For MessageBird, we retrieve the user's profile via the [lookup API](https://developers.messagebird.com/docs/lookup).
The response is made available through the `raw` field.

| Field                        | Description |
|------------------------------|-------------|
| **href** | The URL of this lookup. |
| **countryCode** | The country code for this number in ISO 3166-1 alpha-2 format. |
| **countryPrefix** | The country calling code for this number. |
| **phoneNumber** | The phone number in E.164 format without the prefixed plus-sign. |
| **type** | The type of number. This can be fixed line, mobile, fixed line or mobile, toll free, premium rate, shared cost, voip, personal number, pager, universal access number, voice mail or unknown. |
| **formats** | A hash containing references to this phone number in several different formats. |
| **hlr** | The most recent HLR object. If no such HLR objects exists, this hash won't be returned. |

#### Mailgun

For Mailgun, we extract the user's profile information from [incoming "store" webhooks](http://mailgun-documentation.readthedocs.io/en/latest/api-routes.html#examples), picking out fields that are relevant to the user's profile.

| Field                        | Description |
|------------------------------|-------------|
| **from** | The email of the sender. |
| **Reply-To** | The `Reply-To` address of the sender. |
| **stripped-signature** | The sender's signature, stripped. |

#### Web Messenger

For the Web Messenger, we gather relevant information about the user through the browser and expose it in the `raw` field.

| Field                        | Description |
|------------------------------|-------------|
| **currentTitle** | The title of the page the user is currently on. |
| **currentUrl** | The URL of the page the user is currently on. |
| **browserLanguage** | The language the user's browser is set to. |
| **referrer** | The referrer for the page the user is on. |
| **userAgent** | The browser's user agent string. |
| **URL** | The domain of the page the user is currently on (ex: docs.smooch.io). |
| **sdkVersion** | The SDK version for the currently instantiated Web Messenger. |

#### Android SDK

For the Android SDK, we gather relevant information about the user through the app and expose it in the `raw` field.

| Field                        | Description |
|------------------------------|-------------|
| **installer** | The app's installer package name. |
| **sdkVersion** | The Smooch SDK version. |
| **appId** | The Android app's ID. |
| **wifi** | Value specifying whether the user has wifi enabled. |
| **radioAccessTechnology** | The network type being used to access the internet.  |
| **carrier** | The devices's carrier. |
| **appName** | The Android app's name. |
| **devicePlatform** | Manufacturer and model of the device. |
| **osVersion** | The device's OS version. |
| **os** | The device's OS. |

#### iOS SDK

For the iOS SDK, we gather relevant information about the user through the app and expose it in the `raw` field.

| Field                        | Description |
|------------------------------|-------------|
| **radioAccessTechnology** | The network type being used to access the internet.  |
| **appId** | The iOS app's ID. |
| **carrier** | The devices's carrier. |
| **buildNumber** | The app's build number. |
| **devicePlatform** | The device platform. |
| **installer** | The installer of the app. |
| **sdkVersion** | The Smooch SDK version. |
| **osVersion** | The device's OS version. |
| **appName** | The iOS app's name. |
| **os** | The device's OS. |
| **wifi** | Value specifying whether the user has wifi enabled. |
