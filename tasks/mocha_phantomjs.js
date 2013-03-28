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
      EventEmitter = require('events').EventEmitter;

  var asset = path.join.bind(null, __dirname, '..');

  grunt.registerMultiTask('mocha_phantomjs', 'Run client-side mocha test with phantomjs.', function() {
    // Merge options
    var options = this.options({
          // Default phantom js timeout
          timeout: 5000,
          // Non file urls to test
          urls: []
        }),
        files   = this.filesSrc,
        args    = [],
        phantomjs_path = path.join(__dirname, '..', '/node_modules/.bin/mocha-phantomjs'),
        urls = options.urls.concat(this.filesSrc);

    // Loop through the options and add them to args
    _.each(options, function(value, key) {
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