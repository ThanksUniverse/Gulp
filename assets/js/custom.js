//Instância jquery e evitar conflitos
/* jQuery(function ($) {
	$(" h4 "); //*tag
	$(".featired-item"); //*class
	$("#featured"); //*id
}); */

/* jQuery(function ($) { */
/*
 * Carousel images
 */

//DONE: Popout on Load
//DONE: Dark Mode
//DONE: Imagem de fora de estoque ao clicar em comprar produto
//DONE: Utilizar algumas novas funções do jQuery UI
//TODO: Checar o cpf através do regex

$(document).ready(function () {
	$(".owl-carousel").owlCarousel();

	let myModal = new bootstrap.Modal($("#modelId"));
	myModal.show();

	/*
	 * Print All h4, featured items and featured (new)
	 */

	let titulos = $(" h4 "); //*tag

	let items = $(".featured-item"); //*class

	let destaques = $("#featured"); //*id

	console.log(titulos.first());
	console.log(items);
	console.log(destaques);

	$(".featured-item a").addClass("btn btn-dark");

	//Stretch-Link -- Torna toda área do link clicável, muito boa classe do Bootstrap

	$(".featured-item h4").append('<span class="badge bg-danger"> Novo </span>');
	//Append substitui ou adiciona uma tag nova depois
	//Prepend substitui ou adiciona uma tag nova antes
	//After adiciona um texto depois
	//Before adiciona um texto antes
	//Hide adiciona display none em um elemento
	//Show readiciona o display no elemento
	//Fade adiciona uma transição ao elemento .fadeIn(2000) or .fadeOut(2000)

	//* Faz com que as imagens parecam que estão sendo carregadas ao abrir o site
	$(".featured-item img").fadeOut(1);
	$(".featured-item img").fadeIn(1000);

	//* Mostra algumas informações no console quando você coloca e tira o mouse de produtos
	$(".featured-item").hover(
		function () {
			//mouseenter
			console.log($(this).find("h4").text());
		},
		function () {
			//mouseleave
			console.log($(this).find("h4").text() + " - " + "Preço:" + " - " + $(this).find("h6").text());
		}
	);

	//*Manipulação de evento ---- Faz com que apareça um alert dizendo que o produto está esgotado quando clica em comprarr

/* 	$(".featured-item a").on("click", function (event) {
		//on('click', 'mouseenter', 'mouseleave', 'blur') /Blur: Quando tira o foco- Clicar no botão e depois clica fora -- Utilizado em campos de formulários
		event.preventDefault();

		alert("Produto esgotado");
	});
 */
	//* Um hover effect que eu fiz pelo jQuery para praticar

	$(".featured-item").on("mouseenter", function (event) {
		event.preventDefault();
		$(this).css({
			filter: "brightness(120%);",
			cursor: "pointer",
		});
	});
	

	$('.featured-item a').on('click', function (e) {
		e.preventDefault();

		$(this).closest('div').hide()
	})

	//* Callbacks
	/*Ações que começam ao término de outra */
	let fasttime = 1;
	$(".featured-item:nth(1)")
		.hide(fasttime, function () {
			//* Este é o callback
			console.log($(this).find("h4").text() + "esgotado");
		})
		.show(fasttime, function () {
			console.log($(this).find(" h4 ").text() + "em estoque");
		});

	/*
	 * Animações
	 */

	//* Faz com que o input suba 50px para cima quando clicar em submit

	let time = 800;

	$("#form-submit").on("click", function (e) {
		e.preventDefault();

		if ($("#email").val() != "") {
			$("#email").animate(
				{
					top: "-50",
				},
				time,
				function () {
					console.log($(this).val());
				}
			);
		}
	});

	/*
	 * Ouvinte de eventos .nav-modal-open
	 */

	/*
	 * Copia o conteúdo do ID que a gente clicar e adiciona ao (.nav-modal-open)
	 * Campos dinâmicos, coisa muito legal, adicionar ao ToDO
	 */
	$(".nav-modal-open").on("click", function (e) {
		e.preventDefault();

		let elem = $(this).attr("rel");

		$(".modal-body").html($("#" + elem).html());

		$(".modal-header h5.modal-title").html($(this).text());

		let myModal = new bootstrap.Modal($("#modelId"));

		myModal.show();
	});

	$(".nav-modal-open-2").on("click", function (e) {
		e.preventDefault();

		let elem = $(this).attr("rel");

		$(".modal-body").html($("#" + elem).html());

		let myModal = new bootstrap.Modal($("#modelId1"));

		myModal.show();
	});

	$(".modal-pedro").on("click", function (e) {
		e.preventDefault();

		let elem = $(this).attr("rel");

		$(".modal-body").html($("#" + elem).html());

		let myModal = new bootstrap.Modal($("#model-pedro"));

		myModal.show();
	});

	/*
	 *	Verificação antes de enviar o formulário
	 */

	$("body").on("submit", ".modal-body .form", function (e) {
		e.preventDefault();

		const inputName = $("#nome"); //* Criar constante porque o valor dela não irá mudar
		const inputEmail = $("#email");

		validate(inputName)
		validate(inputEmail)

		if (inputEmail.hasClass("invalid") || inputName.hasClass("invalid")) {
			console.log('Verificar os Campos obrigatórios')
			return false;
		} else {
			$(this).submit();
		}
	});

	//* Verifica nome e adiciona class invalid se não estiver completo

	$("body").on("blur", "#nome", function () {
		validate($(this));
	});
	//* Verifica email e adiciona class invalid se não estiver completo

	$("body").on("blur", "#email", function () {
		validate($(this));
	});

/* 	$('body').on('focus', '#date', function() {
		$(this).datepicker()
	}) */

	$("body").on("blur", "#date", function () {
		validate($(this));
		$(this).mask("00/00/0000");
	});

	$("body").on("blur", "#time", function () {
		validate($(this));
		$(this).mask("00:00");
	});

	$("body").on("blur", "#phone", function () {
		validate($(this));
		$(this).mask("0000-0000");
	});

	$("body").on("blur", "#cep", function () {
		validate($(this));
		$(this).mask("00000-000");
	});

	$("body").on("blur", "#cpf", function () {
		validate($(this));
		$(this).mask("000.000.000-00");
		validarCPF();
	});

	//* Função de Validação do formulário
	
	function validate(data) {
		if (data.val() == "") {
			$(this).addClass("invalid");

			console.log("O campo de " + data.attr('name') + " é obrigatório");

			data.parent().find('.text-muted').show()

			data.addClass('invalid')

			return false;
		} else {
			data.parent().find('.text-muted').hide()
			data.removeClass('invalid')
		}
	}	

});

