# Conversation

When the first message is sent to an app user or received from an app user, a conversation is automatically created for them. The conversation and messages for a given app user can be retrieved and created by way of the `/v1/apps/{appId}/appusers/` API.

## Post Message

> Request (App User):

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appUser", "type": "text"}' \
     -H 'content-type: application/json' \
     -H 'authorization: your-account-jwt'
```
```js
smooch.appUsers.sendMessage('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appUser',
    type: 'text'
}).then(() => {
    // async code
});
```

> Request (App Maker):

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appMaker", "type": "text"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```
```js
smooch.appUsers.sendMessage('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
    type: 'text',
    text: 'Just put some vinegar on it',
    role: 'appMaker'
}).then(() => {
    // async code
});
```

> Response:

```
201 CREATED
```
```json
{
  "message": {
    "_id": "55c8c1498590aa1900b9b9b1",
    "authorId": "c7f6e6d6c3a637261bd9656f",
    "role": "appMaker",
    "type": "text",
    "name": "Steve",
    "text": "Just put some vinegar on it",
    "avatarUrl": "https://www.gravatar.com/image.jpg",
    "received": 1439220041.586
  },
  "conversation": {
    "_id": "df0ebe56cbeab98589b8bfa7",
    "unreadCount": 0
  }
}
```

<api>`POST /v1/apps/{appId}/appusers/{smoochId|userId}/messages`</api>

Post a message to or from the app user. If the app user does not yet have a conversation, one will be created automatically. Messages must have a `role` of either `appUser` or `appMaker`.

A message must also have a `type` specifying the type of message you're trying to send.

