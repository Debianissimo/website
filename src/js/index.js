/*
		 _____
		|  ___|_ _ ___ _ __ ___    __ _  __ _
		| |_ / _` / __| '_ ` _ \  / _` |/ _` |
		|  _| (_| \__ \ | | | | || (_| | (_| |
		|_|  \__,_|___/_| |_| |_(_)__, |\__,_|
															|___/
	
	-> Name: index.js
	-> Description: The main backend script for the webpage.
	-> Resource: /src/js/index.js
	-> Licensing: GPLv3 | © 2022, Fasm.ga
*/

/*** —————————————————— ***//*** —————————————————— ***//*** —————————————————— ***//*** —————————————————— ***/


// This script will be executed
// Place your code here!

/* JS debug page code */
let debugForm = $('#debug');
let repl = $('#repl');

debugForm.on('submit', (event) => {
	event.preventDefault();
	debug(
		repl.val(), (result, error)=>{
			let info_type = error ? 'error' : 'info';
			let info_title = error ? error.constructor.name : repl.val();
			$('#result')
			.attr('type', info_type)
			.attr('title', info_title)
			.text(result);
		}
	);
	if (repl.val() === "2+3") { go("https://billwurtz.com/2plus3.mp4"); }
});