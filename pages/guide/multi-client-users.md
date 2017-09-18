---
title: Multi-Client Users
section: guide
layout: two-column
---

Smooch allows you to identify new users on the fly, engage with them in a single conversation thread across multiple clients, and associate user and client profile information so that you can better understand the context of a user's message. Mobile devices, web browsers and connected 3rd party channel accounts are all identified as clients in the Smooch API, however this section applies specifically to the use of Smooch iOS, Android and Web SDKs.

# Users on multiple clients 

You may have users using your app on multiple clients. For example, suppose they have your app installed on both their iPhone and their iPad. You might also have Smooch integrated in both your mobile app as well as on your web site.

If you want the user to see the same conversation across clients, you can do so by assigning your users a `userId` and [authenticating them](/guide/authenticating-users/) with a JWT. This will link a user across all clients and platforms that have integrated with your Smooch app.

<aside class="notice">
A <code>userId</code> is a string that can have any value you like, but must be unique within a given Smooch app. Examples of user ids include email addresses, GUIDs, or any existing ID from your own user directory.
</aside>

After Smooch has been initialized, you can pass the `userId` and `jwt` using the `login` API:

Objective-C:
```objective_c
[Smooch login:@"user-id" jwt:@"jwt" completionHandler:^(NSError * _Nullable error, NSDictionary * _Nullable userInfo) {
    // Your code after login is complete
}];
```

Swift:
```swift
Smooch.login("user-id", jwt:"jwt") { ( error:Error? , userInfo:[AnyHashable : Any]?) in
    // Your code after login is complete
}
```

JavaScript:
```javascript
Smooch.login("user-id", "jwt")
    .then(function() {
        // Your code after login is complete
    });
```

Java:
```java
Smooch.login("user-id", "jwt");
```

<aside class="notice">
For more information on how to sign JWTs, refer to the <a href="/guide/authenticating-users/">authenticating users</a> section of these docs.
</aside>

## Omitting the userId

Smooch will work perfectly fine without a `userId`. Profile information can still be included, and the user can take advantage of all rich messaging features, but the user will only be able to access the conversation from the client they're currently using. This means that even if you specify the same profile information, if the same individual opens Smooch on a new client, or runs your web app in an incognito browser session, they will see a newly created empty conversation when they open Smooch. Only the `userId` can be used to synchronize a conversation across clients.

A `userId` can also be omitted at first and added at a later time. If you deploy an update to your app that assigns an existing user with a new `userId` that they didn't have before, any existing conversation history they have will be preserved and their messages will start being synchronized across all clients where that `userId` is being used. This is particularly useful if a user opens Smooch and starts a conversation before having logged in to your app or website.

## Switching users

If your app allows a shared client to switch between multiple user identities you can call the `login` API multiple times to switch between different `userId`s.

### Logging out

Your app may have a logout function which brings users back to a login screen. In this case you would want to revert Smooch to a pre-login state. You can do this by calling the `logout` API.

Calling `logout` will disconnect your user from any `userId` they were previously logged in with and it will remove any conversation history stored on the client. Logging out will *not* disable Smooch. While logged out, the user is free to start a new conversation but they will show up as if `userId` was omitted during Smooch initialization.

Objective-C:
```objective_c
[Smooch logoutWithCompletionHandler:^(NSError * _Nullable error, NSDictionary * _Nullable userInfo) {
    // Your code after logout is complete
}];
```

Swift:
```swift
Smooch.logout { (error:Error? , userInfo:[AnyHashable : Any]?) in
    // Your code after logout is complete
}
```

JavaScript:
```javascript
Smooch.logout()
    .then(function() {
        // Your code after logout is complete
    });
```

Java:
```java
Smooch.logout();
```
