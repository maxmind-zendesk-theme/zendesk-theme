const autoprefixer = require('autoprefixer');
// eslint-disable-next-line security/detect-child-process
const spawn = require('child_process').spawn;
const del = require('del');
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sass = require('gulp-dart-sass');
const inject = require('gulp-inject-string');
const postcss = require('gulp-postcss');
const posthtml = require('gulp-posthtml');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const zip = require('gulp-zip');
const merge = require('merge2');
const path = require('path');
const exp = require('posthtml-expressions');
const include = require('posthtml-include');

gulp.task('clean', async () => {
  return del([
    'dist/**/*',
  ]);
});

gulp.task('styles', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', () => {
  return merge(
    gulp.src('src/scripts/lib/**/*.js'),
    gulp.src([
      'src/scripts/**/*.js',
      '!src/scripts/lib',
    ]),
  )
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('templates:posthtml', () => {
  return gulp
    .src([
      'src/templates/*.hbs',
      '!src/templates/partials',
    ])
    .pipe(
      posthtml(
        [
          exp({
            delimiters: ['{{%', '%}}'],
            locals: {},
            unescapedDelimiters: ['{{{%', '%}}}'],
          }),
          include({
            root: 'src/templates/partials',
          }),
        ],
        {
          template: false,
        },
      ),
    )
    .pipe(gulp.dest('./dist/templates'));
});

gulp.task('templates:transform-header', () => {
  return gulp.src('dist/templates/header.hbs')
    .pipe(
      inject.replace(
        '<!-- GULP REPLACE - MAIN WRAPPER OPENING TAG -->',
        '<!-- GENERATED VIA GULP -->\n<div class="main-wrapper">',
      ),
    )
    .pipe(gulp.dest('dist/templates/'));
});

gulp.task('templates:transform-footer', () => {
  return gulp.src('dist/templates/footer.hbs')
    .pipe(
      inject.replace(
        '<!-- GULP REPLACE - MAIN WRAPPER CLOSING TAG -->',
        '<!-- GENERATED VIA GULP - Closes .main-wrapper from header template -->\n</div>',
      ),
    )
    .pipe(gulp.dest('dist/templates/'));
});

gulp.task('templates', gulp.series(
  'templates:posthtml',
  gulp.parallel('templates:transform-header', 'templates:transform-footer'),
));

gulp.task('copy-files', () => {
  return gulp.src([
    'src/{assets,settings,translations}/**/*',
    'src/manifest.json',
  ])
    .pipe(gulp.dest('dist'));
});

gulp.task('update-build', gulp.parallel(
  'styles',
  'scripts',
  'templates',
  'copy-files'),
);

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
  });

  previewTask.on('close', code => code ? cb(new Error(code)) : cb());
});

gulp.task('preview:stop', (cb) => {
  previewTask.stdin.pause();
  previewTask.kill();
  previewTask = undefined;
  cb();
});

gulp.task('watch', () => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  gulp.watch(
    [
      'src/**/*',
    ],
    gulp.series('preview:stop', 'update-build', gulp.parallel('preview:start', 'watch')),
  );
});

gulp.task('zip', () => {
  return gulp
    .src('dist/**')
    .pipe(zip('theme.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('package', gulp.series('build', 'zip'));

gulp.task(
  'develop',
  gulp.series(
    'build',
    gulp.parallel(
      'preview:start',
      'watch',
    ),
  ),
);
