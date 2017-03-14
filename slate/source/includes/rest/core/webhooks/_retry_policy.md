## Retry Policy

If a webhook target responds with anything other than a 2xx status code, or if no response is received within 5 seconds, the call will be reattempted up to 5 times at an exponentially increasing interval.
