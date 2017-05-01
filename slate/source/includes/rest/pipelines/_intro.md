# Introduction

The Pipelines API can be used to attach additional metadata, or block delivery of appUser messages.

Among any number of other things, this functionality can be used to provide automatic translation and analysis of messages, or blacklist abusive users.

### Overview

A pipeline is a series of message processors that are synchronously applied to appUser messages before they become part of Smooch's conversation record.

A message processor is simply a URL defined by you, that receives HTTP callback events from Smooch when an appUser sends a message. Delivery of the message, and continuation to the next processor in the pipeline is blocked until you call a continue endpoint.

You can attach additional metadata to the message during the continue call.

If the continue endpoint is not called within 5 minutes the message will not be delivered to any business systems, and any webhooks you have configured will not fire HTTP callback events.
