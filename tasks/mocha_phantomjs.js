/*
 * grunt-mocha-phantomjs
 * https://github.com/jdcataldo/grunt-mocha-phantomjs
 *
 * Copyright (c) Justin Cataldo <jdcataldo@gmail.com>
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  var objectAssign = require('object-assign'),
      async        = require('async'),
      path         = require('path'),
      fs           = require('fs'),
      lookup       = function (script, executable) {
        var i = 90,
            absPath;

        for (i = 0; i < module.paths.length; i++) {
          absPath = path.join(module.paths[i], script);
          if (executable && process.platform === 'win32') {
            absPath += '.cmd';
          }
          if (fs.existsSync(absPath)) {
            return absPath;
          }
        }
        grunt.fail.warn('Unable to find ' + script);
      },
      flatten       = function (arr) {
        var flattened = [];
        return flattened.concat.apply(flattened, arr);
      };

  function objectToArgArray (obj) {
    var key,
        args = [];

    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        args.push(key + '=' + obj[key]);
      }
    }
    return args;
  }

  grunt.registerMultiTask('mocha_phantomjs', 'Run client-side mocha test with phantomjs.', function () {
    // Merge options
    var options          = this.options({
          reporter: 'spec',
          urls: [] // Non file urls to test
        }),
        config           = objectAssign({ useColors: true }, options.config),
        phantomPath      = lookup('.bin/phantomjs', true),
        phantomConfig    = objectToArgArray(options.phantomConfig || []),
        mochaPhantomPath = lookup('mocha-phantomjs-core/mocha-phantomjs-core.js'),
        urls             = options.urls.concat(this.filesSrc),
        done             = this.async(),
        errors           = 0,
        output           = options.output || false,
        failWithOutput   = options.failWithOutput || false,
        silent           = options.silent || false,
        reportFailure    = !output || (output && failWithOutput),
        writeStream;

    if (output) {
      grunt.file.mkdir(path.dirname(output));
      writeStream = fs.createWriteStream(output);
    }

    if (grunt.option('color') === false) {
      config.useColors = false;
    }

    async.eachSeries(urls, function (f, next) {
      var args,
          phantomjs;

      args = phantomConfig.concat(flatten([mochaPhantomPath, f, options.reporter, JSON.stringify(config)]));

      phantomjs = grunt.util.spawn({
        cmd: phantomPath,
        args: args
      }, function () {
        next();
      });

      if (!silent) {
        phantomjs.stdout.pipe(process.stdout);
        phantomjs.stderr.pipe(process.stderr);
      }

      // Write output to file
      if (output) {
        phantomjs.stdout.pipe(writeStream, { end: false });
      }

      phantomjs.on('exit', function (code) {
        if (code === 127) {
          grunt.fail.warn('Phantomjs isn\'t installed');
        }
        errors += code;
      });
    }, function () {
      // Fail if errors are reported and we aren't outputing to a file
      if (reportFailure && errors > 0) {
        grunt.fail.warn(errors + ' tests failed');
      }

      if (output) {
        writeStream.end();
      }

      done();
    });
  });
};
