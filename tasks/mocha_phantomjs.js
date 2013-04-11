/*
 * grunt-mocha-phantomjs
 * https://github.com/jdcataldo/grunt-mocha-phantomjs
 *
 * Copyright (c) 2013 Justin Cataldo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var util    = grunt.util,
      // Alias for Lo-Dash
      _       = util._,
      path = require("path"),
      exists = grunt.file.exists;

  grunt.registerMultiTask('mocha_phantomjs', 'Run client-side mocha test with phantomjs.', function() {
    // Merge options
    var options = this.options({
          reporter: 'spec',
          // Non file urls to test
          urls: []
        }),
        files   = this.filesSrc,
        args    = [],
        binPath = 'mocha-phantomjs/bin/mocha-phantomjs',
        phantomjs_path = path.join(__dirname, '..', '/node_modules/', binPath),
        urls = options.urls.concat(this.filesSrc);

    // Check for a local install of mocha-phantomjs to use
    if (!exists(phantomjs_path)) {
      var i = module.paths.length,
          bin;
      while(i--) {
        bin = path.join(module.paths[i], binPath);
        if (exists(bin)) {
          phantomjs_path = bin;
          break;
        }
      }
    }

    if(!exists(phantomjs_path)) {
      grunt.fail.warn('Unable to find mocha-phantomjs.');
    }

    // Loop through the options and add them to args
    // Omit urls from the options to be passed through
    _.each(_.omit(options, 'urls'), function(value, key) {
      // Convert to the key to a switch
      var sw = (key.length > 1 ? '--' : '-') + key;
      // Add the switch and its value
      // If the value is an array, add all array elements to the array.
      if(!_.isArray(value)) {
        value = [value];
      }
      
      _.each(value, function(value) {
        args.push([sw, value.toString()]);
      });
    });

    util.async.forEachSeries(urls, function(f, next) {
      grunt.util.spawn({
        cmd: phantomjs_path,
        args: _.flatten([f].concat(args)),
        opts: {stdio: 'inherit'}
      }, function(error, result) {
        next();
      });
    }, this.async());
  });

};