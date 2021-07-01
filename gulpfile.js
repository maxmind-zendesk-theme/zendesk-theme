const gulp = require('gulp');
const spawn = require('child_process').spawn;

gulp.task('compile', (cb) => {
  const task = spawn('./bin/compile.rb', [], {})

  task.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  task.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  task.on('close', code => code ? cb(new Error(code)) : cb());
});


let previewTask;

gulp.task('preview:start', (cb) => {
  previewTask = spawn('zat', [
    'theme',
    'preview',
  ], {})

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

gulp.task('preview:restart', gulp.series('preview:stop', 'preview:start'));

gulp.task('watch', () => {
  gulp.watch(
    [
      'assets/**/*',
      'settings/**/*',
      'styles/**/*',
      'templates/**/*',
      'translations/**/*',
      'manifest.json',
      'script.js',
      'thumnail.png',
    ],
    gulp.series('compile', gulp.parallel('preview:restart', 'watch'))
  );
});

gulp.task(
  'default',
  gulp.series(
    'compile',
    gulp.parallel(
      'preview:start',
      'watch'
    )
  )
);
