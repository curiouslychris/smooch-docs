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