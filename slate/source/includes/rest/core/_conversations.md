# Conversations

When the first message is sent to an app user or received from an app user, a conversation is automatically created for them. The conversation and messages for a given app user can be retrieved and created by way of the `/v1/appusers/` API.

## Post Message

> Request (App User):

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appUser", "type": "text"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appUser',
    type: 'text'
}).then(() => {
    // async code
});
```

> Request (App Maker):

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appMaker", "type": "text"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
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

<api>`POST /v1/appusers/{smoochId|userId}/messages`</api>

Post a message to or from the app user. If the app user does not yet have a conversation, one will be created automatically. Messages must have a `role` of either `appUser` or `appMaker`.

A message must also have a `type` specifying the type of message you're trying to send.

Images can be posted by URL using this API via the `image` type. Alternatively, you may also upload images to the conversation directly using the [`/images`](#upload-image) endpoint.

<aside class="notice">
For messages originating from an app maker, a `jwt` credential with `app` level scope must be used.
</aside>

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **role**<br/><span class='req'>required</span>       | The role of the individual posting the message. Can be either `appUser` or `appMaker`. |
| **type**<br/><span class='req'>required</span>       | The type of the message being posted. Can be [`text`](#text-message), [`image`](#image-message), [`file`](#file-message), [`carousel`](#carousel-message), [`list`](#list-message), or [`location`](#location-message).    |
| **name**<br/><span class='opt'>optional</span>       | The display name of the message author. Messages with role `appUser` will default to a friendly name based on the user's `givenName` and `surname`. Messages with role `appMaker` have no default name. |
| **email**<br/><span class='opt'>optional</span>      | The email address of the message author. This field is typically used to identify an app maker in order to render the avatar in the app user client. If the email of the Smooch account is used, the configured profile avatar will be used. Otherwise, any [gravatar](http://gravatar.com) matching the specified email will be used as the message avatar. |
| **avatarUrl**<br/><span class='opt'>optional</span>  | The URL of the desired message avatar image. This field will override any avatar chosen via the `email` parameter. |
| **destination**<br/><span class='opt'>optional</span>| The channel where you want your message delivered to. This only works for messages with role `appMaker`. See [Channel Targeting](#channel-targeting) for more information. |
| **metadata**<br/><span class='opt'>optional</span>   | Flat object containing any custom properties associated with the message. If you are developing your own messaging client you can use this field to render custom message types. See the [metadata schema](#metadata-schema) for more information. |
| **payload**<br/><span class='opt'>optional</span>    | The payload of a `reply` action, if applicable |

<aside class="notice">
Additional arguments are necessary based on message type ([`text`](#text-message), [`image`](#image-message), [`file`](#file-message), [`carousel`](#carousel-message), [`list`](#list-message))
</aside>

### Text Message

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt' \
     -d '
{
    "role": "appMaker",
    "type": "text",
    "text": "Hello!",
    "metadata": {
        "lang": "en-ca",
        "items": 3
    }
    "actions": [{
        "text": "More info",
        "type": "link",
        "uri": "http://example.org",
        "metadata": {
            "buttonIntent": "more"
        }
    }]
}'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    role: 'appMaker',
    type: 'text',
    text: 'Hello!',
    metadata: {
        lang: 'en-ca',
        items: 3
    },
    actions: [{
        text: 'More info',
        type: 'link',
        uri: 'http://example.org',
        metadata: {
            buttonIntent: 'moreInfo'
        }
    }]
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
    "_id": "57966d21c19c9da00839a5e9",
    "role": "appMaker",
    "type": "text",
    "metadata": {
        "items": 3,
        "lang": "en-ca"
    },
    "actions": [{
        "_id": "57966d22c19c9da00839a5ec",
        "text": "More info",
        "type": "link",
        "uri": "http://example.org",
        "metadata": {
            "buttonIntent": "moreInfo"
        }
    }]
  }
}
```
```js
201 CREATED
```

