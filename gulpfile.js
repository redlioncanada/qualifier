// Gulp configuration

var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var jshint      = require('gulp-jshint');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');
// var sass        = require('gulp-ruby-sass');
var jasmine     = require('gulp-jasmine');
// var jshint 		= require('gulp-jshint');


var imagemin = require('gulp-imagemin');
// var notify = require('gulp-notify');
var cache = require('gulp-cache');

// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "build"
        }
    });
});

// Jasmine
gulp.task('test', function () {
  gulp.src('./tests/*.js')
    .pipe(jasmine());
});
// gulp.task('default', function () {
//     return gulp.src('test/test.js')
//         .pipe(jasmine());
// });

// JS hint task
// gulp.task('lint', function() {
// 	gulp.src('build/js/*.js')
// 		.pipe(jshint())
// 		.pipe(jshint.reporter('default'));
// });

// Gulp Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
        .pipe(reload({stream:true}));
});

// Gulp Ruby Sass
// https://github.com/sindresorhus/gulp-ruby-sass
// gulp.task('sass', function () {
//     return gulp.src('scss/*.scss')
//         // .pipe(sass({sourcemap: true, sourcemapPath: 'scss'}))
//         .on('error', function (err) { console.log(err.message); })
//         .pipe(gulp.dest('build/css'))
//         .pipe(reload({stream:true}));
// });


// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('app/js/*.js')
        // .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// process Components JS files and return the stream.
gulp.task('components', function () {

    gulp.src('app/components/*/*/*/*.png')
        .pipe(gulp.dest('build/components'));

    gulp.src('app/components/*/*/*.css')
        .pipe(gulp.dest('build/components'));

    gulp.src('app/components/*/*/*/*.css')
        .pipe(gulp.dest('build/components'));

    gulp.src('app/components/*/*/*.js')
        .pipe(gulp.dest('build/components'));

    return gulp.src('app/components/*/*.js')
        .pipe(gulp.dest('build/components'));
});

// process Components JS files and return the stream.
gulp.task('config', function () {
    return gulp.src('app/config/*.json')
        .pipe(gulp.dest('build/config'));
});


// Views task
gulp.task('views', function() {
    // Get our index.html
    gulp.src('app/index.html')
    // And put it in the build folder
    .pipe(gulp.dest('build/'));

    // Any other view files from app/views
    gulp.src('app/views/**/*')
    // Will be put in the build/views folder
    .pipe(gulp.dest('build/views/'));
});


gulp.task('images', function() {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/img'));
    // .pipe(notify({ message: 'Images task complete' }));
});

// use default task to launch BrowserSync and watch JS files
gulp.task('default', ['sass', 'js', 'images', 'components', 'config', 'browser-sync', 'views'], function () {
	
    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.

    gulp.watch('app/scss/**/*.scss', ['sass', browserSync.reload]);
    gulp.watch('app/views/**/*.html', ['views', browserSync.reload]);
    gulp.watch('app/js/*.js', ['js', browserSync.reload]);

});










