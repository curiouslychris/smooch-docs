---
title: Sending Messages
section: guide
layout: two-column
---

# Sending Messages

Smooch allows you to send text, image and [structured](/guide/structured-messages/) messages to your users. Each of the messages you send becomes a part of the conversation between your user and your business system.

You can send messages using our [integrated business systems](https://app.smooch.io/integrations/categories/business-systems), this allows you to start communicating with your customers using your favourite software.

Alternatively, you can use the Smooch API to send messages from within your own software.

## Sending Text Messages with the API

In order to send a message to a user, you'll need the user's ID. Typically, you'll obtain this from the [webhook that delivers a user's message to your software](/guide/receiving-messages/), alternatively you can obtain this ID by [manually creating](/guide/creating-users/) users or by copying it from the dashboard log tab.


With the user ID in hand, you can easily send a simple text message:

```javascript
smooch.appUsers.sendMessage('APP_USER_ID', {
    type: 'text',
    text: 'Hello, world!',
    role: 'appMaker',
    name: 'Business Man',
    email: 'boss@business.com'
}).then(() => {
    // async code
});
```

In the code above, `text` contains the message payload, while `name` and `email` are optionally used to identify the "sender" of the message that should be displayed to the user receiving the message. Smooch uses the email parameter to look up and provide an avatar for the message sender using [gravatar](http://gravatar.com), if one is available.

To learn more about the various parameters of this API, read its [reference documentation](http://docs.smooch.io/rest/#post-message).

## Automatic message delivery

When responding to users that have multiple channels linked, either via the [Linking API](/rest/#link-app-user-to-channel) or the [Web Messenger](/guide/web-messenger/#user-linking), Smooch uses the following channel targeting logic to ensure delivery of messages:

 - First, send the message to the preferred channel. The preferred channel is the last channel used by the user. 
 - If the message is left unread for 5 minutes and the preferred channel was not push-capable, send the message to the second-best channel. This means the second most recently used channel that is push-capable.
 - Finally, send the message to all channels that support receiving messages without a notification (currently all SDKs & Facebook messenger)

 Here's a visual representation of the automatic message delivery logic:

 ![Built-in delivery logic](/images/delivery.png)

 ## Targeting a specific channel

Using the Smooch API, you can also bypass the [automatic delivery logic](/guide/sending-messages/#automatic-message-delivery) and [target a channel](https://docs.smooch.io/rest/?javascript#channel-targeting) specifically. Note that for this to work, the user needs to have a client linked to the targeted channel.

```javascript
smooch.appUsers.sendMessage('APP_USER_ID', {
    type: 'text',
    text: 'Hey Messenger user',
    role: 'appMaker',
    name: 'Business Man',
    email: 'boss@business.com',
    destination: {
        integrationType: 'messenger'
    }
}).then(() => {
    // async code
});
```

## Sending Typing Activity with the API

In some cases, user experience in a conversation can be improved by letting the user know that "typing" is in progress and that a message will soon be on its way. Smooch provides a convenient API that you can use to signal these events to messaging channels that support this feature.

```javascript
smooch.appUsers.typingActivity('APP_USER_ID', {
  type: 'typing:start'
}).then(() => {
    // async code
});
```

When you call this function with 'typing:start', a typing activity indicator will be displayed on the supported channel. To cancel it, call 'typing:stop'. Alternatively, the indicator will be stopped the moment you send another message on the channel. You can read more about this function, and its beahviour in the [API reference](http://docs.smooch.io/rest/#typing-activity).

## Next steps

Once you're able to send text messages to users with Smooch, move on to sending structured messages that can significantly enrich the conversation experience.

 * [Send structured messages](/guide/structured-messages/) using the Smooch API to any messaging channel
 * Take advantage of convenient [shorthand](/guide/sending-images-and-buttons-shorthand/) for sending images and buttons from any business system.
