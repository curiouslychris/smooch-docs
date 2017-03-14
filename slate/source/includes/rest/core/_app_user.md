# App User

The app user object represents an end user using your app. The app user document contains basic profile information such as `givenName`, `surname`, and `email`, as well as any custom user properties you choose to configure.

The `/v1/appusers` path gives you APIs that can be used to update the user's properties, retrieve conversation history, post a message, and track app user events.

## userId

App users may be created with an optional `userId` parameter. This is a unique identifier that is chosen by the API consumer and it can be used to synchronize a single conversation across multiple clients. To understand how this works, see the section covering [users on multiple clients](/guide/multi-client-users).

<aside class="notice">
If a `userId` has been specified for a given app user, it can be used in place of the `appUser._id` in any `/v1/appusers/` API path.
</aside>

## Get App User

> Request by smoochId:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.appUsers.get('c7f6e6d6c3a637261bd9656f').then((response) => {
    // async code
});
```

> Request by userId:

```shell
curl https://api.smooch.io/v1/appusers/steveb@channel5.com \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.appUsers.get('steveb@channel5.com').then((response) => {
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

<api>`GET /v1/appusers/{smoochId|userId}`</api>

Retrieve a specific app user. Like all other `/v1/appusers/` paths, an app user can be identified using either the `smoochId` or the `userId`.

## Update App User

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -X PUT \
     -d '{"givenName": "Steve"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.appUsers.update('c7f6e6d6c3a637261bd9656f', {
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

