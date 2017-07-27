---
title: Changelog
section: guide
layout: two-column
---

# Changelog

## July 7th, 2017

- Updated [webhook retry policy](http://docs.smooch.io/rest/#retry-policy) to abort retries on [non-recoverable errors](http://docs.smooch.io/rest/#non-recoverable-errors)

## July 3rd, 2017

- Added new [Attachment API](https://docs.smooch.io/rest/#upload-attachment)
- Added support for new [file message type](http://docs.smooch.io/rest/#file-message)
- Android SDK [4.7.0](https://github.com/smooch/smooch-android/releases/tag/4.7.0), Web Messenger [3.15.0](https://github.com/smooch/smooch-js/releases/tag/3.15.0) and iOS SDK [5.7.0](https://github.com/smooch/smooch-ios/releases/tag/5.7.0) have been updated to render [file messages](http://docs.smooch.io/rest/#file-message) as a link

## June 20th, 2017

- [MessageBird](https://app.smooch.io/integrations/messagebird) is now a customer channel available on Smooch. [Learn more](http://blog.smooch.io/smooch-messagebird-new-sms-channel/)


## June 1st, 2017
- Added Mailgun support to the [Linking API](http://docs.smooch.io/rest/#link-app-user-to-channel)
- Added support for new flag `primary` to the [Linking API](http://docs.smooch.io/rest/#link-app-user-to-channel)
- Added support for Facebook 2.0 features
    - Added new [`conversation:referral` event](https://docs.smooch.io/rest/#trigger---code-classprettyprintconversationreferralcode) for when a user scans a parametric Messenger code or clicks on a Facebook ad
    - Added new referral schema to the [`conversation:started` event](https://docs.smooch.io/rest/#trigger---code-classprettyprintconversationstartcode)


## May 30th, 2017
- Added Dutch translations in iOS SDK [5.6.8](https://github.com/smooch/smooch-ios/releases/tag/5.6.8)

## May 26th, 2017
- [iOS SDK](https://github.com/smooch/smooch-ios/releases/tag/5.6.7) updated
  - Added ability to localize date format using string files
  - Changed the conversation navigation bar implementation to make it possible to customize the label at runtime

## May 24th, 2017
- Added support for [Call Buttons](https://developers.facebook.com/docs/messenger-platform/send-api-reference/call-button) to the Messenger channel. [Learn more](/guide/facebook-messenger/#call-buttons)

## May 12th, 2017
- [Android SDK](https://github.com/smooch/smooch-android/releases/tag/4.6.0) updated
  - Calls to `Conversation.Delegate.onMessagesReceived` no longer occur on image upload
  - Progress on image uploads now displays correctly
  - Add synchronicity lock to attempt to fix `ConcurrentModificationException`
- Added [Update App API](http://docs.smooch.io/rest/#update-app)
- Updated [Create App API](http://docs.smooch.io/rest/#create-app) with new `maskCreditCardNumbers` option
- Updated Smooch API wrappers to fix [issue](https://github.com/smooch/smooch-java/issues/1) caused by empty arrays being sent to the server and added [reasonable defaults](https://github.com/smooch/smooch-ruby/commit/f2739dbf1df0b13fb8c9ad9670e21e8ec2c1e7fb#diff-d708f25653882fc3f3a529fc5c74985fR429) for `limit` and `offset` params

## May 11th, 2017
- Added a new page in the [dashboard](https://app.smooch.io) which lets you see and manage all of your Smooch apps
- Added the ability to quickly navigate between your Smooch apps from anywhere in the dashboard using name or Id
- Speed and performance have been improved for accounts with a large number of Smooch apps
- The Smooch dashboard was given a facelift for an experience that is more intuitive, productive, and enjoyable

## May 8th, 2017

- Added Messenger support to the [Linking API](http://docs.smooch.io/rest/#link-app-user-to-channel) through Messenger's [customer matching](https://developers.facebook.com/docs/messenger-platform/guides/customer-matching)

## April 11th, 2017

- [Twitter DM](https://app.smooch.io/integrations/twitter) is now a customer channel available on Smooch

## April 7th, 2017

- Released [Ruby API library](https://github.com/smooch/smooch-ruby) for the Smooch API. Available as a [RubyGem](https://rubygems.org/gems/smooch-api/).
- Released [Python API library](https://github.com/smooch/smooch-python) for the Smooch API. Available as a [Pip package](https://pypi.org/project/smooch/).
- Released [Java API library](https://github.com/smooch/smooch-java) for the Smooch API. Available via [Maven](https://docs.smooch.io/guide/api-libraries/#java) or [Gradle](https://docs.smooch.io/guide/api-libraries/#java).

## April 4th, 2017

- Added delegate methods to allow on-the-fly customization of message display and sending in iOS SDK [5.6.0](https://github.com/smooch/smooch-ios/releases/tag/5.6.0)

## April 3rd, 2017

- Added delegate methods to allow on-the-fly customization of message display and sending in Android SDK [4.5.0](https://github.com/smooch/smooch-android/releases/tag/4.5.0)

## March 30th, 2017

- Added support for Messenger webview height, and Messenger Extensions (with fallback URL) in `link` actions. [Learn More](https://docs.smooch.io/rest/#extra-channel-options-schema)

## March 17th, 2017

- [Mailgun](https://app.smooch.io/integrations/mailgun) is now a customer channel available on Smooch
- Added menu targeting API and submenu support. [Learn More](https://docs.smooch.io/rest/#persistent-menus)

## March 9th, 2017

- Added support for changing display settings for carousel messages. [Learn more](https://docs.smooch.io/rest/#display-settings)
- Increased the limit of quick replies before truncation to 11 on Facebook Messenger
- Increased the limit at which Facebook Messenger messages are divided into smaller ones to 640

## March 7th, 2017

- Credit card numbers in message text are now automatically obfuscated, and will only display the last 4 digits (ex: `************4242`)
- Added revoke OAuth access API. [Learn More](https://docs.smooch.io/rest/#revoke-access)

## March 6th, 2017

- Added channel targeting API. [Learn More](https://docs.smooch.io/rest/#channel-targeting)

## March 1st, 2017

- Added delete messages API. [Learn More](https://docs.smooch.io/rest/#delete-messages)
- Added delete user profile API. [Learn More](https://docs.smooch.io/rest/#delete-user-profile)

## February 20th, 2017

- Added new [`conversation:start` event](https://docs.smooch.io/rest/#webhook-triggers) in the webhooks for when a user opts in to start a conversation.
- Improved Facebook Messenger linking support in Web Messenger [3.13.0](https://github.com/smooch/smooch-js/releases/tag/3.13.0)

## February 17th, 2017

- Android SDK [4.3.0](https://github.com/smooch/smooch-android/releases/tag/4.3.0) & Web Messenger [3.12.0](https://github.com/smooch/smooch-js/releases/tag/3.12.0) bring support for location sharing and improved user experience while a message is being sent.

## February 14th, 2017

- Added location request support in iOS SDK [5.5.0](https://github.com/smooch/smooch-ios/releases/tag/5.5.0)

## January 27th, 2017

- Added location request API. [Learn More](https://docs.smooch.io/rest/#location-request)
- Added support for receiving user's location. [Learn more](https://docs.smooch.io/rest/#trigger---code-classprettyprintmessageappusercode-location)
- Added Facebook Messenger Payments support. [Learn More](https://docs.smooch.io/guide/facebook-messenger/)
- Added new `payment:success` webhook. [Lean more](https://docs.smooch.io/rest/#trigger---code-classprettyprintpaymentsuccesscode)
- Added iOS and Android Push notification configuration API.
  - [iOS](https://docs.smooch.io/rest/#apple-push-notification)
  - [Android](https://docs.smooch.io/rest/#firebase-cloud-messaging)

## January 19th, 2017

- Added quick replies support in Android SDK [4.2.0](https://github.com/smooch/smooch-android/releases/tag/4.2.0)

## January 12th, 2017

- Added the "Logs" tab to the web app, which allows you to see delivery events for messages and webhooks.

## January 3rd, 2017

- Added quick replies support in iOS SDK [5.4.0](https://github.com/smooch/smooch-ios/releases/tag/5.4.0)

## January 2nd, 2017

- Added `GET` method to channels API. [Learn More](http://docs.smooch.io/rest/#get-app-user-channel-entities)

## December 16th, 2016

- Added text and image type message support in Android SDK [4.1.0](https://github.com/smooch/smooch-android/releases/tag/4.1.0)
- Added text and image type message support in iOS SDK [5.3.0](https://github.com/smooch/smooch-ios/releases/tag/5.3.0)
- Added new webhook triggers for `delivery:success`, `delivery:failure` and `conversation:read`. [Learn more](http://docs.smooch.io/rest/#webhook-triggers)

## December 8th, 2016

- Improved API performance for very long conversations

## December 2nd, 2016

- Added support for Facebook Messenger [list messages](http://docs.smooch.io/rest/#list-message)
- Added new field `type` to the [create message API](http://docs.smooch.io/rest/#post-message)
- Reply actions are now transformed into keyboard buttons on Viber

## November 24th, 2016

- Added typing indicator support in iOS SDK [5.2.0](https://github.com/smooch/smooch-ios/releases/tag/5.2.0)

## November 16th, 2016

- Added typing indicator support in Web Messenger [3.8.0](https://github.com/smooch/smooch-js/releases/tag/3.8.0)

## November 15th, 2016

- Added ability to change email in the [account page](https://app.smooch.io/account)
- [Managed accounts API](http://docs.smooch.io/rest/#introduction10) are now available and let you create [apps](http://docs.smooch.io/rest/#apps), configure [integrations](http://docs.smooch.io/rest/#integrations) and generate [keys](http://docs.smooch.io/rest/#app-keys) programmatically

## November 10th, 2016

- Added [suggested replies](http://docs.smooch.io/rest/#action-buttons) support in Web Messenger [3.7.0](https://github.com/smooch/smooch-js/releases/tag/3.7.0)

## November 7th, 2016

- [Viber](https://app.smooch.io/integrations/viber) is now a customer channel available on Smooch. [Learn more](http://blog.smooch.io/bring-your-business-to-viber-with-smooch/)
- Updated [LINE](https://app.smooch.io/integrations/line) to support Carousel, Action buttons, Quick replies and Postback. [Learn more](http://blog.smooch.io/line-upped-its-messaging-game/)
- Web Messenger [3.6.0](https://github.com/smooch/smooch-js/releases/tag/3.6.0) was released to support Viber and LINE
- Added [delete app API](http://docs.smooch.io/rest/#delete-app)

## October 28th, 2016

- Added [Typing activity API](http://docs.smooch.io/rest/#typing-activity)

## October 26th, 2016

- [Integration directory](https://app.smooch.io/integrations) is now available in the dashboard
- Added [Init.ai](https://app.smooch.io/integrations/init.ai), [Rep](https://app.smooch.io/integrations/rep), [Gorgias](https://app.smooch.io/integrations/gorgias), [Gupshup](https://app.smooch.io/integrations/gupshup), [Converse.ai](https://app.smooch.io/integrations/converse.ai) & [Dialog Analytics](https://app.smooch.io/integrations/dialoganalytics) integrations

## October 17th, 2016

- Upgraded [LINE](https://app.smooch.io/integrations/line) to support the new messaging API. LINE BOT API support is now deprecated.

## October 14th, 2016

- Added pagination support in iOS SDK [5.1.0](https://github.com/smooch/smooch-ios/releases/tag/5.1.0)

## September 21st, 2016

- Added support for Facebook Messenger [share buttons](http://docs.smooch.io/rest/#action-buttons) and [quick replies icons](http://docs.smooch.io/rest/#action-buttons).

## September 7th, 2016

- iOS SDK [5.0](https://github.com/smooch/smooch-ios/releases/tag/5.0.0) adds support for iOS 10, replyable notifications, and rich notifications. [Learn more](http://blog.smooch.io/release-notes-frictionless-notifications-for-ios-10/)

## September 2nd, 2016

- Added pagination support on the [conversation API](http://docs.smooch.io/rest/#get-messages)
- Web Messenger [3.4.0](https://github.com/smooch/smooch-js/releases/tag/3.4.0) adds support for pagination and loads message history as you scroll

## August 18th, 2016

- Added [persistent menu API](http://docs.smooch.io/rest/#persistent-menus) with support on Facebook Messenger and WeChat
- Added message transferred counts in the dashboard
- Android SDK [4.0.0](https://github.com/smooch/smooch-android/releases/tag/4.0.0) now supports Android 7.0 "Nougat" and Firebase cloud messaging

## August 15th, 2016

- Added user linking for the SMS customer channel on Web Messenger [3.3.0](https://github.com/smooch/smooch-js/releases/tag/3.3.0). [Learn more](http://blog.smooch.io/new-feature-sms-linking-added-to-web-messenger/)
- Added [user linking API](http://docs.smooch.io/rest/#link-app-user-to-channel) for SMS

## August 10th, 2016

- Android SDK [3.2.2](https://github.com/smooch/smooch-android/releases/tag/3.2.2) now includes turkish translations

## July 29th, 2016

Web Messenger [3.2.0](https://github.com/smooch/smooch-js/releases/tag/3.2.0) now supports:
- Being displayed as a button or a tab when closed.
- Color customization from the dashboard.
- Automatic contrast detection for text displayed on top of configured colors.

## July 26th, 2016

- Added [carousel API](http://docs.smooch.io/rest/#carousel-messages) with full support for Facebook Messenger and Telegram. Text only fallback for all other channels.

## July 13th, 2016

- Added Suggested replies support via the [API](http://docs.smooch.io/rest/#action-buttons) and via the [message syntax](/guide/sending-images-and-buttons-shorthand/)

## June 29th, 2016

Web Messenger [3.1.0](https://github.com/smooch/smooch-js/releases/tag/3.1.0) adds:
- An error banner when sending a message fails
- Auto resize based on window height

## June 22nd, 2016

- Added [WeChat](https://app.smooch.io/integrations/wechat) as a customer channel. [Learn more](http://blog.smooch.io/wechat-smooch-talk-to-customers-in-asia-your-way/)
- Web Messenger [3.0.0](https://github.com/smooch/smooch-js/releases/tag/3.0.0) adds notifications and account linking on Facebook Messenger, Telegram & WeChat. [Learn more](http://blog.smooch.io/introducing-smooch-web-messenger-smart-notifications/)

## May 25th, 2016

- Android SDK [3.2.0](https://github.com/smooch/smooch-android/releases/tag/3.2.0) allows to manually trigger Smooch push notifications via multiple `GCMListener`

## May 24th, 2016

- Added [Email](https://app.smooch.io/integrations/frontendEmail) as a customer channel. [Learn more](http://blog.smooch.io/integration-spotlight-add-email-to-your-messaging-mix/)
