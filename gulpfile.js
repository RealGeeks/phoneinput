var gulp = require('gulp');
var browserify = require('browserify');
var connect = require('gulp-connect');
var source = require('vinyl-source-stream');
var mocha = require('gulp-mocha');
var exit = require('gulp-exit');

// Basic usage
gulp.task('build', function() {
    // Single entry point to browserify
    browserify({
      standalone: 'phoneinput',
      entries: './src/phoneinput.js'
    })
    .bundle()
    .pipe(source('phoneinput.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('serve', function() {
  connect.server();
});

gulp.task('test', function() {
  connect.server();
  gulp.src('./test/test.js')
    .pipe(mocha())
    .pipe(exit());
});
