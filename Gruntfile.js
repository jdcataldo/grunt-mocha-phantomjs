/*
 * grunt-mocha-phantomjs
 * https://github.com/jdcataldo/grunt-mocha-phantomjs
 *
 * Copyright (c) 2013 Justin Cataldo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    eslint: {
      all: ['Gruntfile.js', 'tasks/*.js', 'test/*.js']
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },
    mocha_phantomjs: {
      no_output: {
        options: {
          reporter: 'dot'
        },
        files: {
          src: ['test/index.html']
        }
      },
      output: {
        options: {
          reporter: 'xunit',
          output: 'results/result.xml'
        },
        files: {
          src: ['test/index.html']
        }
      },
      grep: {
        options: {
          reporter: 'dot',
          config: {
            grep: 'not'
          }
        },
        files: {
          src: ['test/index.html']
        }
      },
      viewport: {
        options: {
          reporter: 'dot',
          config: {
            viewportSize: {
              width: 1024,
              height: 768
            }
          }
        },
        files: {
          src: ['test/index.html']
        }
      },
      phantomConfig: {
        options: {
          phantomConfig: {
            '--debug': true
          }
        },
        files: {
          src: ['test/index.html']
        }
      },
      silent: {
        options: {
          reporter: 'xunit',
          output: 'results/results_silent.xml',
          silent: true
        },
        files: {
          src: ['test/index.html']
        }
      },
      server: {
        options: {
          urls: ['http://localhost:8000/test/index.html'],
          reporter: 'dot'
        }
      },
      coverage: {
        options: {
          urls: ['http://localhost:8000/test-cov/index.html'],
          reporter: 'json-cov',
          output: 'results/coverage.json'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['eslint', 'connect', 'mocha_phantomjs']);
};
