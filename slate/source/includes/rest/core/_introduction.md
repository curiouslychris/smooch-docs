# Introduction

Welcome to the Smooch API. The API allows you to craft entirely unique messaging experiences for your app and website as well as talk to any backend or external service.

## Basics

The Smooch API is designed according to [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) principles.

The API accepts JSON in request bodies and requires that the `content-type: application/json` header be specified for all such requests. The API will always respond with a object. Depending on context, resources may be returned as single objects or as arrays of objects, nested within the response object.

The API also facilitates [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) so that it can be called from a web application.

## API Libraries

Smooch provides official API libraries for [Javascript](https://github.com/smooch/smooch-core-js), [Ruby](https://github.com/smooch/smooch-ruby), [Python](https://github.com/smooch/smooch-python) and [Java](https://github.com/smooch/smooch-java). Those helpful libraries wraps calls to this API.

## Errors

```
401 Unauthorized
```
```
{
  "error": {
    "code": "unauthorized",
    "description": "Authorization is required"
  }
}
```

Smooch uses standard HTTP status codes to communicate errors

|         |   |
|---------|---|
| **200** | OK - Everything went as planned. |
| **400** | Bad Request - Something in your header or request body was malformed. |
| **401** | Unauthorized - Necessary credentials were either missing or invalid. |
| **402** | Payment Required - The action is not available on your payment plan, or you have exceeded usage limits for your current plan. |
| **403** | Forbidden - Your credentials are valid but you don't have access to the requested resource. |
| **404** | Not Found - The object you're requesting doesn't exist. |
| **409** | Conflict - You might be trying to update the same resource concurrently. |
| **429** | Too Many Requests - You are calling our APIs more frequently than we allow. |
| **500, 502, 503, 504** | Server Errors - Something went wrong on our end. |

In addition to the status code, the HTTP body of the response will also contain a JSON representation of the error.

## Rate Limits

Smooch APIs are subject to rate limiting.  If you exceed the limits, Smooch will start returning a `429 Too Many Requests` HTTP status code. We apply rate limits to prevent abuse, spam, denial-of-service attacks, and similar issues. Our goal is to keep the limits high enough so that any application using Smooch as intended will never hit them. However, applications that consistently exceed limits run the risk of being permanently disabled.

## Deprecations

The `devices` array returned in the AppUser payload has been changed to `clients`. In order to maintain compatibility, we will keep returning the `devices` array in v1, but in the next version it will be removed.