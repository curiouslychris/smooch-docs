# Securing a Processor

When a processor is created, a shared secret will be generated for it. The secret can be used to determine the veracity of a request to your processor route. It is included as an `X-API-Key` header with each processor request sent to the target URL.

That secret is available in the response to the POST request used to generate the processor, or through a GET request to the processor route.
