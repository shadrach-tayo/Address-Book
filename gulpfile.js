const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
// const concat = require('gulp-concat');

const path = {
	html: {
		src: 'index.html',
		dest: 'dist'
	},
	styles: {
		src: 'css/*.css',
		dest: 'dist/assets/css'
	},
	images: {
		src: 'images/*.{jpg,jpeg,png,svg}',
		dest: 'dist/assets/images'
	},
	scripts: {
		src: 'scripts/**/*.js',
		dest: 'dist/assets/js'
	}
}

gulp.task('html', async () => {
	return gulp.src(path.html.src)
		.pipe(gulp.dest(path.html.dest));
});

gulp.task('styles', async () => {
	return gulp.src(path.styles.src)
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest(path.styles.dest));
});

gulp.task('scripts', async () => {
	return gulp.src(path.scripts.src)
		.pipe(gulp.dest(path.scripts.dest))
})

gulp.task('images', async () => {
	return gulp.src(path.images.src)
		.pipe(gulp.dest(path.images.dest));
});

gulp.task('watch', gulp.parallel(async () => {
	gulp.watch(path.html.src, gulp.parallel('html'));
	gulp.watch(path.styles.src, gulp.parallel('styles'));
	gulp.watch(path.images.src, gulp.parallel('images'));
	gulp.watch(path.scripts.src, gulp.parallel('scripts'));
}));

gulp.task('default', gulp.parallel('html', 'styles', 'images', 'scripts', 'watch'));
