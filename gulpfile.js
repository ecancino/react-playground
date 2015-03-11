'use strict';

var gulp = require('gulp'),
  clean = require('gulp-clean'),
  jade = require('gulp-jade'),
  browserify = require('gulp-browserify'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  minify = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  webserver = require('gulp-webserver');


gulp.task('clean', function () {
  return gulp.src([ './tmp', './public/*' ], { read: false })
    .pipe(clean());
});

gulp.task('jade', function () {
  return gulp.src('./src/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public'));
});

gulp.task('jsx', function () {
  return gulp.src('./src/app.jsx')
    .pipe(browserify({
      extensions: [ '.jsx' ],
      transform: [ 'babelify' ]
    }))
    .pipe(gulp.dest('./tmp'))
    .pipe(rename({suffix: '.min', extname: '.js'}))
    .pipe(uglify())
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
    .pipe(minify({keepSpecialComments: 0}))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('fonts', function () {
  return gulp.src('./node_modules/materialize-css/font/roboto/*.ttf')
    .pipe(gulp.dest('./public/font/roboto'));
});

gulp.task('build', ['clean', 'jade', 'jsx', 'scss', 'fonts', 'clean']);

gulp.task('watch', function () {
  gulp.watch('./src/index.jade', ['jade']);
  gulp.watch('./src/*.jsx', ['jsx']);
  gulp.watch('./src/*.scss', ['scss']);
});

gulp.task('serve', function () {
  return gulp.src('./public')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: 'http://localhost:8000/index.html'
    }));
});

gulp.task('default', ['build', 'watch', 'serve'], function () {
  console.log('Gulp and running!');
});
