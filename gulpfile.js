var gulp = require('gulp');
var browserify = require('gulp-browserify');

// Basic usage
gulp.task('build', function() {
    // Single entry point to browserify
    gulp.src('src/phoneinput.js')
        .pipe(browserify({
          standalone : 'phoneinput',
        }))
        .pipe(gulp.dest('./build'))
});

gulp.task('bundle-tests', function() {
  gulp.src('test/*.js')
      .pipe(browserify())
      .pipe(gulp.dest('./test_bundle'))
});

gulp.task('test', function() {
  return gulp.src('test/*.js', {read: false})
      .pipe(mocha({
        debug: true,
      }));
});
