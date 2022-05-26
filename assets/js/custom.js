//Instância jquery e evitar conflitos
/* jQuery(function ($) {
	$(" h4 "); //*tag
	$(".featired-item"); //*class
	$("#featured"); //*id
}); */

/* jQuery(function ($) { */
$(document).ready(function () {
	$(".owl-carousel").owlCarousel();

	let titulos = $(" h4 "); //*tag

	let items = $(".featured-item"); //*class

	let destaques = $("#featured"); //*id

	console.log(titulos.first());

	$(".featured-item a").addClass("btn btn-dark stretch-link");

	//Stretch-Link -- Torna toda área do link clicável, muito boa classe do Bootstrap

	$(".featured-item h4").append('<span class="badge bg-danger">Novo</span>');
	//Append substitui ou adiciona uma tag nova depois
	//Prepend substitui ou adiciona uma tag nova antes
	//After adiciona um texto depois
	//Before adiciona um texto antes
	//Hide adiciona display none em um elemento
	//Show readiciona o display no elemento
	//Fade adiciona uma transição ao elemento .fadeIn(2000) or .fadeOut(2000)
	/* let fi = $(".featured-item"); //Start loading CSS
	fi.css({
		"text-align": "center",
		"background-color": "wheat",
	}); */
	$(".featured-item img").fadeOut(1);
	$(".featured-item img").fadeIn(1000);
	/* $(".featured-item:first h4").css("color", "#f00"); */
	/* $(".featured-item").dblclick(function () {
		//dblclick - Double Click
		//OnClick CSS
		$(this).css({
			color: "#f00",
			background: "#ff0",
			border: "1px solid #fff",
			"font-weight": "100",
		});
	}); */

	//É possível colocar vários elementos de estilo de css pelo JavaScript com o código $('classe, id, name').css({

	//})
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

	//*Manipulação de evento

	$(".featured-item a").on("click", function (event) {
		//on('click', 'mouseenter', 'mouseleave', 'blur') /Blur: Quando tira o foco- Clicar no botão e depois clica fora -- Utilizado em campos de formulários
		event.preventDefault();

		alert("Produto esgotado");
	});

	$(".featured-item").on("mouseenter", function (event) {
		event.preventDefault();
		$(this).css({
			filter: "brightness(120%);",
			cursor: "pointer",
		});
	});
});

/* for (let i = 0; i < titulos.length; i++) {
	titulos[i].textContent = "titulo qualquer";
} */

console.log($("h4").text()); //Forma insegura de utilizar o jQuery pois pode conflitar com outras bibliotecas em projetos maiores
