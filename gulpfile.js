let gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('clean', async function() {
  del.sync('dist');
});

gulp.task('scss', function() {
  return gulp
    .src('src/scss/**/app.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 8 versions']
      })
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('css', function() {
  return gulp
    .src([
      'node_modules/normalize.css/normalize.css',
      'node_modules/slick-carousel/slick/slick.css'
    ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('src/scss'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('html', function() {
  return gulp.src('src/*.html').pipe(browserSync.reload({ stream: true }));
});

gulp.task('script', function() {
  return gulp.src('src/js/*.js').pipe(browserSync.reload({ stream: true }));
});


gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: 'src/'
    }
  });
});

gulp.task('export', function() {
  let buildHtml = gulp.src('src/**/*.html').pipe(gulp.dest('dist'));

  let BuildCss = gulp.src('src/css/**/*.css').pipe(gulp.dest('dist/css'));

  let BuildJs = gulp.src('src/js/**/*.js').pipe(gulp.dest('dist/js'));

  let BuildFonts = gulp.src('src/fonts/**/*.*').pipe(gulp.dest('dist/fonts'));

  let BuildImg = gulp.src('src/img/**/*.*').pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('src/*.html', gulp.parallel('html'));
  gulp.watch('src/js/*.js', gulp.parallel('script'));
});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task(
  'default',
  gulp.parallel('css', 'scss', 'browser-sync', 'watch')
);