<api>`PUT /v1/appusers/{smoochId|userId}`</api>

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
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/profile \
     -X DELETE \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.deleteProfile('c7f6e6d6c3a637261bd9656f').then((response) => {
    // async code
});
```

> Request by userId:

```shell
curl https://api.smooch.io/v1/appusers/steveb@channel5.com/profile \
     -X DELETE \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.deleteProfile('steveb@channel5.com').then((response) => {
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

<api>`DELETE /v1/appusers/{smoochId|userId}/profile`</api>

Delete a user's profile. Calling this API will clear `givenName`, `surname`, `email` and every custom property for the specified user.

For every client owned by the user, it will also clear `displayName`, `avatarUrl` and any channel specific information stored in the `info` field.

<aside class="notice">
This endpoint requires a `jwt` credential with `app`, `integration` or `account` level scope.
</aside>

## Update Device

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/devices/5A7F8343-DF41-46A8-96EC-8583FCB422FB \
     -X PUT \
     -d '{"appVersion": "8.0"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.appUsers.updateDevice('c7f6e6d6c3a637261bd9656f', '5A7F8343-DF41-46A8-96EC-8583FCB422FB', {
    appVersion: '8.0'
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
  "device": {
    "active": true,
    "appVersion": "8.0",
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
}
```

<api>`PUT /v1/appusers/{smoochId|userId}/devices/{deviceId}`</api>

Update the properties of a device. This API is additive; only the specific fields specified in the request body, and only the specific JSON sub-fields included in the `info` field will be updated. In other words, omitting a field will not delete that field.

| **Arguments**                 |                            |
|-------------------------------|----------------------------|
| **pushNotificationToken**<br/><span class='opt'>optional</span> | The GCM or APN token to be used for sending push notifications to the device.
| **appVersion**<br/><span class='opt'>optional</span> | A reserved string field for reporting the app version running on the device. For example: `8.0` |
| **info**<br/><span class='opt'>optional</span> | A flat JSON structure detailing device properties. See [Device Info](#device-info). |

## Track Event

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/events \
     -X POST \
     -d '{"name":"completed_sale"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.appUsers.trackEvent('c7f6e6d6c3a637261bd9656f', 'completed_sale').then((response) => {
    // async code
});
```

> Response:

```
201 CREATED
```
```json
{
    "conversationUpdated": true
}
```

<api>`POST /v1/appusers/{smoochId|userId}/events`</api>

Trigger an event for a given app user. Some Smooch whispers are triggered on discrete events. This API is used to trigger such events. For example, if an app has a whisper configured to be sent whenever a user has triggered the `completed_sale` event, calling this API is the way to trigger such a whisper.

| **Arguments**           |   |
|-------------------------|---|
| **name**<br/><span class='req'>required</span> | The name of the triggered event. |

## Pre-Create App User

> Request:

```shell
curl https://api.smooch.io/v1/appusers \
     -X POST \
     -d '{"userId": "steveb@channel5.com", "givenName": "Steve", "properties": {"favoriteFood": "prizza"}}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.create('steveb@channel5.com', {
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

<api>`POST /v1/appusers`</api>

| **Arguments**                 |                            |
|-------------------------------|----------------------------|
| **userId**<br/><span class='req'>required</span>     | A unique identifier for the app user. The `userId` can be used to link a user to the same conversation [across multiple clients](/guide/multi-client-users).|
| **credentialRequired**<br/><span class='opt'>optional</span> | Default is `false`. Set to `true` to ensure that the created app user requires a `jwt` credential. See [authenticating your users](/#authenticating-users-optional) for more information.
| **givenName**<br/><span class='opt'>optional</span>  | The user's given name (first name). |
| **surname**<br/><span class='opt'>optional</span>    | The user's surname (last name). |
| **email**<br/><span class='opt'>optional</span>      | The user's email address. |
| **signedUpAt**<br/><span class='opt'>optional</span> | The date at which the user signed up. Must be ISO 8601 time format (`YYYY-MM-DDThh:mm:ss.sssZ`) |
| **properties**<br/><span class='opt'>optional</span> | A flat object containing custom defined user properties. |

In the vast majority of cases app users will be created from the device or browser registered using the [init API](#init). In some cases however it might be necessary to pre-create an app user object before that user runs your app for the first time. This API facilitates this scenario. A `userId` must be specified so that a future `init` call made from a device can use the same `userId` to link the device to the pre-created app user.

Suppose for example you begin a conversation with an end user `bob@example.com` over email and you wish to transfer this conversation history over into Smooch once that user logs in to your app. To facilitate this, you can call `POST /v1/appusers` to pre-create a Smooch identity with `userId` `bob@example.com`, to which you can import that existing conversation history. After Bob signs in to your app and your app calls `init` with the same `userId`, they will see their conversation history.

<aside class="notice">
Unlike the other App User APIs in this section, this endpoint is not intended to be called from an end user's device or from a browser. It requires a `jwt` credential with `app` level scope.
</aside>

## Get App User Channel Entities

> Request:

```shell
curl https https://api.smooch.io/v1/appusers/deb920657bbc3adc3fec7963/channels \
    -H 'authorization: Bearer your-jwt'
```

```js
// This endpoint is not currently wrapped in a JavaScript lib
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

<api>`GET /v1/appusers/{smoochId|userId}/channels`</api>

Retrieves all of the app user's channel entity IDs.



## Link App User To Channel

> Request:

```shell
curl https://api.smooch.io/v1/appusers/deb920657bbc3adc3fec7963/channels \
     -X POST \
     -d '{"type": "twilio", "phoneNumber": "+15145555555"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.linkChannel('steveb@channel5.com', {
    type: 'twilio',
    phoneNumber: '+15145555555'
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

<api>`POST /v1/appusers/{smoochId|userId}/channels`</api>

| **Arguments**                 |                            |
|-------------------------------|----------------------------|
| **type**<br/><span class='req'>required</span>     | The channel to link.|
| **{entity}**<br/><span class='req'>required</span> | The required entity for linking. This is [different for each channel](#linkable-channels-and-entities).|
| **skipConfirmation**<br/><span class='opt'>optional</span> | Flag to specify whether or not the confirmation message is sent. Requires app scope JWT.|

Linking allows users to continue conversations on their preferred channels. An appUser's linked channels will be found in the `clients` field.

When a link request is first made, the channel will be added to the `pendingClients` field. The appUser is then prompted to accept the linking request. If they do so, the corresponding channel is then moved from the `pendingClients` field to `clients` field. If they reject the linking request then the channel is removed from `pendingClients`.

It is possible to skip the confirmation step with the `skipConfirmation` flag. App scope JWT is required to specify the confirmation option.

### Linkable channels and entities

Given that there is no way for you to provide Smooch with the necessary ID to connect Messenger, LINE, WeChat or Telegram, we have limited the API to only accept ‘Twilio’ for now.
Support for Frontend Email is coming soon.

| Channel type                 | Required entity              |
|------------------------------|------------------------------|
| twilio                       | **phoneNumber**<br/> A String of the appUser's phone number. It must contain the `+` prefix and the country code.<br/> Examples of valid phone numbers: `+1 212-555-2368`, `+12125552368`, `+1 212 555 2368`.<br/> Examples of invalid phone numbers: `212 555 2368`, `1 212 555 2368`.                  |



## Unlink App User From Channel

> Request:

```shell
curl https://api.smooch.io/v1/appusers/deb920657bbc3adc3fec7963/channels/twilio \
     -X DELETE \
     -d '{"type": "twilio"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.unlinkChannel('steveb@channel5.com', 'twilio')
.then(() => {
    // async code
});
```

> Response:

```
200 OK
```

<api>`DELETE /v1/appusers/{smoochId|userId}/channels/{channel}`</api>

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
| **devices**  | Identical to the clients array, but **deprecated**.                                                                |
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
| **id**  | A unique identifier for a device if on Web, iOS, or Android, or a client on other channels. |
| **displayName** <span class="opt">optional</span> | The appUser's display name as provided by the client. |
| **avatarUrl** <span class="opt">optional</span> | The URI for an appUser's avatar, as provided by the client. |
| **info** <span class="opt">optional</span>| A flat Object with raw properties that vary for each client platform. All keys are optionals and not guaranteed to be available.                  |
| **appVersion** <span class="opt">optional</span>| For the SDK in a native app, signifies the version of the app. |
| **lastSeen**  | A datetime string with the format **yyyy-mm-ddThh:mm:ssZ** representing the last time the appUser sent a message, or launched a client like Web, Android, or iOS.  |
| **linkedAt** <span class="opt">optional</span>|             | If the channel was linked to a pre-existing appUser, a timestamp signifying when the linking occurred. Formatted as **yyyy-mm-ddThh:mm:ssZ** |
