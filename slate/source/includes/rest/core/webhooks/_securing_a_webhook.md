## Securing a webhook

When a webhook is created, a shared secret will be generated for it. The secret can be used to determine the veracity of a request to your webhook route. It is included as an `X-API-Key` header with each webhook request sent to the target URL.

That secret is available in the response to the POST request used to generate the webhook, or through a GET request to the webhook route.
