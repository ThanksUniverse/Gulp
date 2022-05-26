const gulp = require("gulp");
const concat = require("gulp-concat");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const images = require("gulp-imagemin");

function tarefasCSS(cb) {
	return gulp
		.src(["./node_modules/bootstrap/dist/css/bootstrap.css", "./vendor/owl/css/owl.css", "./node_modules/@fortawesome/fontawesome-free/css/all.css", "./assets/css/style.css"])
		.pipe(concat("styles.css"))
		.pipe(cssmin())
		.pipe(rename({ suffix: ".min" })) //libs.min.css
		.pipe(gulp.dest("./dist/css"));
}

function tarefasJS() {
	return gulp
		.src(["./node_modules/jquery/dist/jquery.js", "./node_modules/bootstrap/dist/js/bootstrap.js", "./vendor/owl/js/owl.js", "./assets/js/custom.js", "./node_modules/@fortawesome/fontawesome-free/js/all.js"])
		.pipe(concat("scripts.js"))
		.pipe(uglify())
		.pipe(rename({ suffix: ".min" })) //libs.min.js
		.pipe(gulp.dest("./dist/js"));
}

function tarefasIMG() {
	return gulp
		.src("./assets/images/*")
		.pipe(
			images({
				pngquant: true,
				optipng: false,
				zopfling: true,
				jpegRecompress: false,
				mozjpeg: true,
				gifsicle: true,
				svgo: true,
				concurrent: 10,
				quiet: true,
			})
		)
		.pipe(gulp.dest("./dist/images"));
}

exports.styles = tarefasCSS;
exports.scripts = tarefasJS;
exports.images = tarefasIMG;

//Gulp-concat Unifica os arquivos
//Gulp-cssmin Minifica o CSS
//Gulp-rename Renomeia o arquivo para .min
//Gulp-uglify deixa o arquivo feio e minifica ele
//Gulp-image Minifica imagens também
//npm install --save-dev gulp-imagemin@7.1.0
// --save-dev Para ser uma dependencia de desenvolvedor
//npm install gulp-concat gulp-cssmin --save-dev
