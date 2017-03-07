## Merge Events

### merge events payload

| Field       | Type        | Description                                                                                                                                                       |
|-------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **trigger**  | String      | `"merge:appUser"`                                                                                                                                                 |
| **app**  | JSON Object | A nested JSON object representing the Smooch app associated with the event. See the [truncated app schema](#truncated-app-schema) below for details.                                               |
| **surviving**  | JSON Object | A nested JSON object with the **truncated appUser** that now represents the merged appUser objects. See the [truncated appUser schema](#truncated-appuser-schema) below for details.         |
| **discarded**  | Array       | An array of JSON objects with the **truncated appUsers** that were unified into `surviving` appUser object. See the [truncated appUser schema](#truncated-appuser-schema) below for details. |

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
