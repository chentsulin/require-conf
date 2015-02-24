# require-conf

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> require config file via NODE_ENV

## Install

```sh
$ npm install require-conf
```

## API

`fn(directory, options)`

#### options

- dir: boolean

Set mode between normal mode and directory mode. default: false.

## Usage

#### Normal Mode

In production:

```js
// NODE_ENV=production
var loader = require('require-conf');

var config = loader(__dirname + '/config');

var appConfig = config.load('app');
// => ./config/app.js
```

In other environment:

```js
// NODE_ENV=development
var loader = require('require-conf');

var config = loader(__dirname + '/config');

var appConfig = config.load('app');
// => ./config/development.app.js
```

#### Directory Mode

In production:

```js
// NODE_ENV=production
var loader = require('require-conf');

var config = loader(__dirname + '/config', { dir: true });

var appConfig = config.load('app');
// => ./config/app.js
```

In other environment:

```js
// NODE_ENV=development
var loader = require('require-conf');

var config = loader(__dirname + '/config', { dir: true });

var appConfig = config.load('app');
// => ./config/development/app.js
```

## License
MIT © [C. T. Lin](https://github.com/chentsulin)

[npm-image]: https://img.shields.io/npm/v/require-conf.svg?style=flat-square
[npm-url]: https://npmjs.org/package/require-conf
[travis-image]: https://travis-ci.org/chentsulin/require-conf.svg
[travis-url]: https://travis-ci.org/chentsulin/require-conf
