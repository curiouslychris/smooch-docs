---
title: Authenticating users
section: guide
layout: two-column
---

# Authenticating Users

When [assigning `userId`s to your users](/guide/multi-client-users/), a [JSON web token](http://jwt.io) (JWT) credential is required to protect the identity and data of that user. This option requires your app to be connected to your own secure web service. There are JWT libraries available supporting a wide variety of popular languages and platforms.

To issue JWTs:

1. Generate a secret key pair for your Smooch app. You can do this from the [Smooch dashboard](https://app.smooch.io) under the Settings tab.
1. Implement server side code to sign new JWTs using the key ID and secret provided. The JWT header must specify the key ID (`kid`). The JWT payload must include a `scope` claim of `appUser` and a `userId` claim which you've assigned to the app user. Make sure the `userId` field is formatted as a String. If you use numeric ids, the `userId` must be a String representation of the number - using a number directly will result in an invalid auth error.

    A node.js sample is provided below:

    ```javascript
    var jwt = require('jsonwebtoken');
    var KEY_ID = '55e9f9bf7a0ce5ca2d429c17';
    var SECRET = 'BFJJ88naxc5PZNAMU9KpBNTR';

    var signJwt = function(userId) {
        return jwt.sign({
            scope: 'appUser',
            userId: userId
        },
        SECRET,
        {
            headers: {
                alg: 'HS256',
                typ: 'JWT',
                kid: KEY_ID
            }
        });
    }
    ```

1. Issue a JWT for each user. You should tie-in the generation and delivery of this JWT with any existing user login process used by your app.

1. Specify the JWT when calling `login` on the client:

    Objective-C:
    ```objective_c
    [Smooch login:yourUserId jwt:yourJwt];
    ```

    Swift:
    ```swift
    Smooch.login(yourUserId, jwt:yourJwt)
    ```

    JavaScript:
    ```javascript
    Smooch.login(yourUserId, yourJwt);
    ```

    Java:
    ```java
    Smooch.login(yourUserId, yourJwt);
    ```

<aside class="warning">
If your secret key is ever compromised you can generate a new one. Smooch will accept a JWT as long as it contains all required fields and is signed with any of your Smooch app's valid secret keys. Deleting a secret key will invalidate all JWTs that were signed with it.
</aside>
