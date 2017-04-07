# Authentication
Managed Accounts require a `account` scoped JWT. To sign those JWTs, you will need to use an Account level secret key. You can create one by going into your [account page](https://app.smooch.io/account). For more details about signing JWTs, see [this](#jwt) section.

### Using the Account Scoped Token

```curl
# Calling GET /v1/appusers using an account scoped jwt
        curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/appusers/c7f6e6d6c3a637261bd9656f \
             -H 'authorization: Bearer your-account-jwt'
```

```js
// Initializing Smooch Core with an account scoped key
var smooch = new SmoochCore({
    keyId: 'your-account-key-id',
    secret: 'your-account-secret-key',
    scope: 'account'
});
```

```js
// Retrieving an appUser when authed with account scope
smooch.appUsers.get('55c8d9758590aa1900b9b9f6', 'c7f6e6d6c3a637261bd9656f').then((response) => {
    // async code
});
```

Use the `account` scoped JWT in the same way that you would use an `app` or `appUser` scoped JWT, by passing it as an Authorization header, with the token prefaced by the _Bearer_ keyword. See [Authentication](#authentication) for more details.

All of the existing core APIs such as `/v1/appusers` and `/v1/webhooks` are accessible using an `account` JWT, provided the `appId` is included in the the path (e.g. `/v1/appusers` becomes `/v1/apps/{appId}/appusers`)
