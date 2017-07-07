## Retry Policy

A webhook call will be reattempted up to 5 times at an exponentially increasing interval if the target responds with anything but a success (2XX) or a [non-recoverable error](#non-recoverable-errors).
If no response is received within 20 seconds, the call will be considered a failure and will also be reattempted.

### Non-recoverable Errors

The following status codes are deemed to be non-recoverable and Smooch will not reattempt a call when receiving a response with them:

- 400: The target exists, but can’t process the payload
- 401: The target is behind authentication or doesn't recognize the webhook secret
- 403: Smooch should not be calling the target
- 404: The target doesn't exist
- 406: The target exists, and rejected webhook intentionally
