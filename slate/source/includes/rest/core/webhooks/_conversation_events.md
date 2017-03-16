## Conversation Events

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

#### Conversation event payload schema

| Field       | Description                                                                                                                                  |
|-------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| **trigger** | `"conversation:read"`, or `"conversation:start"`                                                                                                                       |
| **app** | A nested object representing the Smooch app associated with the event. See the [truncated app schema](#truncated-app-schema) below for details.                          |
| **source** | A nested object representing the source of the event. See the [source schema](#sourcedestination-schema) below for details. |
| **appUser** | A nested object representing the [appUser](#app-user-schema) (for "conversation:read" events, a [truncated appUser](#truncated-app-user-schema) is provided). |
| **timestamp** | A unix timestamp given in seconds, describing when Smooch received the event. |

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
