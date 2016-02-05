# grunt-mocha-phantomjs

> A simple wrapper to run client-side mocha tests using [mocha-phantomjs](http://metaskills.net/mocha-phantomjs/) core library

[![Build Status](https://travis-ci.org/jdcataldo/grunt-mocha-phantomjs.svg?branch=master)](https://travis-ci.org/jdcataldo/grunt-mocha-phantomjs)
[![Downloads](https://img.shields.io/npm/dm/grunt-mocha-phantomjs.svg)](https://www.npmjs.com/package/grunt-mocha-phantomjs)

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mocha-phantomjs --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mocha-phantomjs');
```

## The "mocha_phantomjs" task

_Run this task with the `grunt mocha_phantomjs` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

[PhantomJS][] is installed when installing using NPM.

[PhantomJS]: http://www.phantomjs.org/

### Options

#### reporter
Type: `String`  
Default: `spec`

The reporter that should be used. See [the supported reporters](https://github.com/metaskills/mocha-phantomjs#supported-reporters) for more information.

#### output
Type: `String`  

The file that the task should output the results to. If `output` is specified, the task will always complete and not throw an error code if errors are found. The CI will determine if the build failed or not.

#### failWithOutput
Type: `Boolean`  

Setting `failWithOutput` to true when used with the `output` option will fail a build along with creating a test artifact. This is useful for CIs (CircleCI) that don't fail a build based on the test artifact.

#### silent
Type: `Boolean`  

Setting `silent` to true will prevent the results from being printed using stdout.

#### urls
Type: `Array`  
Default: `[]`

Absolute `http://` or `https://` urls to be passed to PhantomJS. Specified URLs will be merged with any specified `src` files first. Note that urls must be served by a web server, and since this task doesn't contain a web server, one will need to be configured separately. The [grunt-contrib-connect plugin](https://github.com/gruntjs/grunt-contrib-connect) provides a basic web server.

Additional arguments may be passed. See [mocha-phantomjs's](https://github.com/metaskills/mocha-phantomjs#usage) usage.

#### phantomConfig
Type: `Object`
Default: `{}`

Options to be passed directly to phantomjs. Eg:

```js
{
    "--local-storage-path": "my/temp-phantom-files",
    "--local-storage-quota": "20480"
}
```

See `phantomjs -h` for more full options list.

#### config
Type: `Object`  
Default: `{ useColors: true }`

Options to be passed to mocha-phantomjs. See [mocha-phantomjs-core's](https://github.com/nathanboktae/mocha-phantomjs-core#usage) usage.

### Usage examples

#### Basic usage (CI checks for error code)

```js
// Project configuration.
grunt.initConfig({
  mocha_phantomjs: {
    all: ['test/**/*.html']
  }
});
```

#### File output for CI

```js
// Project configuration.
grunt.initConfig({
  mocha_phantomjs: {
    options: {
      reporter: 'xunit',
      output: 'tests/results/result.xml'
    },
    all: ['test/**/*.html']
  }
});
```

#### Passing options to mocha-phantomjs

```js
// Project configuration.
grunt.initConfig({
  mocha_phantomjs: {
    options: {
      reporter: 'xunit',
      output: 'tests/results/result.xml',
      config: {
        useColors: false,
        viewportSize: {
            width: 1024,
            height: 768
        },
        grep: 'pattern'
      }
    },
    all: ['test/**/*.html']
  }
});
```

#### Local server
Include the [grunt-contrib-connect plugin][] to run a local server
[grunt-contrib-connect plugin]: https://github.com/gruntjs/grunt-contrib-connect

```js
// Project configuration.
grunt.initConfig({
  mocha_phantomjs: {
    all: {
      options: {
        urls: [
          'http://localhost:8000/test/foo.html',
          'http://localhost:8000/test/bar.html'
        ]
      }
    }
  },
  connect: {
      server: {
        options: {
          port: 8000,
          base: '.',
        }
      }
    }
});

grunt.registerTask('test', ['connect', 'mocha_phantomjs']);
```

### Notes
This is a very basic implementation of mocha-phantomjs. Failed tests and errors do not bubble up for custom reporting. The idea of this is to be mainly used by a CI and let the CI manage the error reporting.
