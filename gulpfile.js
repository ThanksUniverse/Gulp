const gulp = require("gulp");
const { series, parallel  } = require("gulp");
const concat = require("gulp-concat");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const images = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const babel = require('gulp-babel');
const browserSync = require("browser-sync");
const borwserSync = require('browser-sync').create()
const reload = browserSync.reload

function tarefasCSS(cb) {
	 gulp.src([
			"./node_modules/bootstrap/dist/css/bootstrap.css",
			"./node_modules/@fortawesome/fontawesome-free/css/all.css",
			"./vendor/owl/css/owl.css",
			"./vendor/jquery-ui/jquery-ui.css",
			"./assets/css/style.css",
			])
		.pipe(concat("styles.css"))
		.pipe(cssmin())
		.pipe(rename({ suffix: ".min" })) //libs.min.css
		.pipe(gulp.dest("./dist/css"));

		cb()
}

function tarefasJS(callback) {
	gulp.src([
	"./node_modules/jquery/dist/jquery.js",
	 "./node_modules/bootstrap/dist/js/bootstrap.js",
	  "./node_modules/@fortawesome/fontawesome-free/js/all.js",
	   "./vendor/owl/js/owl.js",
		 "./vendor/jquery-ui/jquery-ui.js",
		 "./vendor/jquery-mask/jquery.mask.js",
		  "./assets/js/custom.js"
		])
		.pipe(babel({
			comments: false,
			presets: ['@babel/env'],
			comapct: true
		}))
		.pipe(concat("scripts.js"))
		.pipe(uglify())
		.pipe(rename({ suffix: ".min" })) //libs.min.js
		.pipe(gulp.dest("./dist/js"));

		return callback();
}

function tarefasIMG(callback) {
	 return gulp.src("./assets/images/*")
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
//POC -- Proof of Concept
function tarefasHTML(callback) {
	gulp.src('assets/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));


	 return callback()
};

gulp.task('server', function() {	//*Outra forma de criar funções

	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	})
	gulp.watch("./assets/**/*").on("change", process);	//*Fica observando os arquivos para que atualize a página sempre que a pasta dist for atualizada
	gulp.watch('./assets/**/*').on('change', reload)
}) 

function done(cb) {
	console.log('Done')
	return cb()
}

//* Series x Parallel
//* Series: Faz as funções em ordem
//* Parallel: Faz todas as funções ao mesmo tempo

const process = series( tarefasHTML, tarefasJS, tarefasCSS, done);

exports.styles = tarefasCSS;
exports.scripts = tarefasJS;
exports.html = tarefasHTML;
exports.images = tarefasIMG;


exports.default = process

//Gulp-concat Unifica os arquivos
//Gulp-cssmin Minifica o CSS
//Gulp-rename Renomeia o arquivo para .min
//Gulp-uglify deixa o arquivo feio e minifica ele
//Gulp-image Minifica imagens também
//npm install --save-dev gulp-imagemin@7.1.0
// --save-dev Para ser uma dependencia de desenvolvedor
//npm install gulp-concat gulp-cssmin --save-dev
