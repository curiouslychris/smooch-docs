---
title: Web Messenger
section: guide
layout: two-column
---

# Web Messenger

The Web Messenger is a highly customizable messaging widget that can be added to any Web page. Smooch offers a [hosted version](https://app.smooch.io/integrations/web) of the widget. It's also possible to self-host the widget and fork it to change the appearance, branding, and/or functionality of the widget to suit your needs.

The Smooch Web Messenger is unique in that it allows you to seamlessly move the conversation beyond the browser session to a persistent channel like SMS, Facebook Messenger, or any of our other [OTT channels](/guide/intro-to-channels/).

## Reference

- [Web Messenger repository and reference](https://github.com/smooch/smooch-web/)

## Adding Smooch to your site

![Web Messenger's UI](/images/web_widget.png)

There are a few ways you can include the Smooch Web Messenger on your web page.

The easiest way to get started is using the Script Tag method, but you can also include it using npm.


### Script Tag Method

#### Step 1: Include the Smooch Web Messenger on your web page

Add the following code towards the end of the `head` section on your page and replace `<app-id>` with your app ID found in your app settings page.

```html
<script>
    !function(e,n,t,r){
        function o(){try{var e;if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var t=n.getElementsByTagName("script")[0],r=n.createElement("script");r.async=!0,r.src=e.url,t.parentNode.insertBefore(r,t)}}catch(e){}}var s,p,a,i=[],c=[];e[t]={init:function(){s=arguments;var e={then:function(n){return c.push({type:"t",next:n}),e},catch:function(n){return c.push({type:"c",next:n}),e}};return e},on:function(){i.push(arguments)},render:function(){p=arguments},destroy:function(){a=arguments}},e.__onWebMessengerHostReady__=function(n){if(delete e.__onWebMessengerHostReady__,e[t]=n,s)for(var r=n.init.apply(n,s),o=0;o<c.length;o++){var u=c[o];r="t"===u.type?r.then(u.next):r.catch(u.next)}p&&n.render.apply(n,p),a&&n.destroy.apply(n,a);for(o=0;o<i.length;o++)n.on.apply(n,i[o])};var u=new XMLHttpRequest;u.addEventListener("load",o),u.open("GET","https://"+r+".webloader.smooch.io/",!0),u.responseType="json",u.send()
    }(window,document,"Smooch","<app-id>");
</script>
```



#### Step 2: Initialize Smooch with your new app ID

Once Smooch has been included on your web page, you're almost done. Simply initialize the Web Messenger using this code snippet

```html
<script>
    Smooch.init({appId: '<app-id>'});
</script>
```

### npm and browserify/webpack

```bash
npm install smooch
```

In your code:

```javascript
var Smooch = require('smooch');

Smooch.init({appId: '<app-id>'});
```

## Alternate Channels

The Web Messenger supports the ability for users to find and reach out to you on any channel you support.
In order to offer additional channels, simply integrate with whichever [messaging channel](https://app.smooch.io/integrations/categories/customer-channels) you please and it will automatically be added to the list.

<span class="half-width-img">![Alternate Channels](/images/alternate_channels.png)</span>

<span class="half-width-img">![SMS Page](/images/sms.png)</span>

## User linking

If a user starts chatting with you and would like to continue the chat on another messaging channel such as Facebook Messenger, they will have the option to link their Facebook account and continue that same conversation.

These conversations will be merged automatically, allowing you to reply to the customer from the same thread wherever they choose.
When you reply to your user, Smooch will intelligently detect which messaging channel they most recently used and make sure that a user doesn't get spammed with push notifications if they happen to have multiple messaging channels linked.

For example, if a user visits your site and would like to close the tab, they can choose to 'Send to Messenger'. This will connect their conversation to Facebook Messenger and allow them to close the tab and move on.

<span class="half-width-img">![Send to Messenger](/images/send_to_messenger.png)</span>

## Customization

### Embedded mode

To embed the widget in your existing markup, you need to pass `embedded: true` when calling `Smooch.init`. By doing so, you are disabling the auto-rendering mechanism and you will need to call `Smooch.render` manually. This method accepts a DOM element which will be used as the container where the widget will be rendered.


```js
Smooch.init({
    appId: '<app-id>',
    embedded: true
});


Smooch.render(document.getElementById('chat-container'));
```

<aside class="notice">
The embedded widget will take full width and height of the container.  
You must give it a height, otherwise, the widget will collapse.
</aside>

### Strings customization

Smooch lets you customize any strings it displays by overwriting its keys. Simply add the `customText` key in your `Smooch.init()` call and specify new values for the keys used in Smooch. You can find all available keys [here](https://github.com/smooch/smooch-web/blob/master/src/frame/js/reducers/ui-reducer.js#L6). If some text is between `{}`, or if there is an html tag such as `<a>`, it needs to stay in your customized text.

For example:

```js
Smooch.init({
    appId: '<app-id>',
    customText: {
        headerText: 'How can we help?',
        inputPlaceholder: 'Type a message...',
        sendButtonText: 'Send'
    }
});
```

### Styling the Conversation Interface

The Web Messenger settings page allows for customization of various fields.

<img alt="Web Messenger Settings" src="/images/web_messenger_settings.png" />

#### Display Style

The Web Messenger can be displayed as a button or as a tab. You can select the style in the web settings of the Smooch dashboard. The default style is the button mode.

With the button style Web Messenger, you have the option of selecting your own button icon. The image must be at least 200 x 200 pixels and must be in either JPG, PNG, or GIF format.

#### Color Customization

For customization of colors, you can set the Brand Color, Conversation Color and Action Color in the web settings of the Smooch dashboard.

* The **Brand Color** customizes the color of the messenger header. It is also used for the color of the button or tab in idle state, as well as the color of the default app icon. If no color is specified, the brand color will default to <span style='color: #65758e; font-weight:bold;'>#65758e</span>.
* The **Conversation Color** customizes the color of customer messages and actions in the footer. If no color is specified, the conversation color will default to <span style='color: #0099ff; font-weight: bold;'>#0099ff</span>.
* The **Action Color** changes the appearance of links and buttons in your messages. It is also used for the 'Send' button when it is in active state. If no color is specified, the action color will default to <span style='color: #0099ff; font-weight: bold;'>#0099ff<span>.

<img alt="Color Customization" src="/images/color_customization_web.png" />

### Sound notification

By default, a sound notification will be played when a new message comes in and the window is not in focus.

To disable this feature, you need add the `soundNotificationEnabled` option to the `Smooch.init` call, like this:

```js
Smooch.init({
    appId: '<app-id>',
    givenName: 'Cool',
    surname: 'Person',
    soundNotificationEnabled: false // Add this line to your 'Smooch.init' call
});
```