A `text` type message is a message that is sent with text and/or actions.

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **text**<br/><span class='req'>required*</span>      | The text content of the message. Optional only if `actions` are provided. |
| **actions**<br/><span class='opt'>optional*</span>   | Array of [action buttons](#action-buttons).  |

### Image Message

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt' \
     -d '
{
    "role": "appMaker",
    "type": "image",
    "text": "Hello!",
    "mediaUrl": "http://example.org/image.jpg",
    "actions": [{
        "text": "More info",
        "type": "link",
        "uri": "http://example.org"
    }]
}'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    role: 'appMaker',
    type: 'image',
    text: 'Hello!',
    mediaUrl: 'http://example.org/image.jpg',
    actions: [{
        text: 'More info',
        type: 'link',
        uri: 'http://example.org'
    }]
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
    "_id": "57966d21c19c9da00839a5e9",
    "role": "appMaker",
    "type": "image",
    "mediaUrl": "http://example.org/image.jpg",
    "mediaType": "image/jpeg",
    "actions": [{
        "_id": "57966d22c19c9da00839a5ec",
        "text": "More info",
        "type": "link",
        "uri": "http://example.org"
    }]
  }
}
```
```js
201 CREATED
```

An `image` type message is a message that is sent with an image, and, optionally, text and/or actions.

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **text**<br/><span class='opt'>optional*</span>      | The text content of the message. |
| **actions**<br/><span class='opt'>optional*</span>   | Array of [action buttons](#action-buttons). |
| **mediaUrl**<br/><span class='req'>required*</span>  | The image URL used for the image message. |
| **mediaType**<br/><span class='opt'>optional</span>  | The media type is defined here, for example `image/jpeg`. If `mediaType` is not specified, the media type will be resolved with the `mediaUrl`. |

### File Message

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt' \
     -d '
{
    "role": "appMaker",
    "type": "file",
    "mediaUrl": "http://example.org/document.pdf",
    "mediaType": "application/pdf"
}'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    role: 'appMaker',
    type: 'file',
    mediaUrl: 'http://example.org/document.pdf',
    mediaType: 'application/pdf'
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
    "_id": "57966d21c19c9da00839a5e9",
    "role": "appMaker",
    "type": "file",
    "mediaUrl": "http://example.org/document.pdf",
    "mediaType": "application/pdf"
  }
}
```
```js
201 CREATED
```

A `file` type message is a message that is sent with a file attachment.
If you have a raw unhosted file you want to send, you can use the [attachments upload API](#upload-attachment) to upload the file to Smooch before sending the message.

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **text**<br/><span class='opt'>optional</span>  | Accompanying text or a description of the file. |
| **mediaUrl**<br/><span class='req'>required</span>  | The URL of the file attachment. |
| **mediaType**<br/><span class='opt'>optional</span>  | The media type is defined here, for example `application/pdf`. If `mediaType` is not specified, the media type will be resolved with the `mediaUrl`. |

#### Channel Support

File messages are fully supported on Facebook Messenger and will render as such:

<span class="half-width-img">![messenger file upload](/images/file_messenger.png)</span>

On all other channels, they are rendered as a link.

### Location Message

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt' \
     -d '
{
    "role": "appUser",
    "type": "location",
    "coordinates": {
        "lat": 45.5261583,
        "long": -73.595346
    }
}'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    role: 'appUser',
    type: 'location',
    coordinates: {
        lat: 45.5261583,
        long: -73.595346
    }
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
      "text": "Location shared:\nhttps://maps.google.com/maps?q=45.5261583,-73.595346",
      "authorId": "76293a38b24c5cca43e79415",
      "received": 1485292067.601,
      "type": "location",
      "coordinates": {
          "lat": 45.5261583,
          "long": -73.595346
      },
      "role": "appUser",
      "_id": "5887c22356c66904009ad602",
      "source": {
          "type": "messenger"
      }
  }
}
```
```js
201 CREATED
```

A `location` type message includes the coordinates (latitude and longitude) of a location. Typically sent in response to a [Location Request](#location-request).

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **coordinates**<br/><span class='req'>required</span>      | The coordinates of the location. See [Coordinates](#coordinates). |

#### Coordinates

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **lat**<br/><span class='req'>required</span> | A floating point value representing the latitude of the location |
| **long**<br/><span class='req'>required</span> | A floating point value representing the longitude of the location |

### Carousel Message

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt' \
     -d '
{
    "role": "appMaker",
    "type": "carousel",
    "items": [{
        "title": "Tacos",
        "description": "Description",
        "mediaUrl": "http://example.org/image.jpg",
        "actions": [{
            "text": "Select",
            "type": "postback",
            "payload": "TACOS"
        }, {
            "text": "More info",
            "type": "link",
            "uri": "http://example.org"
        }]
    }, {
        "title": "Ramen",
        "description": "Description",
        "mediaUrl": "http://example.org/image.jpg",
        "actions": [{
            "text": "Select",
            "type": "postback",
            "payload": "RAMEN"
        }, {
            "text": "More info",
            "type": "link",
            "uri": "http://example.org"
        }]
    }]
}'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    role: 'appMaker',
    type: 'carousel',
    items: [{
        title: 'Tacos',
        description: 'Description',
        mediaUrl: 'http://example.org/image.jpg',
        actions: [{
            text: 'Select',
            type: 'postback',
            payload: 'TACOS'
        }, {
            text: 'More info',
            type: 'link',
            uri: 'http://example.org'
        }]
    }, {
        title: 'Ramen',
        description: 'Description',
        mediaUrl: 'http://example.org/image.jpg',
        actions: [{
            text: 'Select',
            type: 'postback',
            payload: 'RAMEN'
        }, {
            text: 'More info',
            type: 'link',
            uri: 'http://example.org'
        }]
    }]
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
    "_id": "57966d21c19c9da00839a5e9",
    "role": "appMaker",
    "type": "carousel",
    "items": [{
        "_id": "57966d21c19c9da00839a5ea",
        "title": "Tacos",
        "description": "Description",
        "mediaUrl": "http://example.org/image.jpg",
        "mediaType": "image/jpeg",
        "actions": [{
            "_id": "57966d22c19c9da00839a5eb",
            "text": "Select",
            "type": "postback",
            "payload": "TACOS"
        }, {
            "_id": "57966d22c19c9da00839a5ec",
            "text": "More info",
            "type": "link",
            "uri": "http://example.org"
        }]
    }, {
        "_id": "57966d22c19c9da00839a5ed",
        "title": "Ramen",
        "description": "Description",
        "mediaUrl": "http://example.org/image.jpg",
        "mediaType": "image/jpeg",
        "actions": [{
            "_id": "57966d31c19c9da00839a5ee",
            "text": "Select",
            "type": "postback",
            "payload": "RAMEN"
        }, {
            "_id": "57966d31c19c9da00839a5ef",
            "text": "More info",
            "type": "link",
            "uri": "http://example.org"
        }]
    }]
  }
}
```
```js
201 CREATED
```

