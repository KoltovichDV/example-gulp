const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const server = require('browser-sync').create();
const del = require('del');

gulp.task('css', function() {
  return gulp
    .src('src/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('html', function() {
  return gulp
    .src('src/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('copy', function() {
  return gulp
    .src(
      [
        'src/fonts/**/*.{woff,woff2}',
        'src/img/**',
        'src/js/**',
        'src/*.ico'
      ],
      {
        base: 'src'
      }
    )
    .pipe(gulp.dest('build'));
});

gulp.task('refresh', function(done) {
  server.reload();
  done();
});

gulp.task('server', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('src/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('src/*.html', gulp.series('html', 'refresh'));
});

gulp.task('build', gulp.series('clean', 'copy', 'css', 'html'));
gulp.task('start', gulp.series('build', 'server'));
