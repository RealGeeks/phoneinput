var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var connect = require('gulp-connect');
var mocha = require('gulp-mocha');
var exit = require('gulp-exit');

// Basic usage
gulp.task('build', function() {
    // Single entry point to browserify
    gulp.src('./src/*.js')
      .pipe(uglify('phoneinput.min.js', {
        outSourceMap: true,
        mangle: false
      }))
      .pipe(gulp.dest('./dist'));

    gulp.src('./src/*.js')
      .pipe(gulp.dest('./dist'));
});

gulp.task('serve', function() {
  connect.server();
});

gulp.task('test', ['build'], function() {
  connect.server();
  gulp.src('./test/test.js')
    .pipe(mocha())
    .pipe(exit());
});
