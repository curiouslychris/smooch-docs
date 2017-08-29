# Conversation

## Typing Activity
> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/conversation/activity \
     -X POST \
     -d '{"role":"appMaker", "type": "typing:start"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-account-jwt'
```

```js
smooch.appUsers.typingActivity('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f', {
    role: 'appMaker',
    type: 'typing:start'
}).then(() => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
  "conversation": {
    "_id": "df0ebe56cbeab98589b8bfa7",
    "unreadCount": 0
  }
}
```

<api>`POST /v1/apps/{appId}/appusers/{appUserId|userId}/conversation/activity`</api>

Notify Smooch when an app maker starts or stops typing a response.

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **role**<br/><span class='req'>required</span>       | The role of the actor. Must be `appMaker`. |
| **type**<br/><span class='req'>required</span>       | The type of activity to trigger. Must be either `typing:start` or `typing:stop` |
| **name**<br/><span class='opt'>optional</span>      | The name of the app maker that starts or stops typing a response |
| **avatarUrl**<br/><span class='opt'>optional</span>      | The avatar URL of the app maker that starts typing a response |

<aside class="notice">
Typing activity is only supported on our Web Messenger, iOS SDK, Facebook Messenger and Telegram
</aside>


## Reset Unread Count
> Request:

```shell
curl https://api.smooch.io/v1/apps/5963c0d619a30a2e00de36b8/appusers/c7f6e6d6c3a637261bd9656f/conversation/read \
     -X POST \
     -H 'authorization: your-account-jwt'
```
```js
smooch.conversations.resetUnreadCount('5963c0d619a30a2e00de36b8', 'c7f6e6d6c3a637261bd9656f').then(() => {
    // async code
});
```

> Response:

```
200 OK
```

<api>`POST /v1/apps/{appId}/appusers/{appUserId|userId}/conversation/read`</api>

Reset the unread count of the conversation to 0. If the conversation has not yet been created for the specified app user 404 will be returned.
