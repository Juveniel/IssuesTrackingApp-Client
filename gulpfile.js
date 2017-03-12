'use strict';

// Load plugins
const gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    sass = require('gulp-ruby-sass'),
    browserSync = require('browser-sync').create(),
    runSequence = require('run-sequence'),
    del = require('del');

const plugins = gulpLoadPlugins(),
    reload = browserSync.reload;

// Sass
gulp.task('styles', function() {
    return sass('client/scss/theme.scss', { style: 'expanded' })
        .pipe(plugins.autoprefixer('last 2 version'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(gulp.dest('client/styles'))
        .pipe(plugins.notify({ message: 'Styles task complete' }));
});

// Lint Sass
gulp.task('sass-lint', () => {
    return gulp.src('client/scss/**/*.scss')
        .pipe(plugins.sassLint({
            options: {
                configFile: 'linters/.sass-lint.yml'
            }
        }))
        .pipe(plugins.sassLint.format())
        .pipe(plugins.sassLint.failOnError());
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(['client/scripts/**/*.js'])
        .pipe(plugins.babel())
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(reload({ stream: true }));
});

gulp.task('json', () => {
    return gulp.src('client/scripts/**/*.json')
        .pipe(gulp.dest('dist/scripts'));
});


// Html
gulp.task('html', ['styles', 'scripts'], () => {
    return gulp.src('client/*.html')
        .pipe(plugins.useref({ searchPath: ['.tmp', 'client', '.'] }))
        .pipe(plugins.if('*.js', plugins.uglify()))
        .pipe(plugins.if('*.css', plugins.cssnano({zindex: false})))
        .pipe(gulp.dest('dist'));
});

// Views
gulp.task('views', () => {
    return gulp.src('client/scripts/views/**/*')
        .pipe(gulp.dest('dist/scripts/views'));
});

// Images
gulp.task('media', () => {
    return gulp.src('client/media/**/*')
        .pipe(plugins.cache(plugins.imagemin()))
        .pipe(gulp.dest('dist/media'));
});

// Fonts
gulp.task('fonts', () => {
    return gulp.src('client/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

// Bower fonts
gulp.task('bower-fonts', () => {
    return gulp.src('client/bower_components/**/*.{eot,ttf,woff,woff2}')
        .pipe(plugins.flatten())
        .pipe(gulp.dest('dist/fonts'));
});

// Uploads
gulp.task('uploads', () => {
    return gulp.src('client/uploads/**/*')
        .pipe(gulp.dest('dist/uploads'));
});

// Clean
gulp.task('clean', function() {
    return del(['.tmp', 'dist']);
});

// Compile
gulp.task('watch', () => {
    runSequence(['clean'],
        ['styles', 'scripts', 'json', 'html', 'views', 'media', 'fonts', 'bower-fonts', 'uploads'], () => {
        browserSync.init({
            notify: false,
            port: 9000,
            server: {
                baseDir: ['client'],
                routes: {
                    '/bower_components': 'bower_components'
                }
            }
        });

        gulp.watch([
            'client/*.html',
            'client/scss/**/*.scss',
            'client/media/**/*',
            'client/fonts/**/*'
        ]).on('change', reload);

        gulp.watch('client/scss/**/*.scss', ['styles']);
        gulp.watch('client/scripts/**/*.js', ['scripts']);
        gulp.watch('client/media/**/*', ['media']);
        gulp.watch('client/fonts/**/*', ['fonts']);
    });
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});
