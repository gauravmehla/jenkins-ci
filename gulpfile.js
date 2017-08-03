var gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    jshint          = require('gulp-jshint'),
    browserify      = require('gulp-browserify'),
    concat          = require('gulp-concat');

// JSHint task
gulp.task('lint', function() {
  gulp.src('./app/*.js')
  .pipe(jshint())
  .on('error', gutil.log)
  // You can look into pretty reporters as well, but that's another story
  .pipe(jshint.reporter('default'));
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['app/index.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .on('error', gutil.log)
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('dist/js'));
});


gulp.task('index', function(){
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'))
});


// Main task
gulp.task('default',['index','lint', 'browserify']);