Carousel messages are a horizontally scrollable set of items that may each contain text, an image, and action buttons. Not all messaging channels fully support carousel messages; currently only Facebook Messenger, LINE and Telegram cover the full functionality. For all other platforms a carousel message is rendered as raw text. The raw text fallback does not include any images or postback action buttons.

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **items**<br/><span class='req'>required*</span>     | Array of [message items](#message-items). The array is limited to 10 items. |
| **displaySettings**<br/><span class='opt'>optional</span> | Settings to adjust the carousel layout. See [Display Settings](#display-settings). |

#### Display Settings

A business can modify a carousel message layout by including an optional `displaySettings` object. Supported settings are:

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **imageAspectRatio**<br/><span class='opt'>optional</span> | Specifies how to display all carousel images. Valid values are `horizontal` (default) and `square`.|

<aside class="notice">
Display settings are currently only supported in Facebook Messenger carousels.
</aside>

#### Channel Support

Smooch will deliver carousel messages to users across all messaging channels regardless of whether or not a given channel can natively render a carousel message UI. For channels that don't render carousels, a raw text representation is sent. In the future, the Smooch API will expand to support new messaging app carousel experiences as they become available. For current messaging channels, carousel messages will render in the following ways:

##### Facebook Messenger
Full support.
![messenger carousel](/images/carousel_messenger.png)

##### Telegram
Full support, with cards arranged vertically.
![telegram carousel](/images/carousel_telegram.png)

##### LINE
Full support.
<span class="half-width-img">![line carousel](/images/carousel_line.png)</span>

##### All Other Channels

> Sample Raw Text Format:

```
1. Tacos
Description
More info http://example.org

2. Ramen
Description
More info http://example.org
```

Text fallback.
![text fallback](/images/carousel_ios.png)

### List Message

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt' \
     -d '
     {
        "role":"appMaker",
        "type":"list",
        "items":[
           {
              "title":"Tacos",
              "description":"Beef and cheese... Mhm...",
              "size": "large",
              "mediaUrl":"https://www.tacojohns.com/globalassets/2016-tacos-menu/taco-bravo---436x420.jpg",
              "actions":[
                 {
                    "text":"Oh yeah!",
                    "type":"postback",
                    "payload":"TACOS"
                 }
              ]
           },
           {
              "title":"Burritos",
              "description":"Beefier and cheesier... Mhm...",
              "mediaUrl":"http://www.tacobueno.com/media/1381/beefbob.png?quality=65",
              "actions":[
                 {
                    "text":"Burritooo!",
                    "type":"postback",
                    "payload":"BURRITOS"
                 },
                 {
                    "text":"Burritooo!",
                    "type":"link",
                    "uri":"http://burritos.com",
                    "default": true
                 }
              ]
           }
        ],
        "actions":[
           {
              "text":"More Choices!",
              "type":"postback",
              "payload":"MORE"
           }
        ]
     }'
```

```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
   role:"appMaker",
   type:"list",
   items:[
      {
         title:"Tacos",
         description:"Beef and cheese... Mhm...",
         size: "large",
         mediaUrl:"https://www.tacojohns.com/globalassets/2016-tacos-menu/taco-bravo---436x420.jpg",
         actions:[
            {
               text:"Oh yeah!",
               type:"postback",
               payload:"TACOS"
            }
         ]
      },
      {
         title:"Burritos",
         description:"Beefier and cheesier... Mhm...",
         mediaUrl:"http://www.tacobueno.com/media/1381/beefbob.png?quality=65",
         actions:[
            {
               text:"Burritooo!",
               type:"postback",
               payload:"BURRITOS"
            },
            {
               text:"Burritooo!",
               type:"link",
               uri:"http://burritos.com",
               default: true
            }
         ]
      }
   ],
   actions:[
      {
         text:"More Choices!",
         type:"postback",
         payload:"MORE"
      }
   ]
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
    "type": "list",
    "role": "appMaker",
    "received": 1480021430.242,
    "text": "1. Tacos\nBeef and cheese... Mhm...\n\n\n2. Burritos\nBeefier and cheesier... Mhm...\nBurritooo!: http://burritos.com",
    "authorId": "7AJ4zpAVxEwKkjCZD2EYKk",
    "avatarUrl": "https://www.gravatar.com/avatar/5e543256c480ac577d30f76f9120eb74.png?s=200&d=mm",
    "_id": "583755b6be483684d148602b",
    "source": {
      "type": "api"
    },
    "items": [
      {
        "title": "Tacos",
        "description": "Beef and cheese... Mhm...",
        "size": "large",
        "mediaUrl": "https://www.tacojohns.com/globalassets/2016-tacos-menu/taco-bravo---436x420.jpg",
        "mediaType": "image/jpeg",
        "_id": "583755b6be483684d1486033",
        "actions": [
          {
            "text": "Oh yeah!",
            "payload": "TACOS",
            "_id": "583755b6be483684d1486034",
            "uri": "",
            "type": "postback"
          }
        ]
      },
      {
        "title": "Burritos",
        "description": "Beefier and cheesier... Mhm...",
        "mediaUrl": "http://www.tacobueno.com/media/1381/beefbob.png?quality=65",
        "mediaType": "image/png",
        "_id": "583755b6be483684d1486030",
        "actions": [
          {
            "text": "Burritooo!",
            "payload": "BURRITOS",
            "_id": "583755b6be483684d1486032",
            "uri": "",
            "type": "postback"
          },
          {
            "text": "Burritooo!",
            "default": true,
            "_id": "583755b6be483684d1486031",
            "uri": "http://burritos.com",
            "type": "link"
          }
        ]
      }
    ],
    "actions": [
      {
        "text": "More Choices!",
        "payload": "MORE",
        "_id": "583755b6be483684d1486035",
        "uri": "",
        "type": "postback"
      }
    ]
  },
  "conversation": {
    "unreadCount": 1,
    "_id": "94eb1cd68c3e072a5ea0e242"
  }
}
```

```js
201 CREATED
```

List messages are a vertically scrollable set of items that may each contain text, an image, and action buttons. Not all messaging channels fully support list messages; currently only Facebook Messenger has support. LINE and Telegram have a carousel fallback, and for all other platforms a list message is rendered as raw text. The raw text fallback does not include any images or postback action buttons.

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **items**<br/><span class='req'>required*</span>     | Array of [message items](#message-items). The array is limited to 10 items. |
| **actions**<br/><span class='opt'>optional*</span>   | Array of [action buttons](#action-buttons).  |

<aside class="notice">
    In Messenger, list messages sent with multiple `actions` either in a `message item` or the `message` itself will be truncated, as only 1 action is supported.
</aside>

<span class="half-width-img">![messenger list](/images/list_messenger.png)</span>

### Message Items

Message items can be sent through the [post message API](#post-message) by including them in the message payload.

Only [carousel](#carousel-message) and [list](#list-message) messages currently support message items.

| **Arguments**                |                        |
|------------------------------|------------------------|
| **title**<br/><span class='req'>required</span>       | The title of the carousel item. |
| **actions**<br/><span class='req'>required</span>     | Array of [action buttons](#action-buttons). At least 1 is required, a maximum of 3 are allowed. `link` and `postback` and `share` actions are supported. |
| **description**<br/><span class='opt'>optional</span> | The text description, or subtitle. |
| **mediaUrl**<br/><span class='opt'>optional</span>    | The image URL to be shown in the carousel/list item. |
| **size**<br/><span class='opt'>optional</span>        | The size of the image to be shown in the carousel/list item (Only top item of Facebook Messenger carousel supported). Choose from `compact` and `large` |
| **mediaType**<br/><span class='opt'>optional</span>   | If a `mediaUrl` was specified, the media type is defined here, for example `image/jpeg`. If `mediaType` is not specified, the media type will be resolved with the `mediaUrl`. |

### Action Buttons

Actions buttons can be sent through the [post message API](#post-message) by including them in the message payload.

There are 4 types of supported actions : **link**, **buy**, **postback**, and **reply**. Type must be specified by providing a `type` argument in the action object.

<aside class="notice">
    Action buttons can only be sent with an `appMaker` role.
</aside>

#### Link
A link action will open the provided URI when tapped.

> Send link action:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appMaker", "type": "text", "actions": [{"type": "link", "text": "Put vinegar", "uri": "http://example.com" }]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appMaker',
    type: 'text',
    actions: [
      {
        type: 'link',
        text: 'Put vinegar',
        uri: 'http://example.com'
      }
    ]
}).then(() => {
    // async code
});
```

