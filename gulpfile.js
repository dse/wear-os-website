var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var cssnano      = require('cssnano');
var autoprefixer = require('autoprefixer');

var sassPaths = [
    'node_modules/foundation-sites/scss',
    'node_modules/motion-ui/src'
];
var sassOptions = {
    includePaths: sassPaths
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', 'ie >= 9']
};

var gulpSrcOptions = {
    sourcemaps: true
};
var gulpDestOptions = {
    sourcemaps: '.'
};

var postcssDevPlugins = [
    autoprefixer(autoprefixerOptions)
];
var postcssProdPlugins = [
    autoprefixer(autoprefixerOptions),
    cssnano()
];

gulp.task('sass-dev', function() {
    return gulp.src('src/scss/main.scss', gulpSrcOptions)
        .pipe($.sass(sassOptions).on('error', $.sass.logError))
        .pipe($.postcss(postcssDevPlugins))
        .pipe(gulp.dest('./css', gulpDestOptions));
});

gulp.task('sass-prod', function() {
    return gulp.src('src/scss/main.scss', gulpSrcOptions)
        .pipe($.sass(sassOptions).on('error', $.sass.logError))
        .pipe($.postcss(postcssProdPlugins))
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest('./css', gulpDestOptions));
});

gulp.task('sass', gulp.series('sass-dev', 'sass-prod'));

gulp.task('watch', gulp.series('sass-dev', 'sass-prod', function () {
    gulp.watch(['src/scss/**/*.scss'],
               gulp.series('sass-dev', 'sass-prod'));
}));

gulp.task('default', gulp.series('watch'));

