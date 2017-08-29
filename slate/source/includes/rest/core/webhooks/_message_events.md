## Message Events

### Trigger - `message:appUser` (text)

> Payload:

```json
{
    "trigger": "message:appUser",
    "app": {
        "_id": "5698edbf2a43bd081be982f1"
    },
    "messages":[{
        "_id": "55c8c1498590aa1900b9b9b1",
        "type": "text",
        "text": "Hi! Do you have time to chat?",
        "role": "appUser",
        "authorId": "c7f6e6d6c3a637261bd9656f",
        "name": "Steve",
        "received": 1444348338.704,
        "source": {
            "type": "messenger"
        }
    }],
    "appUser": {
        "_id": "c7f6e6d6c3a637261bd9656f",
        "userId": "bob@example.com",
        "properties": {},
        "signedUpAt": "2015-10-06T03:38:02.346Z",
        "clients": [
          {
            "active": true,
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "messenger"
          }
        ]
    }
}
```

The payload for a [text message](#text).

#### Message event payload schema

| Field      | Description                                                                                                               |
|------------|-------------|---------------------------------------------------------------------------------------------------------------------------|
| **trigger** | `"message:appUser"`, or `"message:appMaker"`                                                                 |
| **app** | A nested object representing the Smooch app associated with the event. See the [truncated app schema](#truncated-app-schema) below for details.       |
| **messages** | An array of objects representing the messages associated with the event. See the [message schema](#message-schema) below for details. |
| **appUser** | A nested object representing the appUser associated with the event. See the [appUser schema](#app-user-schema) below for details.      |

### Trigger - `message:appUser` (image)

> Payload:

```json
{
    "trigger": "message:appUser",
    "app": {
        "_id": "5698edbf2a43bd081be982f1"
    },
    "messages":[{
        "_id": "55c8c1498590aa1900b9b9b1",
        "type": "image",
        "mediaUrl": "http://www.tacobueno.com/media/1338/partytacolarge.png?quality=65",
        "role": "appUser",
        "authorId": "c7f6e6d6c3a637261bd9656f",
        "name": "Steve",
        "received": 1444348338.704,
        "source": {
            "type": "messenger"
        }
    }],
    "appUser": {
        "_id": "c7f6e6d6c3a637261bd9656f",
        "userId": "bob@example.com",
        "properties": {},
        "signedUpAt": "2015-10-06T03:38:02.346Z",
        "clients": [
          {
            "active": true,
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "messenger"
          }
        ]
    }
}
```

The payload for an [image message](#image).

### Trigger - `message:appMaker` (carousel)

> Payload:

```json
{
    "trigger": "message:appMaker",
    "app": {
        "_id": "5698edbf2a43bd081be982f1"
    },
    "messages":[{
        "items": [
            {
                "title": "Tacos",
                "description": "Beef and cheese... Mhm...",
                "size": "large",
                "mediaUrl": "http://www.tacobueno.com/media/1338/partytacolarge.png?quality=65",
                "mediaType": "image/png",
                "_id": "5887c9117e4de029005f1fc7",
                "actions": [
                    {
                      "text": "Oh yeah!",
                      "payload": "TACOS",
                      "_id": "5887c9117e4de029005f1fc8",
                      "type": "postback"
                    }
                ]
            }
        ],
        "type": "carousel",
        "role": "appMaker",
        "received": 1485293841.303,
        "authorId": "2cKU9zRO2DpBWgk764Tfro",
        "avatarUrl": "https://www.gravatar.com/avatar/5e543256c480ac577d30f76f9120eb74.png?s=200&d=mm",
        "_id": "5887c9117e4de029005f1fc6",
        "source": {
          "type": "api"
        }
  }],
  "appUser": {
      "_id": "c7f6e6d6c3a637261bd9656f",
      "userId": "bob@example.com",
      "properties": {},
      "signedUpAt": "2015-10-06T03:38:02.346Z",
      "clients": [
        {
          "active": true,
          "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
          "lastSeen": "2016-03-09T19:09:01.431Z",
          "platform": "messenger"
        }
      ]
  }
}
```

The payload for a [carousel message](#carousel).

### Trigger - `message:appMaker` (list)

> Payload:

```json
{
    "trigger": "message:appMaker",
    "app": {
        "_id": "5698edbf2a43bd081be982f1"
    },
    "messages":[{
        "items": [
            {
                "title": "Tacos",
                "description": "Beef and cheese... Mhm...",
                "size": "large",
                "mediaUrl": "http://www.tacobueno.com/media/1338/partytacolarge.png?quality=65",
                "mediaType": "image/png",
                "_id": "5887c9117e4de029005f1fc7",
                "actions": [
                    {
                      "text": "Oh yeah!",
                      "payload": "TACOS",
                      "_id": "5887c9117e4de029005f1fc8",
                      "type": "postback"
                    }
                ]
            }
        ],
        "actions": [
            {
              "text": "More Choices!",
              "payload": "MORE",
              "_id": "5887c9a37e4de029005f1fce",
              "type": "postback"
            }
        ],
        "type": "list",
        "role": "appMaker",
        "received": 1485293841.303,
        "authorId": "2cKU9zRO2DpBWgk764Tfro",
        "avatarUrl": "https://www.gravatar.com/avatar/5e543256c480ac577d30f76f9120eb74.png?s=200&d=mm",
        "_id": "5887c9117e4de029005f1fc6",
        "source": {
          "type": "api"
        }
  }],
  "appUser": {
      "_id": "c7f6e6d6c3a637261bd9656f",
      "userId": "bob@example.com",
      "properties": {},
      "signedUpAt": "2015-10-06T03:38:02.346Z",
      "clients": [
        {
          "active": true,
          "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
          "lastSeen": "2016-03-09T19:09:01.431Z",
          "platform": "messenger"
        }
      ]
  }
}
```

The payload for a [list message](#list).

### Trigger - `message:appUser` (location)

> Payload:

```json
{
    "trigger": "message:appUser",
    "app": {
        "_id": "55fafea8bf8fd41a00357805"
    },
    "messages": [
        {
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
    ],
    "appUser": {
        "_id": "c7f6e6d6c3a637261bd9656f",
        "userId": "bob@example.com",
        "properties": {},
        "signedUpAt": "2015-10-06T03:38:02.346Z",
        "clients": [
          {
            "active": true,
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "messenger"
          }
        ]
    }
}
```

The payload for a [location message](#location).