|        **Arguments**         |                            |
|------------------------------|----------------------------|
| **text**<br/><span class='req'>required</span>     | The button text. |
| **type**<br/><span class='req'>required</span>     | `link` |
| **uri**<br/><span class='req'>required</span>      | The action URI. This is the link that will be used in the clients when clicking the button. |
| **default**<br/><span class='opt'>optional</span>  | Flag indicating the message action is the default for a [message item](#message-items) in Facebook Messenger. |
| **metadata**<br/><span class='opt'>optional</span> | Flat object containing any custom properties associated with the action. See the [metadata schema](#metadata-schema) for more information.|
| **extraChannelOptions**<br/><span class='opt'>optional</span> | Extra options to pass directly to the channel API. See [Extra Channel Options](#extra-channel-options-schema) |

<aside class="notice">
    Action buttons sent to LINE must have `http` or `https` protocol or the message will not be delivered.
</aside>

##### Extra Channel Options Schema

For features that are not yet supported natively by the Smooch platform, or are specific to a certain channel implementation, the `Extra Channel Options` Schema allows the caller to specify certain parameters that will be passed directly to the channel API.

Extra channel options exist for the following channels:

|        **Arguments**         |                            |
|------------------------------|----------------------------|
| **messenger**<br/><span class='opt'>optional</span>     | An object conforming to the [Messenger Extra Channel Options Schema](#messenger-extra-channel-options-schema)  |

##### Messenger Extra Channel Options Schema

|        **Arguments**         |                            |
|------------------------------|----------------------------|
| **webview_height_ratio**<br/><span class='opt'>optional</span>     | Controls the webview height in a `link` type action. Possible values are `compact`, `tall`, and `full`. [More Info](https://developers.facebook.com/docs/messenger-platform/send-api-reference/url-button)  |
| **messenger_extensions**<br/><span class='opt'>optional</span>     | For `link` type actions, a boolean value indicating whether the URL should be loaded with Messenger Extensions enabled. Default value is `false`. [More Info](https://developers.facebook.com/docs/messenger-platform/send-api-reference/url-button)  |
| **fallback_url**<br/><span class='opt'>optional</span>     | If `messenger_extensions` is `true`, the URL to use on clients that don't support Messenger Extensions. [More Info](https://developers.facebook.com/docs/messenger-platform/send-api-reference/url-button)  |

<aside class="notice">
    When using Messenger Extensions, make sure to [whitelist your domain](https://developers.facebook.com/docs/messenger-platform/webview/extensions) with Facebook, otherwise the message will result in a delivery failure.
</aside>

#### Buy
A buy action will prompt the user to purchase an item.

> Send buy action:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appMaker", "type": "text", "actions": [{"type": "buy", "text": "Buy vinegar", "amount": 1000 }]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appMaker',
    type: 'text',
    actions: [
      {
        type: 'buy',
        text: 'Buy vinegar',
        amount: 8000
      }
    ]
}).then(() => {
    // async code
});
```

|  **Arguments**                |                  |
|------------------------------|----------------------------|
| **text**<br/><span class='req'>required</span>      | The button text. |
| **type**<br/><span class='req'>required</span>      | `buy` |
| **amount**<br/><span class='req'>required</span>    | The amount being charged. It needs to be specified in cents and is an integer (9.99$ -> 999).|
| **currency**<br/><span class='opt'>optional</span>  | The currency of the amount being charged (USD, CAD, etc.). If not specified, it would use the default one set in your account. [See supported currencies](https://support.stripe.com/questions/which-currencies-does-stripe-support). |
| **metadata**<br/><span class='opt'>optional</span>  | Flat object containing any custom properties associated with the action. See the [metadata schema](#metadata-schema) for more information. |

<aside class="notice">
The <a href="/javascript/#stripe">Stripe integration</a> must be configured and active in order to accept buy buttons.
</aside>

#### Postback
A postback action will post the action payload to the server.

> Send postback action:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appMaker", "type": "text", "actions": [{"type": "postback", "text": "Send vinegar", "payload": "buy_vinegar" }]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appMaker',
    type: 'text',
    actions: [
      {
        type: 'postback',
        text: 'Buy vinegar',
        payload: 'buy_vinegar'
      }
    ]
}).then(() => {
    // async code
});
```

|  **Arguments**                |                  |
|------------------------------|----------------------------|
| **text**<br/><span class='req'>required</span>      | The button text. |
| **type**<br/><span class='req'>required</span>      | `postback` |
| **payload**<br/><span class='req'>required</span>    | A string payload to help you identify the action context. You can also use metadata for more complex needs. |
| **metadata**<br/><span class='opt'>optional</span>  | Flat object containing any custom properties associated with the action. See the [metadata schema](#metadata-schema) for more information. |

<aside class="notice">
See how to handle postback with <a href="#webhook-triggers">webhook triggers</a>.
</aside>

#### Reply
A reply action will echo the user's choice as a message.<br/>
You may optionally specify an `iconUrl` which will render as an icon for each option.

> Send reply action:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
     -d '
{
    "text":"Which do you prefer?",
    "role": "appMaker",
    "type": "text",
    "actions": [{
        "type": "reply",
        "text": "Tacos",
        "iconUrl": "http://example.org/taco.png"
        "payload": "TACOS"
    }, {
        "type": "reply",
        "text": "Burritos",
        "iconUrl": "http://example.org/burrito.png"
        "payload": "BURRITOS"
    }]
}'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Which do you prefer?',
    type: 'text',
    role: 'appMaker',
    actions: [
      {
        type: 'reply',
        text: 'Tacos',
        iconUrl: 'http://example.org/taco.png',
        payload: 'TACOS'
      }, {
        type: 'reply',
        text: 'Burritos',
        iconUrl: 'http://example.org/burrito.png',
        payload: 'BURRITOS'
      }
    ]
}).then(() => {
    // async code
});
```

|  **Arguments**                |                  |
|------------------------------|----------------------------|
| **text**<br/><span class='req'>required</span>      | The button text. |
| **type**<br/><span class='req'>required</span>      | `reply` |
| **payload**<br/><span class='req'>required</span>   | A string payload to help you identify the action context. Used when posting the reply. You can also use metadata for more complex needs. |
| **iconUrl**<br/><span class='opt'>optional</span>   | An icon to render next to the reply option (Facebook Messenger and Web Messenger only) |
| **metadata**<br/><span class='opt'>optional</span>  | Flat object containing any custom properties associated with the action. See the [metadata schema](#metadata-schema) for more information. |

<aside class="notice">
`reply` type actions can be sent either alone or with [location request](#location-request) actions. If an action of a different type is included in the message, it will be rejected.
</aside>

<aside class="notice">
Icons are currently only supported on Facebook Messenger and Web Messenger.
</aside>

**Facebook Messenger**
![Facebook Messenger reply icons](/images/fb_reply_icon.png)

**Web Messenger**
![Web Messenger reply icons](/images/web_reply_icon.png)

#### Location Request
A location request action will prompt the user to share their location. See [Channel capabilities](https://docs.smooch.io/guide/channel-capabilities/) for the list of supported channels. Unsupported clients will receive text fallback: "YourApp has requested a location".

> Send locationRequest action:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Where are you?", "role": "appMaker", "type": "text", "actions": [{"type": "locationRequest", "text": "Send Location"}]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Where are you?',
    role: 'appMaker',
    type: 'text',
    actions: [
      {
        type: 'locationRequest',
        text: 'Send Location'
      }
    ]
}).then(() => {
    // async code
});
```

|  **Arguments**         |                            |
|------------------------------|----------------------------|
| **text**<br/><span class='req'>required</span>      | The button text. |
| **type**<br/><span class='req'>required</span>      | `locationRequest`|
| **metadata**<br/><span class='opt'>optional</span> | Flat object containing any custom properties associated with the action. See the [metadata schema](#metadata-schema) for more information. |

<aside class="notice">
`locationRequest` type actions can be sent either alone or with [reply](#reply) actions. If an action of a different type is included in the message, it will be rejected.
</aside>

#### Share
Actions in a [message item](#message-items) may also include a share button.

> Send share action:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H "authorization: Bearer your-jwt" \
     -d '
{
    "role": "appMaker",
    "type": "carousel",
    "items": [{
        "title": "Title",
        "description": "Description",
        "mediaUrl": "http://example.org/image.jpg",
        "mediaType": "image/jpeg",
        "actions": [{
            "type": "share"
        }]
    }]
}'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Title',
    role: 'appMaker',
    type: 'carousel',
    items: [{
      title: 'Title',
      actions: [{
        type: 'share'
      }]
    }]
}).then(() => {
    // async code
});
```

![messenger carousel](/images/facebook_share_button.png)

|  **Arguments**                |                  |
|------------------------------|----------------------------|
| **type**<br/><span class='req'>required</span>      | `share` |
| **metadata**<br/><span class='opt'>optional</span>  | Flat object containing any custom properties associated with the action. See the [metadata schema](#metadata-schema) for more information. |

<aside class="notice">
Share Buttons are currently only supported in Facebook Messenger carousels.
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
curl https://api.smooch.io/v1/appUsers/c7f6e6d6c3a637261bd9656f/messages?before=1471995721 \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.appUsers.getMessages('c7f6e6d6c3a637261bd9656f', {before: '1471995721'}).then((response) => {
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
  "next": "https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages?after=1471995721"
}
```

<api>`GET /v1/appusers/{smoochId|userId}/messages`</api>

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
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X DELETE \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.deleteMessages('c7f6e6d6c3a637261bd9656f').then(() => {
    // async code
});
```

> Response:

```
200 OK
```

<api>`DELETE /v1/appusers/{smoochId|userId}/messages`</api>

Clears the message history for a user, permanently deleting all messages, but leaving any connections to Messaging Channels and Business Systems intact. These connections allow for the conversation to continue in the future, while still being associated to the same appUser.

## Upload Attachment

> Request:

```shell
curl https://api.smooch.io/v1/apps/c7f6e6d6c3a637261bd9656f/attachments?access=public \
     -X POST \
     -H 'authorization: Bearer your-jwt' \
     -H 'content-type: multipart/form-data' \     
     -F 'source=@document.pdf;type=application/pdf'
```
```js
var file = fileInput.files[0];
smooch.attachments.create('c7f6e6d6c3a637261bd9656f', 'public', file).then(() => {
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

Upload an attachment to Smooch to use in future messages. Files are uploaded using the `multipart/form-data` content type. Use the returned `mediaUrl` and `mediaType` to send [`file messages`](#file-message).

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
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/images \
     -X POST \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt' \
     -H 'content-type: multipart/form-data' \
     -F 'source=@screenshot.jpg;type=image/jpeg' \
     -F 'role=appUser' \
     -F 'name=Steve'
```
```js
// Frontend version
var file = fileInput.files[0];
smooch.appUsers.uploadImage('c7f6e6d6c3a637261bd9656f', file,
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

<api>`POST /v1/appusers/{smoochId|userId}/images`</api>

Upload an image and post it to the conversation. Images are uploaded using the `multipart/form-data` content type. Similar to the `/messages` endpoint, a `role` parameter must be specified. The `/images` endpoint accepts the same parameters as `/messages` but they are sent as form parameters as opposed to being encoded in JSON bodies. The uploaded image will render as part of the message thread in all supported app maker channels (email, Slack, HipChat, Zendesk, Helpscout).

| **Form Parameters**          |                            |
|------------------------------|----------------------------|
| **source**<br/><span class='req'>required</span>    | The image data.            |
| **role**<br/><span class='req'>required</span>      | The role of the individual posting the message. Can be either `appUser` or `appMaker`. |

## Typing Activity
> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/conversation/activity \
     -X POST \
     -d '{"role":"appMaker", "type": "typing:start"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

```js
smooch.appUsers.typingActivity('c7f6e6d6c3a637261bd9656f', {
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

<api>`POST /v1/appusers/{appUserId|userId}/conversation/activity`</api>

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
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/conversation/read \
     -X POST \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.conversations.resetUnreadCount('c7f6e6d6c3a637261bd9656f').then(() => {
    // async code
});
```

> Response:

```
200 OK
```

<api>`POST /v1/appusers/{appUserId|userId}/conversation/read`</api>

Reset the unread count of the conversation to 0. If the conversation has not yet been created for the specified app user 404 will be returned.

## Schema

### Message schema

This table represents the fields you can expect to receive in a webhook payload's message, or in the response to a GET Messages API call.

| Field                                         | Description                                                                                                             |
|-----------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------|
| **_id**  | The unique ID for the message.                                                                |
| **text**  | The message text.                                                                                                       |
| **role**  | The role of the message sender. `"appUser"`, `"appMaker"`, or `"whisper"`.                                                      |
| **authorId**  | The appUser's _id if the message `role` is `"appUser"`, otherwise, a hash based on the appMaker's email address.        |
| **name** <span class="opt">optional</span>| The appUser's friendly name, or an optionally provided appMaker name.                                                   |
| **received**  | A unix timestamp given in seconds, describing when Smooch received the message.                                         |
| **source**  | A nested object describing the source of the message. See the [source schema](#sourcedestination-schema) below for details.                   |
| **avatarUrl** <span class="opt">optional</span>| The URL for an image of the appMaker.                                                                                   |
| **type**  | `"text"`, `"image"`, `"file"`, `"carousel"`, `"location"`, or `"list"`.                                                                                                 |
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
| **type**  | `"link"`, `"reply"`, `"postback"`, `"share"`, `"location"`, or `"buy"`.                                                        |
| **uri** <span class="opt">optional</span>| The URI for a link type button, a checkout page for buy type buttons. May also be an empty string.                                 |
| **text** <span class="opt">optional</span>| The button text.                                                                                          |
| **payload** <span class="opt">optional</span>| The payload of a postback or reply button.                                          |
| **amount** <span class="opt">optional</span>| An integer representing an amount of money in hundredths of a dollar (or equivalent in other currencies). |
| **currency** <span class="opt">optional</span>| An ISO 4217 standard currency code in lowercase.                                                          |
| **state** <span class="opt">optional</span>| The value "offered", or "paid" sent with a buy action type. |


### Referral schema

Data representing a referral object when a user is referred to a conversation via a [Messenger code](https://developers.facebook.com/docs/messenger-platform/messenger-code) or clicking a [conversion ad](https://developers.facebook.com/docs/messenger-platform/guides/ads) on Facebook.

| Field       | Description                                                                  |
|-------------|------------------------------------------------------------------------------|
| **code**    | The referral's identifier                                                    |
| **details** | Nested object containing `source`, `type` and `adId`                         |
| **source**  | The source of the referral. Ex: `MESSENGER_CODE`, `ADS` etc...               |
| **type**    | The type of referral, usually `OPEN-THREAD`                                  |
| **adId**    | If the referral came from an ad, this field will be present with the ad's Id |


### Metadata schema

Data representing an optional flat object sent as an argument of a POST Message API call containing additional properties associated with the message. Metadata can be attached to the message itself and to optional Action Buttons like links or postbacks. The metadata properties are sent back to the appMaker in the appropriate payload delivered through webhook.

<aside class="notice">
`Strings`, `numbers` and `booleans` are the only supported format that can be passed to metadata.
</aside>


