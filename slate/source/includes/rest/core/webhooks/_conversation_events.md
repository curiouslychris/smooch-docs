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
| **referral** | Referral information. Available for Facebook Messenger "conversation:start" events only. See [referral schema](#referral-schema) for details.

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

### Trigger - `conversation:referral`

> Payload:

```json
{
    "trigger": "conversation:referral",
    "app": {
        "_id": "589b7811d626a6d76d6b8555"
    },
    "source": {
        "type": "messenger"
    },
    "appUser": {
        "_id": "4a5f73a36a7b818c2643296f"
    },
    "referral": {
        "code": "my-ref-code",
        "details": {
            "source": "MESSENGER_CODE",
            "type": "OPEN_THREAD"
        }
    },
    "timestamp": 1495650348.685
}
```

#### Conversation referral payload schema
|    Field     |        Description        |
|--------------|---------------------------|
| **trigger**  | `"conversation:referral"` |
| **app**      | A nested object representing the Smooch app associated with the event. See the [truncated app schema](#truncated-app-schema) below for details. |
| **source**   | A nested object representing the source of the event. See the [source schema](#sourcedestination-schema) below for details. |
| **appUser**  | A [truncated appUser](#truncated-app-user-schema) schema object |
| **referral** | Referral information. See [referral schema](#referral-schema) for details. |

The payload for when a user is referred to a conversation. Currently, Messenger is the only channel that supports this.
This payload will be sent when a user performs the following actions:

- Scanning a [Messenger code](https://developers.facebook.com/docs/messenger-platform/messenger-code)
- Clicking a [conversion ad](https://developers.facebook.com/docs/messenger-platform/guides/ads) on Facebook
