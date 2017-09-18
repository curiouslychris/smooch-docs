---
title: Managing user information
section: guide
layout: two-column
---

# Managing user information

App users can be extended to contain whatever custom properties you require under the `properties` property.

Custom properties can be added to a user:
1. via the [REST API](http://docs.smooch.io/rest/#update-app-user)
2. at runtime with the mobile and Web SDKs

In addition to custom properties, there are a number of predefined properties such as `givenName`, `surname`, and `email` that can also be set via the SDKs, or REST API.

To add properties via the REST API call the [Update App User endpoint](http://docs.smooch.io/rest/#update-app-user):

```bash
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f \
     -X PUT \
     -d '{"givenName": "Hilda", "properties": {"your-custom-property": "some-value"}}' \
     -H 'content-type: application/json' \
     -H 'authorization: your-account-jwt'
```

## Adding properties using the SDKs

Here, we add a property and name from the Web SDK:


Web SDK:
```javascript
Smooch.updateUser({
    givenName: 'Doctor',
    surname: 'Who?',
    email: 'the-doctor@smooch.io',
    properties: {
        'customProp': 'whatever you please'
    }
});
```

All user properties are optional, so the object you pass into `updateUser` could also look as simple as:


Web SDK:
```javascript
Smooch.updateUser({
    givenName: 'Trogdor'
});
```

### iOS

The `addProperties:` method accepts an `NSDictionary` containing the properties to add. This dictionary must have keys that are `NSString` and values that are either `NSString`, `NSNumber` or `NSDate`. If your dictionary contains any other data type as a value, then `description` will be called on the object and the resulting NSString will be added as a property.

### Android

You can grab the current user with `User.getCurrentUser` then set basic information with `setFirstName`, `setLastName`, `setEmail` and `setSignedUpAt`. You can also set your own custom properties by sending a map into `addProperties`.

### Naming the current user

Once you set the user's name it will be persisted by Smooch so any future message from this user contain the value you provided. If the user's information changes, simply call the method a second time and the new information will overwrite it.

Objective-C:
```objective_c
#import <Smooch/Smooch.h>

[SKTUser currentUser].firstName = @"Doctor";
[SKTUser currentUser].lastName = @"Who";
```

Swift:
```swift
#import <Smooch/Smooch.h>

SKTUser.currentUser().firstName = "Doctor"
SKTUser.currentUser().lastName = "Who"
```

Java:
```java
import io.smooch.core.User;

User.getCurrentUser().setFirstName("Artour");
User.getCurrentUser().setLastName("Babaev");
```

Web SDK:
```javascript
Smooch.updateUser({
    givenName: 'Doctor',
    surname: 'Who'
});
```

### Setting the user email address

Setting the user's e-mail makes this information available in the user profile and allows Smooch to lets you see their gravatar.


Objective-C:
```objective_c
#import <Smooch/Smooch.h>

[SKTUser currentUser].email = @"bob@example.com";
```

Swift:
```swift
#import <Smooch/Smooch.h>

SKTUser.currentUser().email = "bob@example.com"
```
```java
import io.smooch.core.User;

User.getCurrentUser().setEmail("2ez@4rtz.com");
```

Web SDK:
```javascript
Smooch.updateUser({
    email: 'the-doctor@smooch.io'
});
```

Setting or updating the user email will send a notification inside your configured business system. Here's how it looks in Slack for example :

![Email updated in Slack](/images/email_updated.png)

### Setting the signed up date

Setting the user's signed up date allows you to track when the user started using your service. If not set, it will default to the time the user was created in Smooch, which is most likely the moment when the user messaged you for the first time.


Objective-C:
```objective_c
#import <Smooch/Smooch.h>

[SKTUser currentUser].signedUpAt = [NSDate date];
```

Swift:
```swift
#import <Smooch/Smooch.h>

SKTUser.currentUser().signedUpAt = NSDate()
```

Java:
```java
import io.smooch.core.User;

User.getCurrentUser().setSignedUpAt(new Date(1420070400000l));
```

Web SDK:
```javascript
Smooch.updateUser({
    signedUpAt: new Date("Nov 6, 2013")
});
```

### Adding custom profile information

You can also specify any other kind of profile information that will be sent along when users contact you.


Objective-C:
```objective_c
#import <Smooch/Smooch.h>

[[SKTUser currentUser] addProperties:@{ @"nickname" : @"Lil Big Daddy Slim", @"weight" : @650, @"premiumUser" : @YES }];
```

Swift:
```swift
#import <Smooch/Smooch.h>

SKTUser.currentUser().addProperties([ "nickname" : "Lil Big Daddy Slim", "weight" : 650, "premiumUser" : true ])
```

Java:
```java
import io.smooch.core.User;

final Map<String, Object> customProperties = new HashMap<>();
customProperties.put("customDate", new Date());
customProperties.put("customFlag", true);
customProperties.put("customDigit", 322);
User.getCurrentUser().addProperties(customProperties);
```

<aside class="notice">
You need to make sure the SDK is properly initialized before attempting to update a user information.
</aside>

You can either update the user right after initialization using `.then`:

Web SDK:
```javascript
Smooch.init({
  appId: 'your-app-id'
})
  .then(function() {
    Smooch.updateUser({
      givenName: 'New',
      surname: 'Name'
    });
  });
```
Or you can update the information by binding your event before calling Smooch.init() with the method Smooch.on('ready') like below:


```javascript
Smooch.on('ready', function(){
  Smooch.updateUser({
    givenName: 'New',
    surname: 'Name'
  });
});

Smooch.init(...);
```
