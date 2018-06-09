const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

gulp.task('img',()=>{
  gulp.src('./src/images/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/images/'))
  .pipe(browserSync.stream());
});

gulp.task('html',()=>{
  gulp.src('./src/*.html')
  .pipe(gulp.dest('./dist/'))
  .pipe(browserSync.stream());
})

gulp.task('css',()=>{
  gulp.src('./src/styles/**/*.css')
  .pipe(cleanCSS())
  .pipe(gulp.dest('./dist/styles/'))
  .pipe(browserSync.stream());
});

gulp.task('js',()=>{
  gulp.src('./src/scripts/**/*.js')
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/scripts'))
  .pipe(browserSync.stream());
});

gulp.task('serve',['html','css','js','img'],()=>{

  browserSync.init({
    server: './dist/'
  });

  gulp.watch('./src/styles/*.css',['css']);
  gulp.watch('./src/scripts/*.js',['js']);
  gulp.watch('./src/images/*',['img']);
  gulp.watch('./src/*.html',['html']);
})

gulp.task('default',['serve']);
