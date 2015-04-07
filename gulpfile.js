'use strict';

var gulp = require('gulp')
  , path = require('path')
  , lint = require('gulp-eslint')

var project = {
  paths: {
    js: [
      'src/*.js'
    ]
  }
}

var options = { };

// LINT <<
options.eslint = {
  configFile: path.join(__dirname, '.eslintrc')
};

gulp.task('lint', function() {
  var strm =
    gulp.src(project.paths.js)
      .pipe(lint(options.eslint))
      .pipe(lint.format());
});

// >>
