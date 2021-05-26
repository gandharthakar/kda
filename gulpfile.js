// Required Packges
// npm install gulp (use this if you have already install gulp globally)
// else use the following cammand

// npm install --global gulp
var gulp  = require('gulp');
// npm install gulp-util
var gutil = require('gulp-util');
// npm install gulp-concat
var concat = require('gulp-concat');
// npm install gulp-clean-css
var cleanCSS = require('gulp-clean-css');
// npm install gulp-uglify
var uglify = require('gulp-uglify');
// npm i gulp-image-optimization
// var imageop = require('gulp-image-optimization');
// npm install gulp-sass
var sass = require('gulp-sass');

// For Images
// gulp.task('img', function() {
// 	gulp.src(['assets/img/*.png','assets/img/*.jpg','assets/img/*.gif','assets/img/*.jpeg','assets/img/*/*.png','assets/img/*/*.jpg','assets/img/*/*.gif','assets/img/*/*.jpeg']).pipe(imageop({
// 		optimizationLevel: 5,
// 		progressive: true,
// 		interlaced: true
// 	})).pipe(gulp.dest('assets/dist/img')).on('end', cb).on('error', cb);
// });

// Set task
gulp.task('production', async function() {
	gulp.src(['css/bootstrap.css','css/font-awesome.css','css/swiper.css','css/magnific-popup.css','css/style.css'])
	.pipe(cleanCSS())
	.pipe(concat('production.min.css'))
	.pipe(gulp.dest('production'));

	gulp.src(['js/jquery-3.3.1.min.js','js/bootstrap.bundle.min.js','js/swiper.min.js','js/jquery.magnific-popup.js','js/website.js'])
	.pipe(uglify())
	.pipe(concat('production.min.js'))
	.pipe(gulp.dest('production'));
});

gulp.task('convert-css', function() {
	gulp.src(['sass/style.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('css'));
});

gulp.task('build-css', function() {
	gulp.src(['css/bootstrap.css','css/font-awesome.css','css/swiper.css','css/magnific-popup.css','css/style.css'])
	.pipe(cleanCSS())
	.pipe(concat('production.min.css'))
	.pipe(gulp.dest('production'));
});

gulp.task('build-js', function() {
	gulp.src(['js/jquery-3.3.1.min.js','js/bootstrap.bundle.min.js','js/swiper.min.js','js/jquery.magnific-popup.js','js/website.js'])
	.pipe(uglify())
	.pipe(concat('production.min.js'))
	.pipe(gulp.dest('production'));
});

//Watch task
gulp.task('sass--watch',function() {
    gulp.watch('sass/**/*.scss', function(){
    	gulp.run(['convert-css','build-css']);
    });
});