var gulp = require('gulp');
var browserify = require('gulp-browserify');
var mocha = require('gulp-mocha');

// Basic usage
gulp.task('build', function() {
    // Single entry point to browserify
    gulp.src('src/phoneinput.js')
        .pipe(browserify({
          standalone : 'phoneinput',
        }))
        .pipe(gulp.dest('./build'))
});

gulp.task('test', function() {
  return gulp.src('test/*.js', {read: false})
      .pipe(mocha({
        debug: true,
      }));
});
