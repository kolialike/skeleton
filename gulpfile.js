var path = {
    src: {
        dir: 'src/',
        fonts: 'src/fonts/**/*.{eot,ttf,woff,woff2,svg}',
        js: 'src/js/main.js',
        sass: 'src/sass/*.{sass,scss}',
        images: 'src/img/**/*.{jpg,png,gif,svg}',
        html: 'src/html/*.html',
        vendor: {
            js: 'src/vendor/vendor.js',
            css: 'src/vendor/*.scss'
        }
    },

    watch: {
        vendor: 'src/vendor/**/*.*',
        fonts: 'src/fonts/**/*.{eot,ttf,woff,woff2,svg}',
        js: 'src/js/**/*.js',
        sass: 'src/sass/**/*.{sass,scss}',
        html: 'src/html/**/*.html',
        images: 'src/img/**/*.{jpg,png,gif,svg}'
    },

    build: {
        dir: 'build/',
        fonts: 'build/fonts/',
        js: 'build/js/',
        css: 'build/css/',
        html: 'build/html',
        images: 'build/img/'
    }
};

var gulp = require('gulp');

var clean = require('gulp-clean');
var concat = require('gulp-concat');
var debug = require('gulp-debug');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var compass = require('gulp-compass');
var rigger = require('gulp-rigger');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var colors = require('colors');
var cssmin = require('gulp-minify-css');

var connect = require('gulp-connect');


gulp.task('connect', function () {
    connect.server({
        root: '../',
        port: '8080',
        livereload: true
    });
});


gulp.task('clean', function () {
    return gulp.src(path.build.dir)
        .pipe(clean({force: true}));
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(debug({title: 'html:'}))
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(connect.reload());
    ;
});

gulp.task('fonts:build', function () {
    return gulp.src(path.src.fonts)
        .pipe(debug({title: 'fonts:'}))
        .pipe(gulp.dest(path.build.fonts))
        .pipe(connect.reload());
    ;
});

gulp.task('images:build', function () {
    return gulp.src(path.src.images)
        .pipe(debug({title: 'images:'}))
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(path.build.images))
        .pipe(connect.reload());
    ;
});

gulp.task('vendor:js:build', function () {
    return gulp.src(path.src.vendor.js)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(debug({title: 'vendor js:'}))
        .pipe(rigger())
        // .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload());
    ;
});

gulp.task('vendor:css:build', function () {
    return gulp.src(path.src.vendor.css)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(debug({title: 'vendor css:'}))
        .pipe(rigger())
        // .pipe(cssmin())
        .pipe(gulp.dest(path.build.css))
        .pipe(connect.reload());
    ;
});

gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(debug({title: 'js:'}))
        .pipe(rigger())
        // .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload());
    ;
});

gulp.task('sass:build', function () {
    return gulp.src(path.src.sass)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(debug({title: 'sass:'}))
        .pipe(compass({
            sass: 'src/sass',
            css: path.build.css,
            image: 'src/img',
            font: 'src/fonts'
        }))
        // .pipe(cssmin())
        .pipe(gulp.dest(path.build.css))
        .pipe(connect.reload());
});

gulp.task('vendor:build', function () {
    runSequence('vendor:js:build', 'vendor:css:build');
});

gulp.task('rebuild', function () {
    runSequence(
        'clean',
        'html:build',
        'fonts:build',
        'images:build',
        ['vendor:js:build', 'vendor:css:build'],
        'js:build',
        'sass:build',
        'images:build',
        function () {
            console.log('project is ' + colors.green.underline('rebuild'));
        }
    );
});

gulp.task('watch', function () {

    watch([path.watch.html], function () {
        gulp.start('html:build');
    });

    // watch([path.watch.images], function () {
    //     gulp.start('images:build');
    // });

    watch([path.watch.fonts], function () {
        gulp.start('fonts:build');
    });

    watch([path.watch.vendor], function () {
        gulp.start('vendor:build');
    });

    watch([path.watch.js], function () {
        gulp.start('js:build');
    });

    watch([path.watch.sass], function () {
        gulp.start('sass:build');
    });

});


gulp.task('default', ['connect', 'rebuild', 'watch']);