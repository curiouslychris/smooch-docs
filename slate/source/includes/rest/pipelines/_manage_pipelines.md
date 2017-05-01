# Manage Pipelines

<aside class="warning">These endpoints are currently in BETA and have not been wrapped in Swagger or native libraries yet. They are currently only available via HTTP call to the REST API.</aside>

These endpoints are used to manage pipelines. You can add or remove processors to a pipeline by making requests to [update pipeline](#update-pipeline) specifying the entire contents of the pipeline in each call.

the _appuser-message_ pipeline is currently the only available pipeline.

## Get Pipelines

> Request:

```shell
curl https://api.smooch.io/v1/middleware/pipelines \
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
  "pipelines": {
    "appuser-message": [
      "577284eccf0801526d6930e7"
    ]
  }
}
```

<api>`GET /v1/middleware/pipelines`</api>

Get the [pipelines](#pipelines-schema) configured for a given app.

## Update Pipeline

> Request:

```shell
curl https://api.smooch.io/v1/middleware/pipelines/appuser-message \
     -X PUT \
     -d '["5772856acf0801526d6930e8", "577284eccf0801526d6930e7"]' \
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
  "pipeline": [
    "5772856acf0801526d6930e8",
    "577284eccf0801526d6930e7"
  ]
}
```

<api>`PUT /v1/middleware/pipelines/{pipelineName}`</api>

The caller specifies an ordered set of processor ids for the appuser-message pipeline.


| **Arguments**             |
|---------------------------|
| Simply provide an ordered array of processor IDs |

## Pipelines Schema

Each pipeline is an ordered set of ids, representing objects stored under the processors field. The key appuser-message specifies that this pipeline is executed in response to an app user message.

| Field | Description |
|-------|--------|----------------------------------------------------------|
| **appuser-message**  | An array of message [processors](#processor-schema), to be triggered in order when an appuser message event occurs. |
