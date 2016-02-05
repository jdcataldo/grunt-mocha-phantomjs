## 3.0.0
- upgrades to phantomjs2
- drops node 0.10.x support
## 2.0.1 (2016-03-05)
- adds a phantomConfig option for setting phantomjs specific settings
## 2.0.0 (2015-09-02)
- adds a failWithOutput option for failing a build and also providing a test artifact
## 1.0.2 (2015-08-09)
- Fix path to phantomjs binary on windows
## 1.0.1 (2015-08-09)
- Fix issue when using --color=false
## 1.0.0 (2015-07-16)
- *BREAKING* use mocha-phantomjs-core
## 0.7.0 (2015-07-16)
- Upgrade mocha-phantomjs to 3.6.0
## 0.6.2 (2015-07-15)
- Lock down phantomjs to match mocha-phantomjs peerDependency
## 0.6.1 (2015-02-26)
- Add silent option to suppress stdout
## 0.6.0 (2014-07-24)
- Upgrade mocha-phantomjs to 3.5.0 and drops node 0.8 support
## 0.5.0 (2014-05-08)
- Upgrade mocha-phantomjs to 3.4.0
## 0.4.3 (2014-03-01)
- Add lodash and async as dependencies
## 0.4.2 (2014-02-18)
- Fix to prevent the stream from closing
## 0.4.1 (2014-02-18)
- Pipe stdout to a file if supplied
## 0.4.0 (2014-01-14)
- Upgrade mocha-phantomjs to 3.3.0
## 0.3.2 (2013-10-31)
- Upgrade mocha-phantomjs to 3.2.0
## 0.3.1 (2013-10-31)
- Added support for --no-color
## 0.3.0 (2013-07-05)
- Upgrade mocha-phantomjs to 3.1.0
## 0.2.8 (2013-04-19)
- Fix path to mocha-phantomjs binary on windows when not installed with plugin
## 0.2.7 (2013-04-19)
- Fixes error thrown when tests pass and no output file specified
## 0.2.6 (2013-04-18)
- Fix path to mocha-phantomjs binary on windows
## 0.2.5 (2013-04-18)
- Added an output option to write test results to a file for CI support
## 0.2.2 (2013-04-15)
- Added exit code to report failed tests with Travis CI
## 0.2.1 (2013-04-11)
- Added check for existing local install of mocha-phantomjs
## 0.2.0 (2013-04-08)
- Update phantomjs to 1.9.0 to fix unzipping issue
## 0.1.1 (2013-03-27)
- Fix to omit urls from being passed to phantomjs
## 0.1.0 (2013-03-27)
- Initial release supporting all options for mocha-phantomjs
