# Message Types

## Text

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt' \
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
smooch.appUsers.sendMessage('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
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

## Image

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt' \
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
smooch.appUsers.sendMessage('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
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

## File

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt' \
     -d '
{
    "role": "appMaker",
    "type": "file",
    "mediaUrl": "http://example.org/document.pdf",
    "mediaType": "application/pdf"
}'
```
```js
smooch.appUsers.sendMessage('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
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

### Channel Support

File messages are fully supported on Facebook Messenger and will render as such:

<span class="half-width-img">![messenger file upload](/images/file_messenger.png)</span>

On all other channels, they are rendered as a link.

## Location

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt' \
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
smooch.appUsers.sendMessage('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
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

##### Coordinates

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **lat**<br/><span class='req'>required</span> | A floating point value representing the latitude of the location |
| **long**<br/><span class='req'>required</span> | A floating point value representing the longitude of the location |

## Carousel

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt' \
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
smooch.appUsers.sendMessage('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
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

### Display Settings

A business can modify a carousel message layout by including an optional `displaySettings` object. Supported settings are:

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **imageAspectRatio**<br/><span class='opt'>optional</span> | Specifies how to display all carousel images. Valid values are `horizontal` (default) and `square`.|

<aside class="notice">
Display settings are currently only supported in Facebook Messenger carousels.
</aside>

### Channel Support

Smooch will deliver carousel messages to users across all messaging channels regardless of whether or not a given channel can natively render a carousel message UI. For channels that don't render carousels, a raw text representation is sent. In the future, the Smooch API will expand to support new messaging app carousel experiences as they become available. For current messaging channels, carousel messages will render in the following ways:

#### Facebook Messenger
Full support.
![messenger carousel](/images/carousel_messenger.png)

#### Telegram
Full support, with cards arranged vertically.
![telegram carousel](/images/carousel_telegram.png)

#### LINE
Full support.
<span class="half-width-img">![line carousel](/images/carousel_line.png)</span>

#### All Other Channels

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

## List

> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt' \
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
smooch.appUsers.sendMessage('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
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

## Message Items

Message items can be sent through the [post message API](#post-message) by including them in the message payload.

Only [carousel](#carousel) and [list](#list) messages currently support message items.

| **Arguments**                |                        |
|------------------------------|------------------------|
| **title**<br/><span class='req'>required</span>       | The title of the carousel item. |
| **actions**<br/><span class='req'>required</span>     | Array of [action buttons](#action-buttons). At least 1 is required, a maximum of 3 are allowed. `link` and `postback` and `share` actions are supported. |
| **description**<br/><span class='opt'>optional</span> | The text description, or subtitle. |
| **mediaUrl**<br/><span class='opt'>optional</span>    | The image URL to be shown in the carousel/list item. |
| **size**<br/><span class='opt'>optional</span>        | The size of the image to be shown in the carousel/list item (Only top item of Facebook Messenger carousel supported). Choose from `compact` and `large` |
| **mediaType**<br/><span class='opt'>optional</span>   | If a `mediaUrl` was specified, the media type is defined here, for example `image/jpeg`. If `mediaType` is not specified, the media type will be resolved with the `mediaUrl`. |

