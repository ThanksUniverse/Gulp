const gulp = require("gulp");
const concat = require("gulp-concat");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");

function tarefasCSS(cb) {
	return gulp
		.src("./vendor/**/*.css")
		.pipe(concat("libs.css"))
		.pipe(cssmin())
		.pipe(rename({ suffix: ".min" })) //libs.min.css
		.pipe(gulp.dest("./dist/css"));
}

function tarefasJS() {
	return gulp
		.src("./vendor/**/*.js")
		.pipe(concat("libs.js"))
		.pipe(uglify())
		.pipe(rename({ suffix: ".min" })) //libs.min.js
		.pipe(gulp.dest("./dist/js"));
}

exports.styles = tarefasCSS;
exports.scripts = tarefasJS;

//Gulp-concat Unifica os arquivos
//Gulp-cssmin Minifica o CSS
//Gulp-rename Renomeia o arquivo para .min
//Gulp-uglify deixa o arquivo feio e minifica ele
// --save-dev Para ser uma dependencia de desenvolvedor
//npm install gulp-concat gulp-cssmin --save-dev
