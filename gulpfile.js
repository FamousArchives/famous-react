'use strict';

var http = require('http');
var path = require('path');

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var lr = require('gulp-livereload');
var cached = require('gulp-cached');
var deploy = require('gulp-gh-pages');

var merge = require('merge-stream');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var ecstatic = require('ecstatic');
var reactify = require('reactify');
var deamdify = require('deamdify');

var paths = {
  js: 'src/**/*.js'
};

var bundleCache = {};
var pkgCache = {};

var bundler = watchify(browserify('./src/index.js', {
  cache: bundleCache,
  packageCache: pkgCache,
  fullPaths: true,
  standalone: 'famous-react',
  debug: true
}));
bundler.transform(reactify);
bundler.transform(deamdify);

var sampleBundler = watchify(browserify('./samples/sandbox/src/index.js', {
  cache: bundleCache,
  packageCache: pkgCache,
  fullPaths: true,
  standalone: 'sample',
  debug: true
}));
sampleBundler.transform(reactify);
sampleBundler.transform(deamdify);

gulp.task('watch', function(){
  bundler.on('update', function(){
    gulp.start('js');
  });
  sampleBundler.on('update', function(){
    gulp.start('samples');
  });
});

gulp.task('js', function(){
  var browserifyStream = bundler.bundle()
    // browserify -> gulp transfer
    .pipe(source('famous-react.js'))
    .pipe(buffer())
    .pipe(cached('js'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));

  var lintStream = gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

  return merge(browserifyStream, lintStream);
});

gulp.task('samples', function(){
  var browserifyStream = sampleBundler.bundle()
    // browserify -> gulp transfer
    .pipe(source('sample.js'))
    .pipe(buffer())
    .pipe(cached('samples'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('samples/sandbox/dist'))
    .pipe(lr());

  var staticStream = gulp.src(['samples/sandbox/src/**/*', '!samples/sandbox/src/**/*.js'])
    .pipe(cached('static-samples'))
    .pipe(gulp.dest('samples/sandbox/dist'));

  return merge(staticStream, browserifyStream);
});

gulp.task('sample-server', function(cb){
  var port = parseInt(process.env.PORT) || 9090;
  var rootFolder = path.join(__dirname, './samples/sandbox/dist');
  var server = http.createServer(ecstatic({root: rootFolder}));
  server.listen(port, cb);
});

gulp.task('deploy', function(){
  return gulp.src('./samples/sandbox/dist/**/*')
    .pipe(deploy());
});

gulp.task('default', ['js', 'samples', 'sample-server', 'watch']);
