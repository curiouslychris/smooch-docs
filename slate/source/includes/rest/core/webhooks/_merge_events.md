## Merge Events

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

#### Merge events payload

| Field       | Description                                                                                                                                                       |
|-------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **trigger**  | `"merge:appUser"`                                                                                                                                                 |
| **app**  | A nested object representing the Smooch app associated with the event. See the [truncated app schema](#truncated-app-schema) below for details.                                               |
| **surviving**  | A nested object with the **truncated appUser** that now represents the merged appUser objects. See the [truncated appUser schema](#truncated-appuser-schema) below for details.         |
| **discarded**  | An array of objects with the **truncated appUsers** that were unified into `surviving` appUser object. See the [truncated appUser schema](#truncated-appuser-schema) below for details. |
