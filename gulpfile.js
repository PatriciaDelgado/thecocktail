var gulp = require('gulp'),
  compass = require('gulp-compass'),
  notify = require("gulp-notify"),
  templateCache = require('gulp-angular-templatecache'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  colors = require('colors'),
  cssmin = require('gulp-cssmin'),
  rename = require('gulp-rename'),
  cachebust = require('gulp-hash-cachebuster'),
  plumber = require('gulp-plumber')
  ;


var title = 'TheCocktail';

gulp.task('compass', function() {
  return gulp.src('sass/**/*.scss')
    .pipe(plumber({errorHandler: notify.onError({message: 'Commpass compile error', title: title})}))
    .pipe(compass({
      config_file: './config.rb'
    }))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('autoprefixer', function() {
  const autoprefixer = require('autoprefixer')
  const sourcemaps = require('gulp-sourcemaps')
  const postcss = require('gulp-postcss')

  return gulp.src('sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest'))
});


gulp.task('template-cache', function () {
  return gulp.src('views/**/*.html')
    .pipe(templateCache({
      module: 'eventance',
      root: 'views/'
    }))
    .pipe(gulp.dest('js/templates'));
});

gulp.task('minify', function(){
  return gulp.src([
    'js/**/*.js'
  ])
    .pipe(plumber({errorHandler: notify.onError({message: 'JS minify error', title: title})}))
    .pipe(concat('script.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('cachebreaker', function() {
  return gulp.src('./src/*.html')
    .pipe(cachebust())
    .pipe(gulp.dest('.'));
});



gulp.task('default', ['compass', 'template-cache', 'minify', 'cachebreaker'], function() {});

gulp.task('watch', function(){
  gulp.watch('sass/**/*.scss', ['compass', 'cachebreaker']);
  gulp.watch('js/**/*.js', ['template-cache', 'minify', 'cachebreaker']);
  gulp.watch('views/**/*.html', ['template-cache', 'minify', 'cachebreaker']);
});
