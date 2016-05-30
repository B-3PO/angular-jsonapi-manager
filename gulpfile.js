var gulp = require('gulp');
var jshint = require('gulp-jshint');
var flatten = require('gulp-flatten');
var gutil = require('gulp-util');
var inject = require('gulp-inject');
var gulpFilter = require('gulp-filter');
var concat = require('gulp-concat');
var del = require('del');
var runSequence = require('run-sequence');
var wrap = require("gulp-wrap");
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var stripDebug = require('gulp-strip-debug');
var serve = require('gulp-serve');



var BASE = 'src2/';
var paths = {
  scripts: [BASE + '*.js', BASE + '**/*.js'],
  clientScripts: ['!client2/modules/**/*.js', 'client2/app.js', 'client2/*.js', 'client2/**/*.js'],
  index: ['client2/index.html'],
  partials: ['client2/**/*.html'],
  css: ['client2/style.css']
};





gulp.task('default', function () {
  runSequence(
    'clean',
    ['build', 'serve', 'watch']
  );
});

gulp.task('serve', serve({
  root: ['public'],
  port: 8080
}));


// --- Clean Path -------
gulp.task('clean', function () {
  return del(['public/']);
});



// --- Release -------
gulp.task('release', function () {
  gulp.src([BASE + 'core.js', BASE + '*.js'])
    .pipe(stripDebug())
    .pipe(wrap('(function(){"use strict";<%= contents %>}());'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(concat('jsonapi-manager.js'))
    .pipe(gulp.dest('build/'))
    .pipe(uglify())
    .pipe(rename('jsonapi-manager.min.js'))
    .pipe(gulp.dest('build/'))
    .on('end', function () {
      gutil.log(gutil.colors.green('✔ Release'), 'Built');
    });
});





// --- Build ---------------------------


gulp.task('build', function () {

  gulp.src(['client2/angular/*.js'])
    .pipe(gulp.dest('public/angular/'))
    .on('end', function () {

      // biuld client
      gulp.src(paths.scripts.concat(paths.clientScripts))
        .pipe(wrap('(function(){"use strict";<%= contents %>}());'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(flatten())
        .pipe(gulp.dest('public/javascripts'))
        .on('end', function () {
          // copy partials
          gulp.src(paths.partials)
            .pipe(gulp.dest('public'));

          // stylesheets
          gulp.src(paths.css)
            .pipe(gulp.dest('public/stylesheets'));

          // modules
          gulp.src('client2/modules/**')
            .pipe(gulp.dest('public/modules'));

          // inject index
          gulp.src(paths.index)
            .pipe(inject(gulp.src(['public/javascripts/app.js', 'public/javascripts/core.js', 'public/javascripts/**/*.js'], {read: false}), {relative: true, ignorePath: '../public/'}))
            .pipe(gulp.dest('public'))
            .on('end', function () {
              gutil.log(gutil.colors.green('✔ Build'), 'Finished');
            });
          });
      });
});





// --- watcher --------------------------------


gulp.task('watch', function () {

  // copy partials
  gulp.watch(paths.partials, function (event) {
    gulp.src(event.path)
      .pipe(gulp.dest('public'))
      .on('end', function () {
        gutil.log(gutil.colors.green('✔ Partials Task'), 'Finished');
      });
  });


  // stylesheets
  gulp.watch(paths.css, function (event) {
    gulp.src(event.path)
      .pipe(gulp.dest('public/stylesheets'))
      .on('end', function () {
        gutil.log(gutil.colors.green('✔ CSS Task'), 'Finished');
      });
  });


  // JS
  gulp.watch(paths.scripts.concat(paths.clientScripts), function (event) {
    gulp.src(event.path)
      .pipe(wrap('(function(){"use strict";<%= contents %>}());'))

      // lint file
      .pipe(jshint())
      .pipe(jshint.reporter('default'))

      // save file to javascripts folder
      .pipe(flatten())
      .pipe(gulp.dest('public/javascripts'))
      .on('end', function () {
        gulp.src(paths.index)
          .pipe(inject(gulp.src(['public/javascripts/app.js', 'public/javascripts/core.js', 'public/javascripts/**/*.js'], {read: false}), {relative: true, ignorePath: '../public/'}))
          .pipe(gulp.dest('public'))
          .on('end', function () {
            gutil.log(gutil.colors.bold.green('✔ JS Task'), 'Finished');
          });
      });
  });

});
