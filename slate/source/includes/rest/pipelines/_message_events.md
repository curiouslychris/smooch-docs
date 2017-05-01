# Handling Message Events

## Message Event Payload

> Payload:

```json
{
    "message": {
        "text": "Asdfadsfasf",
        "role": "appUser",
        "received": 1467121217.994,
        "authorId": "9b812d3fa8baee30fb211341",
        "name": "Sheldon App",
        "_id": "57727e416434979f62611a43",
        "source": {
            "type": "ios"
        },
        "actions": []
    },
    "appUser": {
        "_id": "9b812d3fa8baee30fb211341",
        "userId": "sheldon1"
    },
    "app": {
        "_id": "5773bd998f7e5f960fa4fe8c"
    },
    "nonce": "mw_rGw3kUlgBLgSctS-t170zQXN"
}
```

When a processor is notified of an appUser message, it receives this payload data in the body of an HTTP POST request.

| Field      | Description                                                                                                               |
|------------|-------------|---------------------------------------------------------------------------------------------------------------------------|
| **app** | A nested object representing the Smooch app associated with the event. See the [truncated app schema](#truncated-app-schema) below for details. |
| **messages** | An array of objects representing the messages associated with the event. See the [message schema](#message-schema) for details. |
| **appUser** | A nested object representing the appUser associated with the event. See the [truncated appUser](#truncated-app-user-schema) for details. |
| **nonce** | A code used to call the [continue endpoint](#continue-message) when a processor decides to continue the message chain. |

## Continue Message
<aside class="warning">This endpoint is currently in BETA and has not been wrapped in Swagger or native libraries yet. It is currently only available via HTTP call to the REST API.</aside>

> Request:

```shell
curl https://api.smooch.io/v1/middleware/continue \
     -X POST \
     -d '{"metadata":{"handled":true}}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer the-nonce'
```

```js
// not implemented yet
```

> Response:

```
200 OK
```
```json
{
    "message": {
        "text": "Asdfadsfasf",
        "role": "appUser",
        "received": 1467121217.994,
        "authorId": "9b812d3fa8baee30fb211341",
        "name": "Sheldon App",
        "_id": "57727e416434979f62611a43",
        "source": {
            "type": "ios"
        },
        "actions": [],
        "metadata": {
            "handled": true
        }
    }
}
```

<api>`POST /v1/middleware/continue`</api>

This endpoint allows you to continue processing a message. When this endpoint is called within five minutes of notification the message event will continue to the next processor, or be delivered to business systems and webhooks if this is the final processor in the pipeline.

| **Arguments**             |   |
|---------------------------|---|
| **metadata**<br/><span class='opt'>optional</span> | A Flat JSON object with metadata to be added to the message. See the [message schema](#message-schema) for more details on message metadata |

The caller must also include a nonce in the Authorization header of the request (ex: _Authorization: Bearer mw_rGw3kUlgBLgSctS-t170zQXN_). Nonce tokens are valid for 5 minutes.
