'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var gif = require('gulp-if');
var lr = require('gulp-livereload');

var merge = require('merge-stream');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');

var paths = {
  js: 'src/**/*.js',
  samples: ['src/**/*.js', 'samples/sandbox/src/**/*']
};

var bundleCache = {};
var bundler = watchify('./src/index.js', {cache: bundleCache});
var sampleBundler = watchify('./samples/sandbox/src/index.js', {cache: bundleCache});

gulp.task('watch', function(){
  bundler.on('update', function(){
    gulp.start('js');
  });
  sampleBundler.on('update', function(){
    gulp.start('samples');
  });
});

gulp.task('js', function(cb){
  return cb();
  var browserifyStream = bundler.bundle({
    standalone: 'famous-react',
    debug: true,
    insertGlobals: true
  })
    // browserify -> gulp transfer
    .pipe(source('famous-react.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())

    // resume our actual work
    .pipe(gulp.dest('dist'))
    .pipe(lr())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({
      compress: {
        drop_console: true,
        unsafe: true
      }
    }))
    .pipe(gulp.dest('dist'))
    .pipe(lr());

  var lintStream = gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

  return merge(browserifyStream, lintStream);
});

gulp.task('samples', function(){
  var browserifyStream = sampleBundler.bundle({
    standalone: 'sample',
    debug: true,
    insertGlobals: true
  })
    // browserify -> gulp transfer
    .pipe(source('sample.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('samples/sandbox/dist'))
    .pipe(lr());

  var staticStream = gulp.src(['samples/sandbox/src/**/*', '!samples/sandbox/src/**/*.js'])
    .pipe(gulp.dest('samples/sandbox/dist'))
    .pipe(lr());

  return merge(staticStream, browserifyStream);
});

gulp.task('default', ['js', 'samples', 'watch']);
