# require-conf

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Quality][codeclimate-image]][codeclimate-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david_img]][david_site]

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
// => ./config/app.development.js
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
[codeclimate-image]: https://img.shields.io/codeclimate/github/chentsulin/require-conf.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/chentsulin/require-conf
[coveralls-image]: https://img.shields.io/coveralls/chentsulin/require-conf.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/chentsulin/require-conf
[david_img]: https://img.shields.io/david/chentsulin/require-conf.svg
[david_site]: https://david-dm.org/chentsulin/require-conf
