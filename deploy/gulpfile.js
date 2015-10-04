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
var opts = {host: 'wpc-stage.com', port: 22, auth: 'keyMain'}

gulp.task('default', function() {
    doUpload(['config', 'css', 'fonts', 'js', 'views']);
    updateVersion();
});

gulp.task('components', function() {
    doUpload(['components', 'img']);
    updateVersion();
});

gulp.task('all', function() {
    doUpload(['config', 'css', 'fonts', 'js', 'views', 'components', 'img']);
    updateVersion();
});

function updateVersion() {
    opts.remotePath = versionPath;
    return gulp.src('version.php')
        .replace('#VERSION', '\''+p.version+'\'');
        .pipe(ftp(opts));
}

function doUpload(src) {
    for (var i in src) {
        opts.remotePath = basePath+p.version+'/'+src[i];
        gulp.src('../build/'+src[i]+'/**')
            .pipe(ftp(opts));
    }
    
    opts.remotePath = basePath+p.version+'/';
    return gulp.src('../build/*')
        .pipe(ftp(opts));
}











