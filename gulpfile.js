var gulp = require("gulp"),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    partialify = require('partialify'),
    minify_css = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');


var vendors = {
  styles: [
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/angular-growl-v2/build/angular-growl.min.css',
  ],
  fonts: [
    'node_modules/bootstrap/dist/fonts/*'
  ]
};

var app = {
  styles: [
    "app/css/*.css"
  ],
  scripts: [
    "app/js/**/*.js",
    "app/js/**/*.html"
  ]
};

gulp.task('app:scripts', function() {
  gulp.src(['app/js/app.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true,
    transform: [partialify]
  }))
  // Bundle to a single file
  .pipe(concat('app.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('public'));
});

gulp.task('app:styles', function () {
  gulp.src(app.styles)
    .pipe(concat("style.css"))
    .pipe(minify_css())
    .pipe(gulp.dest('public'));
});

gulp.task('vendors:styles', function () {
  gulp.src(vendors.styles)
    .pipe(concat('vendors.css'))
    .pipe(minify_css())
    .pipe(gulp.dest('public'));
});

gulp.task('vendors:fonts', function () {
  gulp.src(vendors.fonts)
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('build', ['app:scripts'], function() {
  gulp.src(['app.js'], {cwd: 'public'})
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('public'));
});

gulp.task('styles', ['app:styles', 'vendors:styles', 'vendors:fonts']);
gulp.task('default', ['build', 'styles']);


gulp.task('watch', ["default"], function() {
  gulp.watch(app.styles, ['app:styles']);
  gulp.watch(app.scripts, ['build']);
});
