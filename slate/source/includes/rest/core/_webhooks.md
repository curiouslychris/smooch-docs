# Webhooks
Webhooks are a fantastic way to extend the Smooch platform beyond the built-in feature set. You can use webhooks to build your own Smooch chat clients, to integrate more deeply with your favorite CRM, or to [build a bot](https://github.com/smooch/smooch-bot).

These webhook APIs require a `jwt` credential with `app` level scope. Furthermore, a webhook can only operate within the scope of a single Smooch app.

When a webhook trigger is triggered, a JSON payload will be posted to the URL configured in your webhook object. You can see an example of this payload [here](#webhooks-payload).

## Create webhook

> Request:

```shell
curl https://api.smooch.io/v1/webhooks \
     -X POST \
     -d '{"target": "http://example.com/callback"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

```js
smooch.webhooks.create({
    target: 'http://example.com/callback'
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
  "webhook": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "triggers": [
      "message"
    ],
    "secret": "8564b3e6a8b20a4bdb68b05d9ea97aace9bc5936",
    "target": "http://example.com/callback"
  }
}
```

<api>`POST /v1/webhooks`</api>

Create a webhook for the specified app. The response body will include a secret which will be transmitted with each webhook invocation and can be used to verify the authenticity of the caller.

Alternatively, you can use the Webhooks integration in the Smooch dashboard to easily create a webhook.

| **Arguments**             |   |
|---------------------------|---|
| **target**<br/><span class='req'>required</span> | URL to be called when the webhook is triggered. |
| **triggers**<br/><span class='opt'>optional</span>  | An array of triggers you wish to have the webhook listen to. If unspecified the default trigger is `message`. This property is case sensitive. [More details](#webhook-triggers). |

## List webhooks

> Request:

```shell
  curl https://api.smooch.io/v1/webhooks \
       -H 'authorization: Bearer your-jwt'
```

```js
smooch.webhooks.list().then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
  "webhooks": [
    {
      "_id": "55c8d9758590aa1900b9b9f6",
      "triggers": [
        "message"
      ],
      "secret": "8564b3e6a8b20a4bdb68b05d9ea97aace9bc5936",
      "target": "http://example.com/callback"
    }
  ]
}
```

<api>`GET /v1/webhooks`</api>

List all webhooks configured for a given app.

## Get webhook

> Request:

```shell
curl https://api.smooch.io/v1/webhooks/55c8d9758590aa1900b9b9f6 \
     -H 'authorization: Bearer your-jwt'
```

```js
smooch.webhooks.get('55c8d9758590aa1900b9b9f6').then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
  "webhook": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "triggers": [
      "message"
    ],
    "secret": "8564b3e6a8b20a4bdb68b05d9ea97aace9bc5936",
    "target": "http://example.com/callback"
  }
}
```

<api>`GET /v1/webhooks/{webhookId}`</api>

Individual webhooks can be fetched using this API.

## Update webhook

> Request:

```shell
curl https://api.smooch.io/v1/webhooks/55c8d9758590aa1900b9b9f6 \
     -X PUT \
     -d '{"target": "http://example.com/callback"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

```js
smooch.webhooks.update('55c8d9758590aa1900b9b9f6', {
    target: 'http://example.com/callback'
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
  "webhook": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "triggers": [
      "message"
    ],
    "secret": "8564b3e6a8b20a4bdb68b05d9ea97aace9bc5936",
    "target": "http://example.com/callback"
  }
}
```

<api>`PUT /v1/webhooks/{webhookId}`</api>

Use this API to update your existing webhooks.

