'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var minimist = require('minimist');

/** configuration **/
var args = minimist(process.argv.slice(2));

gulp.task('deploy', function() {
    var conn = ftp.create({
        host: args.host,
        port: 21,
        user: args.user,
        password: args.password,
        parallel: 5,
        log: gutil.log
    });

    var localFiles = ['./dist/**/*'];
    var remoteFolder = args.path;

    return gulp.src(localFiles, { base: './dist/', buffer: false })
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files
        .pipe( conn.dest( remoteFolder ) )
    ;
});
