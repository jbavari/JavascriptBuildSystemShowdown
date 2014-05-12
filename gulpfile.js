var gulp = require('gulp');
var jshint = require('gulp-jshint');
var cssmin = require('gulp-cssmin');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var qunit = require('gulp-qunit');
var sass = require('gulp-sass');
var zip = require('gulp-zip');
var connect = require('gulp-connect');

//Define individual tasks
gulp.task('jshint', function(){
	return gulp.src([ 'Gruntfile.js', 'js/reveal.js' ])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('cssmin', function(){
	return gulp.src('css/reveal.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('css'));
});

gulp.task('uglify', function(){
	return gulp.src('js/reveal.js')
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('js'));
});

gulp.task('qunit', function(){
	return gulp.src('test/*.html')
		.pipe(qunit());
});

gulp.task('sass', function(){
	return gulp.src('css/theme/source/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css/theme'));
});

gulp.task('zip', function(){
	return gulp.src([
				'index.html',
				'css/**',
				'js/**',
				'lib/**',
				'images/**',
				'plugin/**'])
			.pipe(zip('reveal-js-presentation.zip'))
			.pipe(gulp.dest('dist'));
});

gulp.task('connect', function(){
	connect.server({
		root: '.',
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src('./*.html')
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['./*.html'], ['html']);
});

//Define aggregate tasks
gulp.task('default', ['jshint', 'cssmin', 'uglify', 'qunit']);
gulp.task('package', ['default', 'zip']);
gulp.task('serve', ['connect', 'watch']);
gulp.task('test', ['jshint', 'qunit']);