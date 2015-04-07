'use strict';

var gulp = require('gulp')
  , path = require('path')
  , lint = require('gulp-eslint')

var options = { };

// LINT <<
options.eslint = {
  configFile: path.join(__dirname, '.eslintrc')
};

gulp.task('lint', function() {
  var strm =
    gulp.src([ 'src/*.js', 'test/*.js' ])
      .pipe(lint(options.eslint))
      .pipe(lint.format());
});

// >>
