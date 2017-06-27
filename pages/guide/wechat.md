---
title: WeChat
section: guide
layout: two-column
---

# WeChat

WeChat is a China-based mobile text and voice messaging communication service. With over 700 million active users, it’s become the de facto hub for Chinese conversational commerce.

Our WeChat integration lets your customers message you from WeChat, while you reply using your favorite business apps.

### Configuring WeChat

In order to configure WeChat, you'll need a WeChat [Official Account](http://open.wechat.com/cgi-bin/newreadtemplate?t=overseas_open/section_detail&show=office). You can apply for an International-Market Official Account [here](http://apply.wechat.com) and for a Mainland China-Market [here](https://mp.weixin.qq.com/). Alternatively, you can also test using the [sandbox](/guide/wechat/#integrate-with-wechat-sandbox).

Once you've created your account, you will need to go through the account verification process. In order to do so, login to your [WeChat dashboard](https://mp.weixin.qq.com) and go to the “WeChat Certification | 微信认证” page below the Set Up section.

Once your account has been verified, go to the [integration page](https://app.smooch.io/integrations/wechat), connect the integration, and follow these steps.

1. In the [WeChat dashboard](https://mp.weixin.qq.com/), go to the "Basic Configuration | 基本配置" page below the Develop section and add the following IP addresses to the whitelist separated by new lines.

    * 34.224.190.28
    * 52.6.201.31
    * 52.0.232.16

2. In the WeChat dashboard, copy and paste your App ID and App Secret on the Smooch integration page.

3. In the WeChat dashboard, click on "Modify Configuration | 修改配置" below Basic Configuration, then copy the Webhook URL and Token from the Smooch integration page and paste it there.

4. After saving your settings, click on Connect to WeChat to complete the integration.

### Safe Mode

Optionally, you can configure "Safe Mode" in the WeChat dashboard. With this mode enabled, all outgoing messages from WeChat will be encrypted using a secure 43 character AES key.

In order to have Safe Mode functioning correctly with Smooch, simply copy your EncodingAESKey from WeChat and paste it in the WeChat integration page. Messages will be automatically decrypted in a secure fashion.

### Persistent Menu

![WeChat Persistent Menu](/images/wechat_menu.png)

It's possible to configure a menu on the WeChat UI by calling [the Smooch REST API](https://docs.smooch.io/rest/#persistent-menus). WeChat allows up to two levels of menu hierarchy and they can contain 1 to 3 menu items at its first level and 1 to 5 menu items for a submenu. Menus are configured per app or per integration, not per user. Menu items can be [link](/guide/structured-messages/#link-buttons), [postback](/guide/structured-messages/#postback-buttons) or [submenu](https://docs.smooch.io/rest/#menu-items) type actions.

### Integrate with WeChat Sandbox

WeChat offers a sandbox environment to easily test their messaging features similar to an offical account. Using your WeChat user account on your mobile phone, scan the QR code and login into the [WeChat Sandbox dashboard](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login).

1. In the WeChat Sandbox dashboard, the "Test Numbers | 测试号信息" section will provide you with an App ID and App Secret to be entered into the Smooch integration page.

1. In the "Interface Configuration | 接口配置信息" section, click on "Modification | 修改" and enter the Webhook URL and Token from the Smooch integration page.

1. After saving your settings, click on Connect to WeChat to complete the integration.

In the "Test QR Code | 测试号二维码" section, scan your Sandbox QR code to message your WeChat Sandbox account.

<aside class="notice">When using WeChat sandbox, you may skip the whitelist step as the sandbox doesn't have any IP restrictions</aside>
