const autoprefixer = require('autoprefixer');
const spawn = require('child_process').spawn;
const del = require('del');
const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const zip = require('gulp-zip');
const path = require('path');

gulp.task('clean', async() => {
  return del([
    'dist/**/*',
  ]);
});

gulp.task('styles', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on("error", sass.logError))
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', () => {
  return gulp.src('src/scripts/**/*.js')
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-files', () => {
  return gulp.src([
    'src/{assets,settings,templates,translations}/**/*',
    'src/manifest.json',
    '.zat',
  ])
    .pipe(gulp.dest('dist'));
});

gulp.task('update-build', gulp.parallel('styles', 'scripts', 'copy-files'));

gulp.task('build', gulp.series('clean', 'update-build'));

let previewTask;

gulp.task('preview:start', (cb) => {
  previewTask = spawn('zat', [
    'theme',
    'preview',
  ], {
    cwd: path.resolve('./dist'),
  });

  previewTask.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  previewTask.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  })

  previewTask.on('close', code => code ? cb(new Error(code)) : cb());
});

gulp.task('preview:stop', (cb) => {
  previewTask.stdin.pause();
  previewTask.kill();
  previewTask = undefined;
  cb();
});

gulp.task('watch', () => {
  gulp.watch(
    [
      'src/**/*',
    ],
    gulp.series('preview:stop', 'update-build', gulp.parallel('preview:start', 'watch'))
  );
});

gulp.task('zip', () => {
  return gulp
    .src('dist/**')
    .pipe(zip('theme.zip'))
    .pipe(gulp.dest('.'))
});

gulp.task('package', gulp.series('build', 'zip'));

gulp.task(
  'develop',
  gulp.series(
    'build',
    gulp.parallel(
      'preview:start',
      'watch'
    )
  )
);
