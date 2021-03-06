
const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const sourcemaps = require('gulp-sourcemaps')
const gutil = require('gulp-util')



//transform es6 and bundle it
gulp.task('js',() => (
    browserify({
        entries: "src/js/main.js",
        extensions: ['.js','.json'],
        debug: true
    })
        .transform("babelify",{presets: ["env"]}).on('error',gutil.log)
        .bundle().on('error',gutil.log)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/compiled/js"))
        
))


//watch for js changes
gulp.task('watch-js',() => (
    gulp.watch('src/js/main.js',['js'])
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
   
gulp.task('compile',['HTML', 'js', 'sass'])

gulp.task('watcher',['watch-js', 'watch-HTML', 'watch-sass'])



/****************************************************/
//  build to deploy

const autoPrefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')

gulp.task('_copyHTML',() => (
    gulp.src('dist/compiled/index.html')
        .pipe(gulp.dest('dist/deploy'))
))

//prefix and minify the CSS
gulp.task('prefix-minify-css',() => (
    gulp.src('dist/compiled/css/*.css')
        .pipe(autoPrefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/deploy/css'))
))

// minify the js 
gulp.task('minify-js',() => (
    gulp.src('dist/compiled/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/deploy/js'))
))

gulp.task('build-for-deploy',['compile','_copyHTML','prefix-minify-css','minify-js'])
