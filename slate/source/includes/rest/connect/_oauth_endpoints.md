# OAuth Endpoints
## Authorize

> Request:

```curl
curl https://app.smooch.io/oauth/authorize?client_id=shoplifter&response_type=code
```
```js
// This endpoint is not currently wrapped in a JavaScript lib
```

<api>`GET https://app.smooch.io/oauth/authorize`</api>

This endpoint begins the OAuth flow. It relies on a browser session for authentication. If the user is not logged in to Smooch they will be redirected to the login page. If the user has many apps, they will first be prompted to select the one they wish to integrate with. They will then be presented with an Allow/Deny dialog, describing details of the access your integration is requesting.

| *Parameter* | *Description* |
|-------------|---------------|
| **client_id**<br/><span class='req'>required</span> | Your integration's unique identifier |
| **response_type**<br/><span class='req'>required</span>  | For now the only acceptable value is `code` |
| **state**<br/><span class='opt'>optional</span>  | You may pass in any arbitrary string value here which will be returned to you along with the code via browser redirect |
| **redirect_uri**<br/><span class='opt'>optional</span>  | You may pass in a redirect_uri to determine which URI the response is redirected to. This URI must be contained in the list configured by your integration. If this option is not passed, the first URI present in the list will be used |

### Success Response

A successful response is delivered via a 302 redirect to the redirect URI configured by your integration.

| *Parameter* | *Description* |
|-------------|---------------|
| **code** | An authorization code which can be exchanged for an access token |
| **state** | Your state parameter (if one was provided) |

### Error Response

| *Parameter* | *Description* |
|-------------|---------------|
| **error**   | For example: `access_denied` |
| **state**   | Your state parameter (if one was provided) |

### Error Codes

| *Error Code* | *Delivery Method* | *Description* |
|--------------|-------------------|---------------|
| **access_denied** | 302 | The user denied access |

## Get Token

> Request:

```curl
curl -X POST https://api.smooch.io/oauth/token \
     -d code=your_code \
     -d grant_type=authorization_code \
     -d client_id=shoplifter \
     -d client_secret=secret
```
```js
// This endpoint is not currently wrapped in a JavaScript lib
```

<api>`POST https://app.smooch.io/oauth/token`</api>

This endpoint is used to exchange an authorization code for an access token. It should only be used in server-to-server calls.

| *Parameter* | *Description* |
|-------------|---------------|
| **code**<br/><span class='req'>required</span> | The authorization code received via `/oauth/authorize` |
| **grant_type**<br/><span class='req'>required</span> | Must be set to `authorization_code` |
| **client_id**<br/><span class='req'>required</span> | Your integration's unique identifier |
| **client_secret**<br/><span class='req'>required</span> | Your integration's secret |

### Success Response:

| *Parameter* | *Description* |
|-------------|---------------|
| **access_token** | An access token that can now be used to call Smooch APIs |
| **token_type** | `Bearer`. All issued tokens are of this type |

### Scope

The scope of an issued access token is `integration` scope. This allows API calls to be made to a specific Smooch app on behalf of an integration, identified by the integration's `clientId`. The access token grants permission to get and create app users and conversations associated with the app. The token also grants permission to create webhooks, however only webhooks created for the integration will be visible. An access token with `integration` scope cannot see or modify webhooks that were created by other integrations, for example.

| *API Root*         | *Access*     |
|--------------------|--------------|
| **/v1/appusers/*** | Yes          |
| **/v1/webhooks/*** | Yes          |
| **/v1/apps/***     | No           |
| **/v1/integrations/***     | No           |
| **/v1/menu/***     | No           |

## Revoke Access

> Request:

```curl
curl -X DELETE https://api.smooch.io/oauth/authorization \
     -H 'authorization: Bearer your-token'
```
```js
// This endpoint is not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```

<api>`DELETE https://app.smooch.io/oauth/authorization`</api>

This endpoint is used to revoke your integration's access to the user's Smooch app. Revoking access means your integration will no longer be able to interact with the app, and any webhooks the integration had previously configured will be removed. 

Calling this endpoint is equivalent to the user removing your integration manually in the Smooch web app. Your integration's `removeUrl` (if configured) will also be called when an integration is removed in this way.