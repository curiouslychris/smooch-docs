# Authentication
Smooch APIs offer two methods of authentication:

1. Using an [App Token](#app-token)
2. Using a [JSON Web Token (JWT)](#jwt)

Some APIs accept either of the two authentication methods while others require a `jwt` credential.

| API                          | Valid authentication methods |
|------------------------------|------------------------------|
| [`/v1/appusers`](#app-user)  | `jwt`, `appToken`            |
| [`/v1/init`](#init)          | `jwt`, `appToken`            |
| [`/v1/webhooks`](#webhook)   | `jwt`                        |

## App Token


```shell
# Calling GET /v1/appusers using an app token
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

```js
// Initializing Smooch Core with an app token
var smooch = new SmoochCore({
    appToken: 'cr2g6jgxrahuh68n1o3e2fcnt'
});
```

When calling Smooch APIs such as [`/v1/appusers`](#app-users) on behalf of app users, an `appToken` may be used for basic authentication.

Every Smooch app has an `appToken` provisioned to it which can be found in the app settings tab. The `appToken` is sent via the the `app-token` HTTP header. This will link the caller to a specific Smooch app.

Specifying an `appToken` alone is sufficient to call any of the app user facing API.

## JWT


```shell
# Calling GET /v1/appusers using a jwt
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -H 'authorization: Bearer your-jwt'
```
```js
// Initializing Smooch Core with a jwt in the browser
var smooch = new SmoochCore({
    jwt: 'your-jwt'
});
```
```js
// Initializing Smooch Core with a jwt in Node.js
var smooch = new SmoochCore({
    keyId: 'your-key-id',
    secret: 'your-secret',
    scope: 'appUser', // account, app, or appUser
    userId: 'some-id' // not necessary if scope === 'app'
});
```

JSON Web Tokens (JWTs) are an industry standard authentication mechanism. The full specification is described [here](https://tools.ietf.org/html/rfc7519), and a set of supported JWT libraries for a variety of languages and platforms can be found at [http://jwt.io](http://jwt.io). To summarize, a JWT is composed of a header, a payload, and a signature. The payload contains information called *claims* which describe the subject to whom the token was issued.

For added security when making calls on behalf of an app user, a `jwt` credential can optionally be specified instead of an `appToken`.

The `jwt` itself is transmitted via the HTTP `authorization` header. The token should be prefixed with "Bearer" followed by a space. For example: `Bearer your-jwt`.

To sign JWTs, you will need to create a secret key in the Smooch dashboard, by going into the Settings tab. Clicking on "Create New Secret Key" will generate a new key id and a secret key pair which you can use to sign JWTs.

<aside class="warning">
After using a `jwt` with `appUser` scope to authenticate an app user for the `/appuser` or `/init` routes, it becomes no longer possible to authenticate that app user with an `appToken`.
</aside>

### Header

> JWT header:

```json
{
    "alg": "HS256",
    "typ": "JWT",
    "kid": "b567635f883c819871ace8003c0db14b"
}
```

The JWT header must contain the key id (`kid`) of the secret key that is used to sign it. The algorithm (`alg`) used to sign the JWT can be anything supported by the [jsonwebtoken npm module v5.0.4](https://www.npmjs.com/package/jsonwebtoken#algorithms-supported). Unsigned JWTs are not accepted.

> JWT payload with `appUser` scope claim:

```json
{
    "scope": "appUser",
    "userId": "bob@example.com"
}
```

> JWT payload with `app` scope:

```json
{
    "scope": "app"
}
```

### Scope

The `jwt` payload must include a `scope` claim which specifies the caller's scope of access. There are two levels of scope:

1. The `appUser` scope grants access to an individual app user's data and conversation history, but nothing else. It is used when issuing tokens to individual users. A `jwt` with `appUser` scope must also specify a `userId` which uniquely identifies the `appUser` being accessed. [Node.js code sample](https://gist.github.com/alavers/8f07b03895333d83b454)

1. The `app` scope grants access to all users and conversations within a given Smooch app. The `app` scope is reserved for server-to-server scenarios, the creation of webhooks for example. [Node.js code sample](https://gist.github.com/alavers/d9af102ca4cefac1a7e5)

| API                       | Accepted `jwt` Scopes |
|---------------------------|-----------------------|
| [/v1/appusers](#app-user) | app, appUser          |
| [/v1/webhooks](#webhook)  | app                   |