Images can be posted by URL using this API via the `image` type. Alternatively, you may also upload images to the conversation directly using the [`/images`](#upload-image) endpoint.

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **role**<br/><span class='req'>required</span>       | The role of the individual posting the message. Can be either `appUser` or `appMaker`. |
| **type**<br/><span class='req'>required</span>       | The type of the message being posted. Can be [`text`](#text), [`image`](#image), [`file`](#file), [`carousel`](#carousel), [`list`](#list), or [`location`](#location).    |
| **name**<br/><span class='opt'>optional</span>       | The display name of the message author. Messages with role `appUser` will default to a friendly name based on the user's `givenName` and `surname`. Messages with role `appMaker` have no default name. |
| **email**<br/><span class='opt'>optional</span>      | The email address of the message author. This field is typically used to identify an app maker in order to render the avatar in the app user client. If the email of the Smooch account is used, the configured profile avatar will be used. Otherwise, any [gravatar](http://gravatar.com) matching the specified email will be used as the message avatar. |
| **avatarUrl**<br/><span class='opt'>optional</span>  | The URL of the desired message avatar image. This field will override any avatar chosen via the `email` parameter. |
| **destination**<br/><span class='opt'>optional</span>| The channel where you want your message delivered to. This only works for messages with role `appMaker`. See [Channel Targeting](#channel-targeting) for more information. |
| **metadata**<br/><span class='opt'>optional</span>   | Flat object containing any custom properties associated with the message. If you are developing your own messaging client you can use this field to render custom message types. See the [metadata schema](#metadata-schema) for more information. |
| **payload**<br/><span class='opt'>optional</span>    | The payload of a `reply` action, if applicable |

<aside class="notice">
Additional arguments are necessary based on message type ([`text`](#text), [`image`](#image), [`file`](#file), [`carousel`](#carousel), [`list`](#list))
</aside>


### Channel Targeting

A business can choose which channel to deliver a message to. To do this, include a `destination` object in the message payload and provide one of the following:

| **Arguments**                |                            |
|------------------------------|----------------------------|
| **integrationId**<br/><span class='req'>optional</span>   | The integration id. See [List Integrations](#list-integrations) |
| **integrationType**<br/><span class='req'>optional</span> | The integration type. See [List Integrations](#list-integrations) |

Note that for this to work, the user needs to have a client linked to the targeted channel.

## Get Messages

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appUsers/c7f6e6d6c3a637261bd9656f/messages?before=1471995721 \
     -H 'authorization: your-account-jwt'
```
```js
smooch.appUsers.getMessages('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {before: '1471995721'}).then((response) => {
    // async code
});
```

> Response

```
200 OK
```
```json
{
  "conversation": {
    "_id": "df0ebe56cbeab98589b8bfa7",
    "unreadCount": 0
  },
  "messages": [{
    "_id": "55c8c1498590aa1900b9b9b1",
    "authorId": "c7f6e6d6c3a637261bd9656f",
    "role": "appUser",
    "name": "Steve",
    "text": "Just put some vinegar on it",
    "avatarUrl": "https://www.gravatar.com/image.jpg",
    "received": 1439220041.586
  }],
  "next": "https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages?after=1471995721"
}
```

<api>`GET /v1/apps/{appId}/appusers/{smoochId|userId}/messages`</api>

Get the specified app user's conversation history with a limit of 100 messages, if it exists. If a conversation has not yet been created for the specified app user, 404 will be returned.

### Pagination

The API endpoint for retrieving messages of a conversation has a limit of a 100 messages. The `before` and `after` parameters will have to be specified to indicate which range of messages to return. These parameters are mutually exclusive. If neither is specified, then the most recent 100 messages will be returned.

| Parameter                | Description              |
|--------------------------|--------------------------|
| `before`                 | Timestamp of message. The API will return 100 messages before the specified timestamp (excluding any messages with the provided timestamp).           |
| `after`                  | Timestamp of message. The API will return 100 messages after the specified timestamp (excluding any messages with the provided timestamp).            |

<aside class="notice">
The timestamp format should be in seconds using [Unix time](https://en.wikipedia.org/wiki/Unix_time). Note that you can specify milliseconds using a decimal number if needed.
</aside>

## Delete Messages

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X DELETE \
     -H 'authorization: Bearer your-account-jwt'
```
```js
smooch.appUsers.deleteMessages('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f').then(() => {
    // async code
});
```

> Response:

```
200 OK
```

<api>`DELETE /v1/apps/{appId}/appusers/{smoochId|userId}/messages`</api>

Clears the message history for a user, permanently deleting all messages, but leaving any connections to Messaging Channels and Business Systems intact. These connections allow for the conversation to continue in the future, while still being associated to the same appUser.

## Upload Attachment

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/attachments?access=public \
     -X POST \
     -H 'authorization: Bearer your-account-jwt' \
     -H 'content-type: multipart/form-data' \
     -F 'source=@document.pdf;type=application/pdf'
```
```js
var file = fileInput.files[0];
smooch.attachments.create('5963c0d619a30a2e00de36b8', 'public', file).then(() => {
    // async code
});
```

> Response:

```
201 CREATED
```
```json
{
  "mediaUrl": "https://media.smooch.io/apps/c7f6e6d6c3a637261bd9656f/a77caae4cbbd263a0938eba00016b7c8/document.pdf",
  "mediaType": "application/pdf"
}
```

<api>`POST /v1/apps/{appId}/attachments?access={access}`</api>

Upload an attachment to Smooch to use in future messages. Files are uploaded using the `multipart/form-data` content type. Use the returned `mediaUrl` and `mediaType` to send [`file messages`](#file).

| **Form Parameters**          |                            |
|------------------------------|----------------------------|
| **source**<br/><span class='req'>required</span>    | The attachment data, provided as a readable file stream.            |

| **Query Parameters**          |                            |
|------------------------------|----------------------------|
| **access**<br/><span class='req'>required</span>    | The access level for the attachment. Currently the only available access level is `public` |

<aside class="notice">
The maximum size allowed per file is 10MB. Exceeding this size will result in a [`413 error`](#errors).
</aside>

### Upload and Send Image (Deprecated)

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/images \
     -X POST \
     -H 'authorization: your-account-jwt' \
     -H 'content-type: multipart/form-data' \
     -F 'source=@screenshot.jpg;type=image/jpeg' \
     -F 'role=appUser' \
     -F 'name=Steve'
```
```js
// Frontend version
var file = fileInput.files[0];
smooch.appUsers.uploadImage('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', file,
{
    text: 'Just put some vinegar on it',
    role: 'appUser'

}).then(() => {
    // async code
});

// Not yet supported on Node.
```

> Response:

```
201 CREATED
```
```json
{
  "message": {
    "_id": "55c8c1498590aa1900b9b9b1",
    "authorId": "c7f6e6d6c3a637261bd9656f",
    "role": "appUser",
    "name": "Steve",
    "text": "https://media.smooch.io/image.jpg",
    "mediaUrl": "https://media.smooch.io/image.jpg",
    "mediaType": "image/jpeg",
    "avatarUrl": "https://www.gravatar.com/image.jpg",
    "received": 1446599350.851
  },
  "conversation": {
    "_id": "df0ebe56cbeab98589b8bfa7",
    "unreadCount": 0
  }
}
```

<aside class="warning">
This API is deprecated. It is recommended that you use the [upload attachment](#upload-attachment) API then attach the resulting `mediaUrl` and `mediaType` to an `image` type message.
</aside>

<api>`POST /v1/apps/{appId}/appusers/{smoochId|userId}/images`</api>

Upload an image and post it to the conversation. Images are uploaded using the `multipart/form-data` content type. Similar to the `/messages` endpoint, a `role` parameter must be specified. The `/images` endpoint accepts the same parameters as `/messages` but they are sent as form parameters as opposed to being encoded in JSON bodies. The uploaded image will render as part of the message thread in all supported app maker channels (email, Slack, HipChat, Zendesk, Helpscout).

| **Form Parameters**          |                            |
|------------------------------|----------------------------|
| **source**<br/><span class='req'>required</span>    | The image data.            |
| **role**<br/><span class='req'>required</span>      | The role of the individual posting the message. Can be either `appUser` or `appMaker`. |

## Typing Activity
> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/conversation/activity \
     -X POST \
     -d '{"role":"appMaker", "type": "typing:start"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```

```js
smooch.appUsers.typingActivity('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
    role: 'appMaker',
    type: 'typing:start'
}).then(() => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
  "conversation": {
    "_id": "df0ebe56cbeab98589b8bfa7",
    "unreadCount": 0
  }
}
```

<api>`POST /v1/apps/{appId}/appusers/{appUserId|userId}/conversation/activity`</api>

Notify Smooch when an app maker starts or stops typing a response.

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **role**<br/><span class='req'>required</span>       | The role of the actor. Must be `appMaker`. |
| **type**<br/><span class='req'>required</span>       | The type of activity to trigger. Must be either `typing:start` or `typing:stop` |
| **name**<br/><span class='opt'>optional</span>      | The name of the app maker that starts or stops typing a response |
| **avatarUrl**<br/><span class='opt'>optional</span>      | The avatar URL of the app maker that starts typing a response |

<aside class="notice">
Typing activity is only supported on our Web Messenger, iOS SDK, Facebook Messenger and Telegram
</aside>


## Reset Unread Count
> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/conversation/read \
     -X POST \
     -H 'authorization: your-account-jwt'
```
```js
smooch.conversations.resetUnreadCount('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f').then(() => {
    // async code
});
```

> Response:

```
200 OK
```

<api>`POST /v1/apps/{appId}/appusers/{appUserId|userId}/conversation/read`</api>

Reset the unread count of the conversation to 0. If the conversation has not yet been created for the specified app user 404 will be returned.

## Schema

### Message schema

This table represents the fields you can expect to receive in a webhook payload's message, or in the response to a GET Messages API call.

| Field                                         | Description                                                                                                             |
|-----------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------|
| **_id**  | The unique ID for the message.                                                                |
| **type**  | `"text"`, `"image"`, `"file"`, `"carousel"`, `"location"`, or `"list"`.                                                                                                 |
| **text**  | The message text.                                                                                                       |
| **role**  | The role of the message sender. `"appUser"`, `"appMaker"`, or `"whisper"`.                                                      |
| **authorId**  | The appUser's _id if the message `role` is `"appUser"`, otherwise, a hash based on the appMaker's email address.        |
| **name** <span class="opt">optional</span>| The appUser's friendly name, or an optionally provided appMaker name.                                                   |
| **received**  | A unix timestamp given in seconds, describing when Smooch received the message.                                         |
| **source**  | A nested object describing the source of the message. See the [source schema](#sourcedestination-schema) below for details.                   |
| **avatarUrl** <span class="opt">optional</span>| The URL for an image of the appMaker.                                                                                   |
| **actions** <span class="opt">optional</span> | An array of objects representing the actions associated with the message. See the [action schema](#action-schema) below for details. |
| **mediaUrl** <span class="opt">optional</span>| The URL for media, such as an image, attached to the message. |
| **mediaType** <span class="opt">optional</span>| The MIME type for any media attached in the mediaUrl. |
| **coordinates** <span class="opt">optional</span>| A nested object describing the coordinates sent by an appUser. Only present in a `"location"` type message. See the [coordinates schema](#coordinates-schema) below for details. |

### Source/Destination schema

Data representing the source or destination of a message, whether an appUser or appMaker message.

| Field                                  | Description                                                                                                                                                                                            |
|----------------------------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **type**  | An identifier for the channel from which a message originated. May include one of `"web"`, `"ios"`, `"android"`, `"messenger"`, `"viber"`, `"telegram"`, `"wechat"`, `"line"`, `"twilio"`, `"frontendEmail"`, `"api"`, or any number of other channels. |
| **id** <span class="opt">optional</span>| An identifier used by Smooch for internal purposes. |

### Coordinates schema

Data representing a location sent by the appUser.

| Field                                  | Description                                                                                                                                                                                            |
|----------------------------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **_id** | The unique ID of the coordinates item. |
| **lat** | Global latitude. |
| **long** | Global longitude. |


### Action schema

This table represents the fields you can expect to receive nested inside postback or message data, in a webhook payload, or in the response to a GET Messages API call.

| Field      | Description                                                                                               |
|------------|--------|-----------------------------------------------------------------------------------------------------------|
| **_id**  | A canonical ID.                                                                                           |
| **type**  | `link`, `reply`, `postback`, `share`, `locationRequest`, or `buy`.                                                        |
| **uri** <span class="opt">optional</span>| The URI for a `link` type action, a checkout page for `buy` type actions. May also be an empty string. |
| **text** <span class="opt">optional</span>| The button text. |
| **payload** <span class="opt">optional</span>| The payload of a `postback` or `reply` button. |
| **amount** <span class="opt">optional</span>| An integer representing an amount of money in hundredths of a dollar (or equivalent in other currencies). Used for actions of type `buy`. |
| **currency** <span class="opt">optional</span>| An ISO 4217 standard currency code in lowercase. Used for actions of type `buy`. |
| **state** <span class="opt">optional</span>| The value `offered`, or `paid` representing the payment status of a `buy` type action. |
| **default**<br/><span class='opt'>optional</span>  | Boolean value indicating whether the action is the default action for a [message item](#message-items) in Facebook Messenger. Used for actions of type `link`. |
| **metadata**<br/><span class='opt'>optional</span> | Flat object containing any custom properties associated with the action. See the [metadata schema](#metadata-schema) for more information.|
| **extraChannelOptions**<br/><span class='opt'>optional</span> | Extra options to pass directly to the channel API. See [Extra Channel Options](#extra-channel-options-schema). |
| **iconUrl**<br/><span class='opt'>optional</span>   | An icon to render alongside the action text. Used for actions of type `reply`. |


### Referral schema

Data representing a referral object when a user is referred to a conversation via a [Messenger code](https://developers.facebook.com/docs/messenger-platform/messenger-code), clicking a [conversion ad](https://developers.facebook.com/docs/messenger-platform/guides/ads) on Facebook, or scanning a parametric [QR code event](http://admin.wechat.com/wiki/index.php?title=Event-based_Messages#Scanning_Parametric_QR_Code_Event) on WeChat.

| Field       | Description                                                                  |
|-------------|------------------------------------------------------------------------------|
| **code**    | The referral's identifier. Available in referrals from WeChat and Messenger |
| **details** <span class="opt">optional</span>| Nested object containing additional information. Only available on Messenger. See the [referral details schema](#referral-details-schema) for more details |

### Referral details schema

| Field       | Description                                                                  |
|-------------|------------------------------------------------------------------------------|
| **source**  | The source of the referral. Ex: `MESSENGER_CODE`, `ADS` etc... Only available on Messenger |
| **type**    | The type of referral, typically `OPEN-THREAD`. Only available on Messenger |
| **adId**  <span class="opt">optional</span> | If the referral came from an ad, this field will be present with the ad's Id. Only available on Messenger |                       |

### Metadata schema

Data representing an optional flat object sent as an argument of a POST Message API call containing additional properties associated with the message. Metadata can be attached to the message itself and to optional Action Buttons like links or postbacks. The metadata properties are sent back to the appMaker in the appropriate payload delivered through webhook.

<aside class="notice">
`Strings`, `numbers` and `booleans` are the only supported format that can be passed to metadata.
</aside>
