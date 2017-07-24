# Authorization
This is an overview of how authorization works with the Smooch API.

Smooch uses JSON Web Token (JWT) for authentication. [See below](#authentication) for more details. There are three different scopes of authorization available. These are _appUser_, _app_, and _account_.

| Scope        | Authorized Methods  |
|--------------|------------------|
| **appUser**  | [Init](#init), [App User](#app-user), and [Conversations](#conversations) methods |
| **app**      | All [Core](#core) methods |
| **account**  | All [Core](#core) and [Managed Accounts](#managed-accounts) methods |

JWTs issued with **appUser** scope grant the caller permission to access that specific user's data only. Once an app user JWT is used for the first time, the user and their conversation history will transition into secure mode, and from that point onward a JWT will be *required* for any subsequent API calls pertaining to that user. Once secured users will also have to be logged in in order to chat on web and mobile clients. See the [authentication guide](/guide/authenticating-users/) for more information.

JWTs issued with **app** scope can be used to access any of the Smooch Core APIs on behalf of a single app, and any app user related to that app.

JWTs issued with **account** scope can be used to access any of the Smooch Core and Managed Accounts APIs on behalf of any app belonging to the account, and any app user related to those apps.
