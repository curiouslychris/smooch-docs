---
title: API Libraries
section: guide
layout: two-column
---

# API Libraries

Smooch provides official API libraries for Javascript, Ruby, Python and Java. Those helpful libraries wraps calls to the [Smooch REST API](https://docs.smooch.io/rest/).

## Javascript
Available via [npm](https://www.npmjs.com/package/smooch-core):

`npm install smooch-core --save`

Note that smooch-core works for both Node.js and in a web browser environment

Check out [the package's docs](https://github.com/smooch/smooch-core-js) for the list of methods. The source for this package is also avaible in the [GitHub](https://github.com/smooch/smooch-core-js) repo.


## Ruby
Available as a [gem](https://rubygems.org/gems/smooch-api):

`sudo gem install smooch-api`

If you use bundler, you can add this line to your Gemfile

`gem 'smooch-api', '~> 1.2.0'`

Check out [the package's docs](https://github.com/smooch/smooch-ruby) for the list of methods. The source for this package is also avaible in the [GitHub](https://github.com/smooch/smooch-ruby) repo.

## Python
Available through [pip](https://pypi.org/project/smooch/):

`pip install smooch`

Check out [the package's docs](https://github.com/smooch/smooch-python) for the list of methods. The source for this package is also avaible in the [GitHub](https://github.com/smooch/smooch-python) repo.

## Java

For [Maven](https://maven.apache.org/), add the following dependency to your project's POM:
```
<dependency>
    <groupId>io.smooch</groupId>
    <artifactId>api</artifactId>
    <version>1.2.0</version>
    <scope>compile</scope>
</dependency>
```

For [Gradle](https://gradle.org/), add this dependency to your project's build file

`compile "io.smooch:api:1.2.0"`

Check out [the package's docs](https://github.com/smooch/smooch-java) for the list of methods. The source for this package is also avaible in the [GitHub](https://github.com/smooch/smooch-java) repo.
