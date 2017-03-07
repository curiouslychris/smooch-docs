# Persistent Menus

Smooch provides a /v1/menu/ API to set persistent menus on messaging channels that support custom menus in their chat UIs ([Facebook Messenger](http://docs.smooch.io/javascript/#facebook-messenger) and [WeChat](http://docs.smooch.io/javascript/#wechat)). Menus are configured on a per app basis (not per user).

## Get Menu

> Request:

```shell
curl https://api.smooch.io/v1/menu \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.menu.get()
.then(() => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
    "menu": {
        "name": "My Awesome Menu",
        "items": [
            {
                "type": "link",
                "text": "Smooch",
                "uri": "http://smooch.io",
                "_id": "57b331fbf1c6aeba1f940dc7"
            },
            {
                "type": "postback",
                "text": "Hello",
                "payload": "HELLO",
                "_id": "57b331fbf1c6aeba1f940dc6"
            }
        ]
    }
}
```

<api>`GET /v1/menu`</api>

Get the specified app's menu.

## Update Menu

> Request:

```shell
curl https://api.smooch.io/v1/menu \
     -X PUT \
     -d '{"items": [{"type": "link", "text": "Smooch", "uri": "http://smooch.io"}]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.menu.configure({
    name: 'My Awesome Menu',
    items: [{
        type: 'link',
        text: 'Smooch',
        uri: 'http://smooch.io'
    }]
})
.then(() => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
    "menu": {
        "name": "My Awesome Menu",
        "items": [{
            "type": "link",
            "text": "Smooch",
            "uri": "http://smooch.io",
            "_id": "57b331fbf1c6aeba1f940dc7"
        }]
    }
}
```

<api>`PUT /v1/menu`</api>

Configure the specified app's menu.

| **Arguments**               |   |
|-----------------------------|---|
| **items**<br/><span class='req'>required</span> | A list of menu items. See below. |
| **name**<br/><span class='opt'>optional</span> | An optional text to use as a menu name. If none is provided defaults to "Menu". Not all channels support a custom menu name (e.g. Facebook Messenger's menu name is fixed)|

### Menu Items

Menus contain 1 to 5 menu items.

| **Arguments**               |   |
|-----------------------------|---|
| **type**<br/><span class='req'>required</span> | Can either be [link](/javascript/#links) or [postback](/javascript/#postbacks), which correspond to Smooch's [link and postback actions](/javascript/#action-buttons) |
| **text**<br/><span class='opt'>required</span> | The button text of the menu item. |
| **uri**<br/><span class='opt'>optional</span> | A valid address, like http://smooch.io. Required for a "link" type item. |
| **postback**<br/><span class='opt'>optional</span> | A payload for a postback. Required for a "postback" type item.|

## Delete Menu

> Request:

```shell
curl https://api.smooch.io/v1/menu \
     -X DELETE \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.menu.remove()
.then(() => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
    "menu": {
        "items": []
    }
}
```

<api>`DELETE /v1/menu`</api>

Remove the specified app's menu.
