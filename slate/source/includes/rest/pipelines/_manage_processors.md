# Manage Processors

<aside class="warning">These endpoints are currently in BETA and have not been wrapped in Swagger or native libraries yet. They are currently only available via HTTP call to the REST API.</aside>

These endpoints are used to manage processors. See [Manage Pipelines](#manage-pipelines) to specify the processors order in a pipeline.

The following API endpoints use JWT-based authorization. The required scopes are either app or account. When using _account scope_ you call the endpoints like so by specifying the app resource: `/v1/apps/:id/middleware/processors`. When calling the endpoints with _app scope_ it isn't necessary to specify the app resource, and you can call the same endpoint like so: `/v1/middleware/processors`.

## Create Processor

> Request:

```shell
curl https://api.smooch.io/v1/middleware/processors \
     -X POST \
     -d '{"target": "https://my-server.com/path"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

```js
// not implemented yet
```

> Response:

```
201 CREATED
```
```json
{
  "processor": {
    "target": "https://my-server.com/path",
    "secret": "a9283d25460bc79eaf3b91098a526f6db036da0e",
    "_id": "577284eccf0801526d6930e7"
  }
}
```

<api>`POST /v1/middleware/processors`</api>

Create a [message processor](#processor-schema) which points at an endpoint on your server. The message processor will not become part of the pipeline until explicitly added to the pipeline.

| **Arguments**             |   |
|---------------------------|---|
| **target**<br/><span class='req'>required</span> | URL to be called when the processor is triggered. |

## List Processors

> Request:

```shell
curl https://api.smooch.io/v1/middleware/processors \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

```js
// not implemented yet
```

> Response:

```
200 OK
```
```json
{
  "processors": [
    {
      "target": "https://my-server.com/path",
      "secret": "23e6fbc67cf035fe4b99d1adce29fafbc2f71191",
      "_id": "57601a3205d8542a65baef2e"
    }
  ]
}
```

<api>`GET /v1/middleware/processors`</api>

List all [message processors](#processor-schema) configured for a given app.

## Get Processor

> Request:

```shell
curl https://api.smooch.io/v1/middleware/processors/57601a3205d8542a65baef2e \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

```js
// not implemented yet
```

> Response:

```
200 OK
```
```json
{
  "processor": {
    "target": "https://my-server.com/path",
    "secret": "23e6fbc67cf035fe4b99d1adce29fafbc2f71191",
    "_id": "57601a3205d8542a65baef2e"
  }
}
```

<api>`GET /v1/middleware/processors/{processorId}`</api>

Individual [message processors](#processor-schema) can be fetched using this API.

## Update Processor

> Request:

```shell
curl https://api.smooch.io/v1/middleware/processors/57601a3205d8542a65baef2e \
     -X PUT \
     -d '{"target": "https://my-server.com/otherpath"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

```js
// not implemented yet
```

> Response:

```
200 OK
```
```json
{
  "processor": {
    "target": "https://my-server.com/otherpath",
    "secret": "a9283d25460bc79eaf3b91098a526f6db036da0e",
    "_id": "577284eccf0801526d6930e7"
  }
}
```

<api>`PUT /v1/middleware/processors/{processorId}`</api>

Update a [message processor](#processor-schema) to point at a new target.

| **Arguments**             |   |
|---------------------------|---|
| **target**<br/><span class='req'>required</span> | URL to be called when the processor is triggered. |

## Delete Processor

> Request:

```shell
curl https://api.smooch.io/v1/middleware/processors/577284eccf0801526d6930e7 \
     -X DELETE \
     -H 'authorization: Bearer your-jwt'
```
```js
// not implemented yet
```

> Response:

```
200 OK
```

<api>`DELETE /v1/processors/{processorId}`</api>

Deletes the specified [message processor](#processor-schema).

## Processor Schema

| Field | Description |
|-------|--------|----------------------------------------------------------|
| **_id**  | A canonical ID that can be used to retrieve the processor or place it in a pipeline. |
| **target** |  URL to be called when the processor is triggered. |
| **secret** | A secret, provided in the `X-API-Key` header of HTTP callbacks to the target, to determine the veracity of a request. |
