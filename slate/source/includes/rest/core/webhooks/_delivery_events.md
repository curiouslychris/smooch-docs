## Delivery Events

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

#### Delivery event payload schema

| Field         | Description                                                                                                                 |
|---------------|-------------|-----------------------------------------------------------------------------------------------------------------------------|
| **trigger** | `"delivery:success"` or `"delivery:failure"`                                                                                                        |
| **app** | A nested object representing the Smooch app associated with the event. See the [truncated app schema](#truncated-app-schema) below for details.         |
| **messages** | An array of objects representing the messages associated with the event. See the [message schema](#message-schema) below for details.   |
| **appUser** | A nested object representing the **truncated appUser** associated with the event. See the [appUser schema](#truncated-appuser-schema) below for details.        |
| **destination** | A nested object representing the destination of the message. See the [destination schema](#sourcedestination-schema) below for details.                |
| **timestamp** | A unix timestamp given in seconds, describing when Smooch received the message.                                             |
| **error**  <span class="opt">optional</span> | A nested object (present in `"delivery:failure"` event) representing the error associated with the delivery failure. See the [error schema](#error-schema) below for details. |

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

#### Error schema

| Field             | Description                                   |
|-------------------|-------------|-----------------------------------------------|
| **code**  | The error code associated with the error.     |
| **underlyingError** <span class="opt">optional</span>| A object with the error data returned by the channel a message was meant to be delivered too. |
| **message** <span class="opt">optional</span>| The description associated with the error. |
