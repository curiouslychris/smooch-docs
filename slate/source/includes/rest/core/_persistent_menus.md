# Persistent Menus
Smooch provides an API to set persistent menus on messaging channels that support custom menus in their chat UIs ([Facebook Messenger](https://docs.smooch.io/guide/facebook-messenger/) and [WeChat](https://docs.smooch.io/guide/wechat/)). Menus can be configured on a per-app basis and on a per-integration basis.

<aside class="warning">
Seeing your changes while testing might require deleting the conversation in the WeChat/Messenger app, as messaging apps have a tendency to cache the menu content.
</aside>

## Get App Menu

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

## Update App Menu

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

Configure the specified app's menu. See the [persistent menu schema](#persistent-menu-schema) for possible options.

## Delete App Menu

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

## Get Integration Menu

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations/5735dded48011972d621dc02/menu \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.integrations.menu.get('55c8d9758590aa1900b9b9f6', '5735dded48011972d621dc02')
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

<api>`GET /v1/apps/{appId}/integrations/{integrationId}/menu`</api>

Get the specified integration's menu.


## Update Integration Menu

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations/5735dded48011972d621dc02/menu \
     -X PUT \
     -d '{"items": [{"type": "link", "text": "Smooch", "uri": "http://smooch.io"}]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.integrations.menu.update('55c8d9758590aa1900b9b9f6', '5735dded48011972d621dc02', {
    items: [{
        type: 'link',
        text: 'Smooch',
        uri: 'http://smooch.io'
    }]
}).then(() => {
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
        "items": [{
            "type": "link",
            "text": "Smooch",
            "uri": "http://smooch.io",
            "_id": "57b331fbf1c6aeba1f940dc7"
        }]
    }
}
```

<api>`PUT /v1/apps/{appId}/integrations/{integrationId}/menu`</api>

Set the specified integration's menu, overriding the app menu if configured. See the [persistent menu schema](#persistent-menu-schema) for possible options.

## Delete Integration Menu

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations/5735dded48011972d621dc02/menu \
     -X DELETE \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.integrations.menu.delete('55c8d9758590aa1900b9b9f6', '5735dded48011972d621dc02')
.then(() => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{}
```

<api>`DELETE /v1/apps/{appId}/integrations/{integrationId}/menu`</api>

Remove the specified integration's menu, falling back to the app menu if configured.

## Schema

### Persistent Menu Schema

| **Arguments**               |   |
|-----------------------------|---|
| **items**<br/><span class='req'>required</span> | A list of menu items. See [menu items](#menu-items-schema) for more detail. |
| **settings**<br/><span class='opt'>optional</span> | An optional object for menu settings. See [menu settings](#menu-settings-schema) for more detail. |

### Menu Items Schema

Menus contain 1 to 3 menu items at its first level of hierarchy. Submenus contain 1 to 5 menu items.

| **Arguments**               |   |
|-----------------------------|---|
| **type**<br/><span class='req'>required</span> | Can either be `link`, `postback`, which correspond to Smooch's `link` and `postback` [actions](#action-buttons), or `submenu` for nested menus. |
| **text**<br/><span class='req'>required</span> | The button text of the menu item. |
| **uri**<br/><span class='opt'>optional</span> | A valid address, like http://smooch.io. Required for a `link` type item. |
| **payload**<br/><span class='opt'>optional</span> | A payload for a postback. Required for a `postback` type item.|
| **items**<br/><span class='opt'>optional</span> | An array of menu items for a submenu. Required for a `submenu` type item.|

### Menu Settings Schema

A business can modify whether to have its chat text input enabled or not by including an optional `settings` object.

| **Arguments**               |   |
|-----------------------------|---|
| **inputEnabled**<br/><span class='req'>required</span> | Specifies whether the text input should be enabled or not. Defaults to `true`. This feature is only supported in [Facebook Messenger](https://docs.smooch.io/guide/facebook-messenger/) |
