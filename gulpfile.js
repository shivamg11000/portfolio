
const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const browserify = require('browserify')
const source = require('vinyl-source-stream')

//transform es6
gulp.task('es6',() => (
    gulp.src('src/js/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/compiled/js'))
))

//bundle the js
gulp.task('browserify',() => (
    browserify('dist/compiled/js/main.js').bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/compiled/js'))
))

//watch for js changes
gulp.task('watch-js',() => (
    gulp.watch('src/js/*.js',['es6','browserify'])
))

//copy html
gulp.task('HTML',() => (
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist/compiled'))
))

//watch for html changes
gulp.task('watch-HTML',() => (
    gulp.watch('src/index.html',['HTML'])
))

//scss to css
gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/compiled/css'));
});

//watch for scss changes
gulp.task('watch-sass',() => (
    gulp.watch('src/scss/**/*.scss',['sass'])
))
   
gulp.task('compile',['HTML','es6','browserify','sass'])

gulp.task('watcher',['watch-js', 'watch-HTML', 'watch-sass'])