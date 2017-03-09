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