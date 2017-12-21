const path = {
    src: {
        dir: 'src/',
        fonts: 'src/fonts/**/*.{eot,ttf,woff,woff2,svg}',
        js: 'src/js/srcJS/main.js',
        // vendorJS: 'src/js/vendorJS/list.js',
        sass: 'src/sass/*.{sass,scss}',
        images: 'src/img/**/*.{jpg,png,gif,svg}',
        html: 'src/html/*.html'
    },

    watch: {
        fonts: 'src/fonts/**/*.{eot,ttf,woff,woff2,svg}',
        // vendorJS: 'src/js/vendorJS/**/*.js',
        js: 'src/js/srcJS/**/*.js',
        sass: 'src/sass/**/*.{sass,scss}',
        html: 'src/html/**/*.html',
        images: 'src/img/**/*.{jpg,png,gif,svg}'
    },

    build: {
        dir: 'assets/',
        fonts: 'assets/fonts/',
        js: 'assets/js/',
        css: 'assets/css/',
        html: 'assets/html',
        images: 'assets/img/'
    }
};

const gulp = require('gulp');

const clean = require('gulp-clean');
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const colors = require('colors');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-minify-css');
const webpack = require('gulp-webpack');
const connect = require('gulp-connect');


gulp.task('connect', function () {
    connect.server({
        root: '',
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


// gulp.task('Iconfont:build', function(){
//     return gulp.src(['src/img/icons/*.svg'])
//         .pipe(iconfont({
//             fontName: 'iconFont',
//             prependUnicode: true,
//             formats: ['ttf', 'eot', 'woff', 'svg'],
//             // timestamp: runTimestamp,
//             normalize: true,
//             fontWeight: '300',
//             fontHeight: 100,
//             fixedWidth: false,
//             centerHorizontally: false
//         }))
//         .pipe(gulp.dest('assets/fonts/'));
// });


// gulp.task('vendorJS:build', function () {
//     return gulp.src(path.src.vendorJS)
//         .pipe(plumber({
//             errorHandler: function (error) {
//                 console.log(error.message);
//                 this.emit('end');
//             }
//         }))
//         .pipe(debug({title: 'vendor js:'}))
//         .pipe(rigger())
//         // .pipe(uglify())
//         .pipe(concat('vendorJS.min.js'))
//         .pipe(gulp.dest(path.build.js))
//         .pipe(connect.reload());
// });

gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(debug({title: 'js:'}))
        .pipe(rigger())
        // .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload());
});

gulp.task('sass:build', function () {
    return gulp.src(path.src.sass)
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        // .pipe(autoprefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(connect.reload());
});

gulp.task('rebuild', function () {
    runSequence(
        'clean',
        'html:build',
        'fonts:build',
        // 'vendorJS:build',
        'js:build',
        'sass:build',
        'images:build',
        // 'Iconfont:build',
        function () {
            console.log('project is ' + colors.green.underline('rebuild'));
        }
    );
});

gulp.task('watch', function () {

    watch([path.watch.html], function () {
        gulp.start('html:build');
    });

    watch([path.watch.images], function () {
        gulp.start('images:build');
    });

    watch([path.watch.fonts], function () {
        gulp.start('fonts:build');
    });

    // watch([path.watch.vendorJS], function () {
    //     gulp.start('vendorJS:build');
    // });

    watch([path.watch.js], function () {
        gulp.start('js:build');
    });

    watch([path.watch.sass], function () {
        gulp.start('sass:build');
    });

});


gulp.task('default', ['connect', 'rebuild', 'watch']);