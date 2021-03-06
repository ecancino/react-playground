'use strict';

var gulp = require('gulp'),
  clean = require('del'),
  jade = require('gulp-jade'),
  browserify = require('gulp-browserify'),
  //uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  //minify = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  webserver = require('gulp-webserver');

gulp.task('clean', function () {
  return clean([ './tmp' ]);
});

gulp.task('jade', function () {
  return gulp.src('./src/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public'));
});

gulp.task('jsx', function () {
  return gulp.src('./src/app.jsx')
    .pipe(browserify({
      extensions: [ '.js', '.jsx' ],
      transform: [ 'babelify' ],
      debug: true
    }))
    .pipe(gulp.dest('./tmp'))
    .pipe(rename({suffix: '.min', extname: '.js'}))
    //.pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('scss', function () {
  return gulp.src('./src/*.scss')
    .pipe(sass({
      includePaths: [
        './node_modules/materialize-css/sass/materialize.scss'
      ]
    }))
    .pipe(gulp.dest('./tmp'))
    .pipe(rename({suffix: '.min'}))
    //.pipe(minify({keepSpecialComments: 0}))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('fonts', function () {
  return gulp.src('./node_modules/materialize-css/font/roboto/*.ttf')
    .pipe(gulp.dest('./public/font/roboto'));
});

gulp.task('build', ['clean', 'jade', 'jsx', 'scss', 'fonts'], function(cb) {
  cb();
});

gulp.task('watch', function (cb) {
  gulp.watch('./src/index.jade', ['jade']);
  gulp.watch([ './src/*/*.jsx', './src/*/*.js' ], ['jsx']);
  gulp.watch('./src/*.scss', ['scss']);
  cb();
});

gulp.task('serve', function () {
  return gulp.src('./public')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: 'index.html'
    }));
});

gulp.task('default', ['watch', 'serve', 'build'], function () {
  console.log('Gulp and running!');
});
