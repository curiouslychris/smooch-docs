# Authorization

This is an overview of how authorization works with the Smooch API.

Smooch offers two methods for authentication JSON Web Token (JWT) and app token. [See below](#authentication) for more details. There are three different scopes of authorization available. These are _appUser_, _app_, and _appMaker_.

| Scope        | Methods  | Authorized APIs  |
|--------------|---------------|------------------|
| **appUser**  | JWT, appToken | [Init](#init), [App User](#app-user), [Conversations](#conversations) |
| **app**      | JWT           | [Init](#init), [App User](#app-user), [Conversations](#conversations) [Webhooks](#webhooks), [Persistent Menus](#persistent-menus) |

The **appToken** authentication method only allows you to call the API on behalf of users who have not yet been secured by an app user scoped JWT.

JWTs issued with **appUser** scope grant the caller permission to access that specific user's data only. Once an app user JWT is used for the first time, the user and their conversation history will transition into secure mode, and from that point onward a JWT will be *required* for any subsequent API calls pertaining to that user. An **appToken** will no longer be accepted to access that specific user's data.

JWTs issued with **app** scope can be used to access any of the Smooch Core APIs on behalf of the app, or any app user.