/*
* Definir tema da página
*/

function darkMode() {
		var head = $('header nav')
		var body = $('body')
		var nav = $('nav li a')
		var h1 = $('h1, h4')
		var a = $('.featured-item a')
		var img = $('.logopedro')
		body.addClass('bg-dark')
		head.removeClass('bg-light')
		head.addClass('bg-dark')
		nav.addClass("navli");
		h1.addClass('navli')
		a.removeClass('btn-dark')
		a.addClass('btn-light')
		img.addClass('whiteModei')
		img.removeClass('darkModei')
	}

	function lightMode() {
		var head = $("header nav");
		var body = $("body");
		var nav = $("nav li a");
		var h1 = $("h1, h4");
		var a = $(".featured-item a");
		var img = $(".logopedro");
		body.removeClass("bg-dark");
		head.addClass("bg-light");
		head.removeClass("bg-dark");
		nav.removeClass("navli");
		h1.removeClass("navli");
		a.addClass("btn-dark");
		a.removeClass("btn-light");
		img.removeClass("whiteModei");
		img.addClass("darkModei");
	}

	/*
	* Validação de CPF
	 */

	function validarCPF(inputCPF) {
		var soma = 0;
		var resto;
		var inputCPF = document.getElementById("cpf").value;

		if (inputCPF == "00000000000") return false;
		for (i = 1; i <= 9; i++) soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
		resto = (soma * 10) % 11;

		if (resto == 10 || resto == 11) resto = 0;
		if (resto != parseInt(inputCPF.substring(9, 10))) return false;

		soma = 0;
		for (i = 1; i <= 10; i++) soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
		resto = (soma * 10) % 11;

		if (resto == 10 || resto == 11) resto = 0;
		if (resto != parseInt(inputCPF.substring(10, 11))) {
			alert('Cpf Inválido')
			return false; 
		} else {
			return true;
		}
	}


/* 
* Faz o banner pegar uma cor aleatória
* Usei do e while para tentar fazer com que não caia uma cor muito branca e atrapalhe a leitura
*/


let randomColor = /* "#" +  */Math.floor(Math.random() * 16777215)/* .toString(16); */

console.log(randomColor);

do {
	Math.floor(Math.random() * 16777215);
} while (randomColor >= 15921906);
if (randomColor <= 15921905) {
	randomColor = "#" +  randomColor.toString(16);
}

console.log(randomColor)

	$(".subscribe-form").css({
		"background-color": randomColor,
	});


/* 
* Uma progressbar que dá o valor de 0 a 100 quando a página é carregada
*/	


	$(function () {
		let random = Math.floor(Math.random() * 100 )

		console.log(random)

		$("#progressbar").progressbar({
			value: random
		})
		if (random >= 99) {
				alert('Congratulations')
			};
		}
	);

console.log($("h4").text()); //*Forma insegura de utilizar o jQuery pois pode conflitar com outras bibliotecas em projetos maiores