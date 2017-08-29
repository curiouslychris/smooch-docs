# Message Actions

Actions buttons can be sent through the [post message API](#post-message) by including them in the message payload. There are many types of actions, each with its own abilities and limitations. See below for the payloads of each distinct action type.

<aside class="notice">
    Action buttons can only be attached to messages with a `role` of `appMaker`.
</aside>

## Link
A link action will open the provided URI when tapped.

> Send link action:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appMaker", "type": "text", "actions": [{"type": "link", "text": "Put vinegar", "uri": "http://example.com" }]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```
```js
smooch.appUsers.sendMessage('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appMaker',
    type: 'text',
    actions: [
      {
        type: 'link',
        text: 'Put vinegar',
        uri: 'http://example.com'
      }
    ]
}).then(() => {
    // async code
});
```

|        **Arguments**         |                            |
|------------------------------|----------------------------|
| **text**<br/><span class='req'>required</span>     | The button text. |
| **type**<br/><span class='req'>required</span>     | `link` |
| **uri**<br/><span class='req'>required</span>      | The action URI. This is the link that will be used in the clients when clicking the button. |
| **default**<br/><span class='opt'>optional</span>  | Boolean value indicating whether the action is the default action for a [message item](#message-items) in Facebook Messenger. |
| **metadata**<br/><span class='opt'>optional</span> | Flat object containing any custom properties associated with the action. See the [metadata schema](#metadata-schema) for more information.|
| **extraChannelOptions**<br/><span class='opt'>optional</span> | Extra options to pass directly to the channel API. See [Extra Channel Options](#extra-channel-options-schema) |

<aside class="notice">
    Action buttons sent to LINE must have `http` or `https` protocol or the message will not be delivered.
</aside>

#### Extra Channel Options Schema

For features that are not yet supported natively by the Smooch platform, or are specific to a certain channel implementation, the `Extra Channel Options` Schema allows the caller to specify certain parameters that will be passed directly to the channel API.

Extra channel options exist for the following channels:

|        **Arguments**         |                            |
|------------------------------|----------------------------|
| **messenger**<br/><span class='opt'>optional</span>     | An object conforming to the [Messenger Extra Channel Options Schema](#messenger-extra-channel-options-schema)  |

#### Messenger Extra Channel Options Schema

|        **Arguments**         |                            |
|------------------------------|----------------------------|
| **webview_height_ratio**<br/><span class='opt'>optional</span>     | Controls the webview height in a `link` type action. Possible values are `compact`, `tall`, and `full`. [More Info](https://developers.facebook.com/docs/messenger-platform/send-api-reference/url-button)  |
| **messenger_extensions**<br/><span class='opt'>optional</span>     | For `link` type actions, a boolean value indicating whether the URL should be loaded with Messenger Extensions enabled. Default value is `false`. [More Info](https://developers.facebook.com/docs/messenger-platform/send-api-reference/url-button)  |
| **fallback_url**<br/><span class='opt'>optional</span>     | If `messenger_extensions` is `true`, the URL to use on clients that don't support Messenger Extensions. [More Info](https://developers.facebook.com/docs/messenger-platform/send-api-reference/url-button)  |

<aside class="notice">
    When using Messenger Extensions, make sure to [whitelist your domain](https://developers.facebook.com/docs/messenger-platform/webview/extensions) with Facebook, otherwise the message will result in a delivery failure.
</aside>

## Buy
A buy action will prompt the user to purchase an item.

> Send buy action:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appMaker", "type": "text", "actions": [{"type": "buy", "text": "Buy vinegar", "amount": 1000 }]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```
```js
smooch.appUsers.sendMessage('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appMaker',
    type: 'text',
    actions: [
      {
        type: 'buy',
        text: 'Buy vinegar',
        amount: 8000
      }
    ]
}).then(() => {
    // async code
});
```

|  **Arguments**                |                  |
|------------------------------|----------------------------|
| **text**<br/><span class='req'>required</span>      | The button text. |
| **type**<br/><span class='req'>required</span>      | `buy` |
| **amount**<br/><span class='req'>required</span>    | The amount being charged. It needs to be specified in cents and is an integer (9.99$ -> 999).|
| **currency**<br/><span class='opt'>optional</span>  | The currency of the amount being charged (USD, CAD, etc.). If not specified, it would use the default one set in your account. [See supported currencies](https://support.stripe.com/questions/which-currencies-does-stripe-support). |
| **metadata**<br/><span class='opt'>optional</span>  | Flat object containing any custom properties associated with the action. See the [metadata schema](#metadata-schema) for more information. |

<aside class="notice">
The <a href="/javascript/#stripe">Stripe integration</a>, or payments for Facebook Messenger, must be configured and active in order to send buy buttons.
</aside>

## Postback
A postback action will post the action payload to the server when tapped.

> Send postback action:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appMaker", "type": "text", "actions": [{"type": "postback", "text": "Send vinegar", "payload": "buy_vinegar" }]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```
```js
smooch.appUsers.sendMessage('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appMaker',
    type: 'text',
    actions: [
      {
        type: 'postback',
        text: 'Buy vinegar',
        payload: 'buy_vinegar'
      }
    ]
}).then(() => {
    // async code
});
```

|  **Arguments**                |                  |
|------------------------------|----------------------------|
| **text**<br/><span class='req'>required</span>      | The button text. |
| **type**<br/><span class='req'>required</span>      | `postback` |
| **payload**<br/><span class='req'>required</span>    | A string payload to help you identify the action context. You can also use metadata for more complex needs. |
| **metadata**<br/><span class='opt'>optional</span>  | Flat object containing any custom properties associated with the action. See the [metadata schema](#metadata-schema) for more information. |

<aside class="notice">
See how to handle postback events with <a href="#webhook-triggers">webhook triggers</a>.
</aside>

## Reply

A reply action will echo the user's choice as a message.<br/>
You may optionally specify an `iconUrl` which will render as an icon for each option.

> Send reply action:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
     -d '
{
    "text":"Which do you prefer?",
    "role": "appMaker",
    "type": "text",
    "actions": [{
        "type": "reply",
        "text": "Tacos",
        "iconUrl": "http://example.org/taco.png"
        "payload": "TACOS"
    }, {
        "type": "reply",
        "text": "Burritos",
        "iconUrl": "http://example.org/burrito.png"
        "payload": "BURRITOS"
    }]
}'
```
```js
smooch.appUsers.sendMessage('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
    text: 'Which do you prefer?',
    type: 'text',
    role: 'appMaker',
    actions: [
      {
        type: 'reply',
        text: 'Tacos',
        iconUrl: 'http://example.org/taco.png',
        payload: 'TACOS'
      }, {
        type: 'reply',
        text: 'Burritos',
        iconUrl: 'http://example.org/burrito.png',
        payload: 'BURRITOS'
      }
    ]
}).then(() => {
    // async code
});
```

|  **Arguments**                |                  |
|------------------------------|----------------------------|
| **text**<br/><span class='req'>required</span>      | The button text. |
| **type**<br/><span class='req'>required</span>      | `reply` |
| **payload**<br/><span class='req'>required</span>   | A string payload to help you identify the action context. Used when posting the reply. You can also use metadata for more complex needs. |
| **iconUrl**<br/><span class='opt'>optional</span>   | An icon to render next to the reply option |
| **metadata**<br/><span class='opt'>optional</span>  | Flat object containing any custom properties associated with the action. See the [metadata schema](#metadata-schema) for more information. |

<aside class="notice">
`reply` type actions can be sent either alone or with [location request](#location-request) actions. If an action of a different type is included in the message, it will be rejected.
</aside>

<aside class="notice">
Icons are currently only supported on Facebook Messenger, iOS, Android, and Web Messenger.
</aside>

**Facebook Messenger**
![Facebook Messenger reply icons](/images/fb_reply_icon.png)

**Web Messenger**
![Web Messenger reply icons](/images/web_reply_icon.png)

## Location Request

A location request action will prompt the user to share their location. See [Channel capabilities](https://docs.smooch.io/guide/channel-capabilities/) for the list of supported channels. Unsupported clients will receive text fallback: "YourApp has requested a location".

> Send locationRequest action:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Where are you?", "role": "appMaker", "type": "text", "actions": [{"type": "locationRequest", "text": "Send Location"}]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```
```js
smooch.appUsers.sendMessage('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
    text: 'Where are you?',
    role: 'appMaker',
    type: 'text',
    actions: [
      {
        type: 'locationRequest',
        text: 'Send Location'
      }
    ]
}).then(() => {
    // async code
});
```

|  **Arguments**         |                            |
|------------------------------|----------------------------|
| **text**<br/><span class='req'>required</span>      | The button text. |
| **type**<br/><span class='req'>required</span>      | `locationRequest`|
| **metadata**<br/><span class='opt'>optional</span> | Flat object containing any custom properties associated with the action. See the [metadata schema](#metadata-schema) for more information. |

<aside class="notice">
`locationRequest` type actions can be sent either alone or with [reply](#reply) actions. If an action of a different type is included in the message, it will be rejected.
</aside>

## Share
Actions in a [message item](#message-items) may also include a share button.

> Send share action:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H "authorization: Bearer your-account-jwt" \
     -d '
{
    "role": "appMaker",
    "type": "carousel",
    "items": [{
        "title": "Title",
        "description": "Description",
        "mediaUrl": "http://example.org/image.jpg",
        "mediaType": "image/jpeg",
        "actions": [{
            "type": "share"
        }]
    }]
}'
```
```js
smooch.appUsers.sendMessage('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
    text: 'Title',
    role: 'appMaker',
    type: 'carousel',
    items: [{
      title: 'Title',
      actions: [{
        type: 'share'
      }]
    }]
}).then(() => {
    // async code
});
```

![messenger carousel](/images/facebook_share_button.png)

|  **Arguments**                |                  |
|------------------------------|----------------------------|
| **type**<br/><span class='req'>required</span>      | `share` |
| **metadata**<br/><span class='opt'>optional</span>  | Flat object containing any custom properties associated with the action. See the [metadata schema](#metadata-schema) for more information. |

<aside class="notice">
Share Buttons are currently only supported in Facebook Messenger carousels.
</aside>
