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
var p = require('../package.json');

var basePath = '/home/wpcstage/mymaytag/';
var versionPath = '/home/wpcstage/mymaytag/latest/';
var opts = {host: 'wpc-stage.com', port: 22, auth: 'keyMain'};
var versionURL = 'http://mymaytag.wpc-stage.com';

gulp.task('default', ['version'], function() {
    doUpload(['config', 'css', 'fonts', 'js', 'views']);
});

gulp.task('components', ['version'], function() {
    doUpload(['components', 'img']);
});

gulp.task('all', ['version'], function() {
    doUpload(['config', 'css', 'fonts', 'js', 'views', 'components', 'img']);
});

gulp.task('version', function() {
    opts.remotePath = versionPath;

    return gulp.src('index.php')
        .pipe(replace('#VERSION', '\''+p.version+'\''))
        .pipe(replace('#LOCATION', '\''+versionURL+'\''))
        .pipe(ftp(opts));
});

function doUpload(src) {
    for (var i in src) {
        opts.remotePath = basePath+p.version+'/'+src[i];
        gulp.src('../build/'+src[i]+'/**')
            .pipe(ftp(opts));
    }
    
    opts.remotePath = basePath+p.version;
    return gulp.src('../build/*')
        .pipe(ftp(opts));
}











