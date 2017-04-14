'use strict';

var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    njkRender = require('gulp-nunjucks-render'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    inline = require('gulp-inline-css'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    pngquant = require('imagemin-pngquant'),
    del = require('del'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    runSequence = require('run-sequence'),
    data = require('gulp-data'),
    // pagesData = require('./data.js');
    pagesData = require('./properties.js');

var path = {
  build: {
    html: 'www/',
    js: 'www/js/',
    css: 'www/css/',
    img: 'www/img/'
  },
  src: {
    html: 'src/pages/*.+(html|njk)',
    njk: 'src/pages/',
    js: 'src/js/',
    jsx: 'src/js/partials/app.jsx',
    scss: 'src/style/main.scss',
    img: 'src/img/**/*.*'
  },
  watch: {
    html: 'src/pages/**/*.+(html|njk)',
    // njk: 'src/pages/partials/*.njk',
    js: 'src/js/*.js',
    jsx: 'src/js/partials/*.jsx',
    style: 'src/style/*.scss',
    img: 'src/img/**/*.*'
  },
  clean: ['./www']
};

var config = {
  server: {
      baseDir: "www/"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000
};

// function getDataForFile(file) {
//   return {
//     breadcrumbs: pagesData.breadcrumbs(file.path),
//     title: pagesData.title(file.path),
//     prev: pagesData.prev(file.path),
//     next: pagesData.next(file.path)
//   };
// }


function getDataForFile(file) {
  var prop = new pagesData.properties(file.path);
  return {
    breadcrumbs: prop.getBreadcrumbs(),
    title: prop.getTitle(),
    prev: prop.getPrev(),
    next: prop.getNext()
  };
}

gulp.task('html-build', function () {
  gulp.src(path.src.html)
      .pipe(data(getDataForFile))
      .pipe(njkRender({
        path: [path.src.njk]
      }))
      .pipe(gulp.dest(path.build.html))
      .pipe(reload({stream: true}));
});

gulp.task('jsx-build', function() {
  return browserify({entries: path.src.jsx, extensions: ['.jsx'], debug: true})
        .transform('babelify')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(path.src.js));
});

gulp.task('js-build', function () {
  gulp.src(path.src.js+'main.js')
      .pipe(rigger())
      .pipe(sourcemaps.init())
      .pipe(jshint())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.build.js))
      .pipe(reload({stream: true}));
});;

gulp.task('style-build', function () {
  gulp.src(path.src.scss)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(prefixer())
      .pipe(cssmin())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.build.css))
      .pipe(reload({stream: true}));
});

gulp.task('image-build', function () {
  return gulp.src(path.src.img)
              .pipe(cache(imagemin ([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({use: pngquant()})
              ])))
              .pipe(gulp.dest(path.build.img))
              .pipe(reload({stream: true}));
});
//
// gulp.task('fonts-build', function() {
//
//   gulp.src(path.src.fonts)
//       .pipe(gulp.dest(path.build.fonts))
// });



gulp.task('build', function(cb) {
  runSequence(/*'fonts-build', */'jsx-build', 'js-build', ['image-build', 'style-build', 'html-build'], cb);
});

gulp.task('watch', ['build'], function(){
  gulp.watch(path.watch.html, ['html-build']);
  gulp.watch(path.watch.jsx, ['jsx-build']);
  gulp.watch(path.watch.js, ['js-build']);
  gulp.watch(path.watch.style, ['style-build']);
  gulp.watch(path.watch.img, ['image-build']);
  // gulp.watch(path.watch.fonts, ['fonts-build']);
});

gulp.task('webserver', ['build'], function() {
  browserSync(config);
});

gulp.task('clean', function(cb) {
  del(path.clean);
  cache.clearAll(cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
