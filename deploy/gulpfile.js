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

var base = '/home/wpcstage/mymaytag/test/';
var opts = {host: 'wpc-stage.com', port: 22, auth: 'keyMain'}

gulp.task('default', function() {
    doUpload(['config', 'css', 'fonts', 'js', 'views']);
});

gulp.task('components', function() {
    doUpload(['components', 'img']);
});

gulp.task('all', function() {
    doUpload(['config', 'css', 'fonts', 'js', 'views', 'components', 'img']);
});

function doUpload(src) {
    for (var i in src) {
        opts.remotePath = base+src[i];
        gulp.src('../build/'+src[i]+'/**')
            .pipe(ftp(opts));
    }
    
    opts.remotePath = base;
    return gulp.src('../build/*')
        .pipe(ftp(opts));
}











