# Authentication

```shell
# Calling GET /v1/appusers using a JWT
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -H 'authorization: Bearer your-jwt'
```
```js
// Initializing Smooch Core with a JWT in the browser
var smooch = new SmoochCore({
    jwt: 'your-jwt'
});
```
```js
// Initializing Smooch Core with a JWT in Node.js
var smooch = new SmoochCore({
    keyId: 'your-key-id',
    secret: 'your-secret',
    scope: 'app', // account or app
});
```

JSON Web Tokens (JWTs) are an industry standard authentication mechanism. The full specification is described [here](https://tools.ietf.org/html/rfc7519), and a set of supported JWT libraries for a variety of languages and platforms can be found at [http://jwt.io](http://jwt.io). To summarize, a JWT is composed of a header, a payload, and a signature. The payload contains information called *claims* which describe the subject to whom the token was issued.

The JWT itself is transmitted via the HTTP `authorization` header. The token should be prefixed with "Bearer" followed by a space. For example: `Bearer your-jwt`.

To sign JWTs, you will need to create a secret key pair in the Smooch dashboard, by going into the Settings tab. Clicking on "Create New Secret Key" will generate a new key id and a secret key pair which you can use to sign JWTs.

## Header

> JWT header:

```json
{
    "alg": "HS256",
    "typ": "JWT",
    "kid": "act_5963ceb97cde542d000dbdb1"
}
```

The JWT header must contain the key id (`kid`) of the secret key that is used to sign it. The algorithm (`alg`) used should be `HS256`. Unsigned JWTs are not accepted.

> JWT payload with `account` scope:

```json
{
    "scope": "account"
}
```

> JWT payload with `app` scope claim:

```json
{
    "scope": "app"
}
```

## Scope

The JWT payload must include a `scope` claim which specifies the caller's scope of access. There are two levels of scope:

> JWT with account scope example

```javascript
const jwt = require('jsonwebtoken');

const KEY_ID = 'act_5963ceb97cde542d000dbdb1';
const SECRET = 'W7JPAd-EaAVuQkWXBwDCkGv4';

const signJwt = function() {
    return jwt.sign({
        scope: 'account'
    },
    SECRET,
    {
        header: {
            kid: KEY_ID,
            typ: 'JWT',
            alg: 'HS256'
        }
    });
}
```
> JWT with app scope example

```javascript
const jwt = require('jsonwebtoken');

const KEY_ID = 'app_596dead8c82a8c2b00cf0db4';
const SECRET = 'RiYfZscraDLq1zrXgBdBxU_Z';

const signJwt = function() {
    return jwt.sign({
        scope: 'app'
    },
    SECRET,
    {
        header: {
            kid: KEY_ID,
            typ: 'JWT',
            alg: 'HS256'
        }
    });
}
```

1. The `account` scope grants access to all apps, users, and conversations associated with a given Smooch account. The `account` scope is reserved for server-to-server scenarios. The `account` scope JWT is signed with an account secret key (`act_`).

2. The `app` scope grants access to all users, and conversations within a given Smooch app. The `app` scope is reserved for server-to-server scenarios. The `app` scope JWT is signed with an app secret key (`app_`).

## Resource Paths

> Resource path with account scope token example

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f \
     -H 'authorization: your-account-jwt'
```

```js
smooch.appUsers.get('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f').then((response) => {
    // async code
});
```

> Resource path with app scope token example

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -H 'authorization: your-app-jwt'
```
```js
smooch.appUsers.get('c7f6e6d6c3a637261bd9656f').then((response) => {
    // async code
});
```

The app resource is implicitly defined in JWTs signed with app secret keys. However, most Smooch REST API users will use a single account scoped token to authenticate their calls to the API, and will thus provide the full resource path in the URL. Accordingly, the API call examples in these docs will reflect the full resource path.
