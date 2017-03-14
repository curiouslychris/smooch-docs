## Postback Events

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


#### Postback event payload schema

| Field       | Description                                                                                                                 |
|-------------|-------------|-----------------------------------------------------------------------------------------------------------------------------|
| **trigger**  | `"postback"`                                                                                                                |
| **app**  | A nested object representing the Smooch app associated with the event. See the [truncated app schema](#truncated-app-schema) below for details.         |
| **postbacks**  | An array of objects representing the postbacks associated with the event. See the [postback schema](#postback-schema) below for details. |
| **appUser**  | A nested object representing the appUser associated with the event. See the [appUser schema](#appuser-schema) below for details. |

#### Postback schema

| Field                                       | Description                                                                                                                                                                                          |
|---------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **message** <span class="opt">optional</span>| A nested object representing the message associated with the postback action. See the [message schema](#message-schema) below for details (Not present in postback payloads triggered by persistent menu items). |
| **action**  | A nested object representing the postback action. See the [action schema](#action-schema) below for details. |