| **Arguments**             |   |
|---------------------------|---|
| **target**<br/><span class='opt'>optional</span> | URL to be called when the webhook is triggered. |
| **triggers**<br/><span class='opt'>optional</span>  | The triggers you wish to have the webhook listen to. The default trigger is `message`. This property is case sensitive. [More details](#webhook-triggers). |

## Delete webhook

> Request:

```shell
curl https://api.smooch.io/v1/webhooks/55c8d9758590aa1900b9b9f6 \
     -X DELETE \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.webhooks.delete('55c8d9758590aa1900b9b9f6').then(() => {
    // async code
});
```

> Response:

```
200 OK
```

<api>`DELETE /v1/webhooks/{webhookId}`</api>

Deletes the specified webhook.

## Webhook triggers

> Request:

```shell
curl https://api.smooch.io/v1/webhooks
     -X POST \
     -d '{"target": "http://example.com/callback", "triggers": ["message:appUser"]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

```js
smooch.webhooks.create({
    target: 'http://example.com/callback',
    triggers: [
        'message:appUser'
    ]
}).then((response) => {
    // async code
});
```

A webhook will make a request to the target each time a trigger associated with the webhook occurs. Triggers are specified in an optional `triggers` array in the request body. If `triggers` is not specified the webhook will be configured with the `message` trigger by default.

| trigger                   |                                                                |
|---------------------------|----------------------------------------------------------------|
| **message**<br/>*default* | all messages                                                   |
| **message:appUser**       | only messages with role `appUser`                              |
| **message:appMaker**      | only messages with role `appMaker` or `whisper`                |
| **conversation:start**    | when a user opts in to start receiving messages                |
| **conversation:read**     | when a user reads a conversation                               |
| **postback**              | when a user clicks on a postback action                        |
| **merge:appUser**         | when two or more users are merged into one                     |
| **delivery:success**      | when a message is successfully delivered to a customer channel |
| **delivery:failure**      | when a message fails to be delivered to a customer channel     |
| **payment:success**       | when a payment is successfully received from a channel         |
| <strong>*</strong>        | when any of the above triggers occurs                          |

## Webhooks payload

When a webhook trigger is triggered, a `POST` request will be made to the URL configured in your webhook object along with a JSON payload.

The structure of the JSON payload differs based on the trigger of the webhook. On the right, you can see examples of the JSON payload for the different triggers.

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

The payload for a [text message](#text-message).

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

The payload for an [image message](#image-message).

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

The payload for a [carousel message](#carousel-message).

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

The payload for a [list message](#list-message).

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
                "long": -73.595346,
                "_id": "5887c22356c66904009ad603"
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

The payload for when a user sends their location.

### Trigger - `postback`

> Payload:

```json
{
    "trigger": "postback",
    "app": {
        "_id": "5698edbf2a43bd081be982f1"
    },
    "postbacks":[{
        "message": {
            "_id": "55c8c1498590aa1900b9b9b1",
            "text": "Do you want to see more options?",
            "type": "text",
            "role": "appMaker",
            "authorId": "c7f6e6d6c3a637261bd9656f",
            "name": "LunchBot",
            "received": 1444348338.704,
            "source": {
                "type": "slack"
            },
            "actions": [{
                "_id": "571530ee4fae94c32b78b170",
                "type": "postback",
                "text": "Yes",
                "payload": "YES"
            }]
        },
        "action": {
            "_id": "571530ee4fae94c32b78b170",
            "type": "postback",
            "text": "Read more",
            "payload": "YES"
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

The payload for when a user taps a [postback button](#postback).<br/>
Postbacks originating from a [persistent menu](#persistent-menus) do not have messages associated with them, and so omit the `message` property.


### Trigger - `conversation:start`

> Payload:

```json
{
    "trigger": "conversation:start",
    "app": {
        "_id": "57ec2881c47d2d24b0c16427"
    },
    "source": {
        "type": "messenger"
    },
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
    },
    "timestamp": 1480349392.103
}
```

The payload for when a user opts in to start receiving messages. `conversation:start` is only available on a sub set of channels. [Channel capabilities](https://docs.smooch.io/guide/channel-capabilities/) lists which channel currently supports it. Also, note that `conversation:start` won't be triggered when a user is linking a second channel via the Web Messenger.

### Trigger - `conversation:read`

> Payload:

```json
{
    "trigger": "conversation:read",
    "app": {
        "_id": "57ec2881c47d2d24b0c16427"
    },
    "source": {
        "type": "messenger"
    },
    "appUser": {
        "_id": "7685787bf0e9e8cf56182288"
    },
    "timestamp": 1480349392.103
}
```

The payload for when a user reads a conversation.

### Trigger - `merge:appUser`

> Payload:

```json
{
    "trigger": "merge:appUser",
    "app": {
        "_id": "5698edbf2a43bd081be982f1"
    },
    "surviving": {
        "_id": "a79a0ecfba3260bf145be257",
        "userId": "123",
        "conversationStarted": true
    },
    "discarded": [{
        "_id": "1ac30dad829178f6378f61f4",
        "conversationStarted": false
    }]
}
```

The payload for when two users are merged into one.

### Trigger - `delivery:success`

> Payload:

```json
{
    "trigger": "delivery:success",
    "app": {
        "_id": "575040549a38df8fb4eb1e51"
    },
    "appUser": {
        "_id": "de13bee15b51033b34162411",
        "userId": "123"
    },
    "destination": {
        "type": "line"
    },
    "messages": [
        {
            "text": "Hi! Do you have time to chat?",
            "received": 1480001439.637,
            "name": "Danny",
            "role": "appMaker",
            "type": "text",
            "authorId": "5X8AJwvpy0taCkPDniC5la",
            "avatarUrl": "https://www.gravatar.com/image.jpg",
            "_id": "5837079fd84370ef2c0dcabb",
            "source": {
                "type": "slack"
            }
        }
    ],
    "timestamp": 1480001440.731
}
```

The payload for when the delivery of a message was successful.

### Trigger - `delivery:failure`

> Payload:

```json
{
    "trigger": "delivery:failure",
    "app": {
        "_id": "575040549a38df8fb4eb1e51"
    },
    "appUser": {
        "_id": "de13bee15b51033b34162411",
        "userId": "123"
    },
    "destination": {
        "type": "line"
    },
    "error": {
        "code": "unauthorized",
        "underlyingError": {
            "message": "Authentication failed due to the following reason: invalid token. Confirm that the access token in the authorization header is valid."
        }
    },
    "messages": [
        {
            "text": "Hi! Do you have time to chat?",
            "received": 1480001711.288,
            "name": "Danny",
            "role": "appMaker",
            "type": "text",
            "authorId": "5X8AJwvpy0taCkPDniC5la",
            "avatarUrl": "https://www.gravatar.com/image.jpg",
            "_id": "583708af8d449209ba217871",
            "source": {
                "type": "slack"
            }
        }
    ],
    "timestamp": 1480001711.941
}
```

The payload for when the delivery of a message fails.

### Trigger - `payment:success`

> Payload:

```json
{
    "trigger": "payment:success",
    "app": {
        "_id": "571e3496cb98b3962ce740d7"
    },
    "appUser": {
        "_id": "2b15a54fde9dc2f33f88bc25"
    },
    "payments": [
        {
            "source": {
                "type": "messenger"
            },
            "message": {
                "text": "Just put some vinegar on it",
                "actions": [
                    {
                        "text": "Buy vinegar",
                        "amount": 1000,
                        "currency": "usd",
                        "state": "paid",
                        "_id": "5877fd5624fe8fd934d7c2f3",
                        "uri": "https://app.smooch.io/checkout/5877fd5624fe8fd934d7c2f3",
                        "type": "buy"
                    }
                ],
                "type": "text",
                "role": "appMaker",
                "received": 1484258646.823,
                "authorId": "5X8AJwvpy0taCkPDniC5la",
                "avatarUrl": "https://www.gravatar.com/image.jpg",
                "_id": "5877fd5624fe8fd934d7c2f2",
                "source": {
                    "type": "api"
                }
            },
            "action": {
                "text": "Buy vinegar",
                "amount": 1000,
                "currency": "usd",
                "state": "paid",
                "_id": "5877fd5624fe8fd934d7c2f3",
                "uri": "https://app.smooch.io/checkout/5877fd5624fe8fd934d7c2f3",
                "type": "buy"
            },
            "charge": {
                "id": "ch_19dPrCHQ7f2U7NYSZ45OspXT"
            }
        }
    ],
    "timestamp": 1484258666.455
}
```

The payload for when a payment is received.

## Securing a webhook

When a webhook is created, a shared secret will be generated for it. The secret can be used to determine the veracity of a request to your webhook route. It is included as an `X-API-Key` header with each webhook request sent to the target URL.

That secret is available in the response to the POST request used to generate the webhook, or through a GET request to the webhook route.

## Retry Policy

If a webhook target responds with anything other than a 2xx status code, or if no response is received within 5 seconds, the call will be reattempted up to 5 times at an exponentially increasing interval.