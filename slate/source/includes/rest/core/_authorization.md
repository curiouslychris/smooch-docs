# Authorization
This is an overview of how authorization works with the Smooch API.

Smooch uses JSON Web Tokens (JWTs) to authenticate server-to-server calls. [See below](#authentication) for more details on how to sign a JWT.

There are two different authorization scopes available - **app** and **account**.

| Scope        | Authorized Methods  |
|--------------|------------------|
| **app**      | All [Core](#core) methods |
| **account**  | All [Core](#core) and [Managed Accounts](#managed-accounts) methods |

JWTs issued with **app** scope can be used to access any of the Smooch Core APIs on behalf of a single app, or any app user related to that app.

JWTs issued with **account** scope can be used to access any of the Smooch Core and Managed Accounts APIs on behalf of the account owner, any app belonging to the account, or any app user related to those apps.

<aside class="notice">
An additional scope of `appUser` can also be used to authenticate users when using one of the Smooch native SDK integrations. For information on how and when to use this scope, see the guide for [authenticating users](/guide/authenticating-users/).
</aside>
