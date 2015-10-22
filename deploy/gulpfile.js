// Gulp configuration

/*
for auth, create a file in the same dir as this one named .ftppass with the structure
{
  "keyMain": {
    "user": "username",
    "pass": "password"
  }
}
*/

var gulp = require('gulp');
var ftp = require('gulp-sftp');
var replace = require('gulp-replace');
var preprocess  = require('gulp-preprocess');
var p = require('../package.json');

var basePath = '/home/wpcstage/mymaytag/';
var versionPath = '/home/wpcstage/mymaytag/latest/';
var opts = {host: 'wpc-stage.com', port: 22, auth: 'keyMain'};
var baseURL = 'http://mymaytag.wpc-stage.com';

gulp.task('default', ['index', 'version'], function() {
    doUpload(['index', 'last-updated', 'config', 'css', 'fonts', 'js', 'views']);
});

gulp.task('components', ['index', 'version'], function() {
    doUpload(['components', 'img']);
});

gulp.task('all', ['index', 'version'], function() {
    doUpload(['config', 'css', 'fonts', 'js', 'views', 'components', 'img']);
});

gulp.task('prod', ['index-prod'], function() {
    doUpload(['config', 'css', 'fonts', 'js', 'views', 'components', 'img'], true);
});

gulp.task('version', function() {
    opts.remotePath = versionPath;

    return gulp.src('index.php')
        .pipe(replace('#LOCATION', baseURL+'/'+p.version))
        .pipe(ftp(opts));
});

gulp.task('index', function() {
    opts.remotePath = basePath+'/'+p.version;

    return gulp.src('../build/index.html')
        .pipe(replace('#DATETIME', new Date()))
        .pipe(gulp.dest('../build'))
        .pipe(ftp(opts));
});

gulp.task('index-prod', function() {
    opts.remotePath = basePath;

    return gulp.src('../build/index.html')
        .pipe(gulp.dest('../build'))
        .pipe(ftp(opts));
});

function doUpload(src,prod) {
    if (prod === 'undefined') prod = false;
    for (var i in src) {
        opts.remotePath = prod ? basePath+src[i] : basePath+p.version+'/'+src[i];
        gulp.src('../build/'+src[i]+'/**')
            .pipe(ftp(opts));
    }
    
    opts.remotePath = prod ? basePath : basePath+p.version;
    return gulp.src('../build/*')
        .pipe(ftp(opts));
}











