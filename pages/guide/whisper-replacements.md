---
title: Whispers replacements
section: guide
layout: two-column
---

# Whispers replacements

This guide details a few solutions to replace Whispers by bringing this functionality to your own server. Code examples given are for the iOS SDK but could be easily ported to the Android SDK and Web Messenger.

<aside class="warning">
Whispers and whisper replacement flows are no longer supported as of iOS 6.0.0, Android 5.0.0, and Web 4.0.0. The use cases described below are not supported with the latest versions of the SDKs.
</aside>

## Whispers using "Send on event"

To replace "Send on event" whispers, you can change your SDK usage to instead call your own backend which in turn will call the Smooch API to send a message.

For example, this would mean replacing calls like this:

```
[Smooch track:@"eventName"]
```

with calls like this:
```
[BackendClient track:@"eventName" forAppUser:[SKTUser currentUser].smoochId]
```

That `BackendClient` track method would then make a [POST call](https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/NetworkingOverview/WorkingWithHTTPAndHTTPSRequests/WorkingWithHTTPAndHTTPSRequests.html#//apple_ref/doc/uid/TP40010220-CH8-SW3) to your backend passing the `eventName` and `appUserId` (in order to identify the user in question).

In your backend, you can map the `eventName` to a message that you send to the user via the Smooch API. See [this tutorial](https://docs.smooch.io/guide/sending-messages/) on sending messages with the Smooch API.

Optionally, you can also use the [appUser API](https://docs.smooch.io/rest/#get-app-user) to retrieve the full appUser profile to check if the user matches other criteria relevant to your automated messages.

Note that to avoid sending the same automated message multiple times, you should also track which messages you have delivered to the user. You can track this state in the appUser’s properties (see [Managing user information](https://docs.smooch.io/guide/managing-user-information/)), or in your own database.

Not only will this replace the Whispers functionality, it will also provide you with a much more flexible and powerful automated messaging tool.

## Whispers using user properties of type date

To replace time based Whispers that use "Signed up", "Last seen", or any custom properties with date values and that are configured to send "As soon as user fits the audience" you’ll need to start tracking those dates in your backend server, in order to regularly check if a user matches the criteria to send a message.

For example, next to your initialization call:

```
[Smooch initWithSettings:[SKTSettings settingsWithAppToken:@"YOUR_APP_TOKEN"]];
```

you might add something like:

```
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(initCompleted:) name:SKTInitializationDidCompleteNotification object:nil];

- (void) initCompleted:(NSNotification *) notification

{
	[BackendClient track:@"appLaunched" forAppUser:[SKTUser currentUser].smoochId]
}
```

The `BackendClient` track method would then make a [POST call](https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/NetworkingOverview/WorkingWithHTTPAndHTTPSRequests/WorkingWithHTTPAndHTTPSRequests.html#//apple_ref/doc/uid/TP40010220-CH8-SW3) to your backend with the `eventName` and the `appUserId`.

In your backend, you can handle the `appLaunched`  eventName by creating or updating a signup/last seen date in your user database.

You can use a background job to periodically check if your users have been last seen or signed up x days ago.

Once your background job finds a match you can then use the `appUserId` to send a message to the user by following [these instructions](https://docs.smooch.io/guide/sending-messages/).

Note that to avoid sending the same automated message multiple times to the same user, you’ll also need to track which messages have already been sent to a user.

## Whispers using app version

To replace whispers that are sent to users using a specific version of your app on launch, you need to add logic to call your backend with the app version whenever the app is launched. Your backend can then send a message to the user for appropriate versions.

For example, next to your initialization call:  

```
[Smooch initWithSettings:[SKTSettings settingsWithAppToken:@"YOUR_APP_TOKEN"]]*;*
```

you might add something like:

```
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(initCompleted:) name:SKTInitializationDidCompleteNotification object:nil];

- (void) initCompleted:(NSNotification *) notification

{
	[BackendClient track:@"appLaunched" forAppUser:[SKTUser currentUser].smoochId usingVersion:[[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"]]
}
```

That `BackendClient` track method would then make a [POST call](https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/NetworkingOverview/WorkingWithHTTPAndHTTPSRequests/WorkingWithHTTPAndHTTPSRequests.html#//apple_ref/doc/uid/TP40010220-CH8-SW3) to your backend with the app version, `eventName`, and `appUserId`.

In your backend, you would parse the `appLaunched` event and check if the app version sent matches a version for which you want to send a message. You can then use the `appUserId` to send a message to the user by following [these instructions](https://docs.smooch.io/guide/sending-messages/).

Note that to avoid sending the same automated message multiple times, you’ll also need to track which messages have already been sent to a user.

## Whispers sent on "First User Message"

To replace Whispers sent to a user after they send their first message, listen to the `message:appUser` webhook event (see [this guide](https://docs.smooch.io/guide/receiving-messages/)). By tracking that a user has previously messaged you in your database, you can then determine whether to send a message to the user using the Smooch API (see [this guide](https://docs.smooch.io/guide/sending-messages/)).
