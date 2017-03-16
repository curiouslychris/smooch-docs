## Payment Events

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

#### Payment event payload schema

| Field       | Description                                                                                                               |
|-------------|-------------|---------------------------------------------------------------------------------------------------------------------------|
| **trigger**  | `"payment:success"`                                                                                                       |
| **app**  | A nested object representing the Smooch app associated with the event. See the [truncated app schema](#truncated-app-schema) below for details.       |
| **appUser**  | A nested object representing the appUser associated with the event. See the [truncated appUser schema](#truncated-app-user-schema) below for details.      |
| **payments**  | An array of objects representing the payments associated with the event. See the [payment schema](#payment-schema) below for details. |
| **timestamp**  | A unix timestamp given in seconds, describing when Smooch received the message. |

#### Payment schema

| Field     | Description                                                                                                                                                                                                   |
|-----------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **source**  | A nested object describing the source of the event. See the [source schema](#sourcedestination-schema) for details.                                                                                                           |
| **message**  | A nested object representing the appMaker message associated with the postback action. See the [message schema](#message-schema) below for details (Not present in postback payloads triggered by persistent menu items). |
| **action**  | A nested of object representing the buy action associated with the event. See the [action schema](#action-schema) below for details.                                                                                     |
| **charge**  | A nested of object representing the Stripe charge associated with the event. See the [charge schema](#charge-schema) below for details. |

#### Charge schema

| Field | Description                                                                                                        |
|-------|--------|--------------------------------------------------------------------------------------------------------------------|
| **id**  | The stripe ID of the charge event. See the [Stripe docs](https://stripe.com/docs/api#charges) for more information |
