/*
		 _____
		|  ___|_ _ ___ _ __ ___    __ _  __ _
		| |_ / _` / __| '_ ` _ \  / _` |/ _` |
		|  _| (_| \__ \ | | | | || (_| | (_| |
		|_|  \__,_|___/_| |_| |_(_)__, |\__,_|
															|___/
	
	-> Name: debugger.js
	-> Description: Scripts and functions to help in debugging
	-> Resource: /src/js/debugger.js
	-> Licensing: GPLv3 | © 2022, Fasm.ga
*/

/*** —————————————————— ***//*** —————————————————— ***//*** —————————————————— ***//*** —————————————————— ***/


function debug(
	expr,
	handler = (response, error) => {
		return {
			response: response,
			error: error ?? null
		};
	}
) {
	let result, error;
	try {
		// 1— Evaluate the expression. Assigns the value to the result variable. If
		//                             the operation completes successfully with no
		//                             errors, jump to the finally block.
		result = eval(expr);
	} catch (e) {
		//                             If an error is thrown, catch it and store it
		//                             in the error variable.
		error = e;
	} finally {
		// 2— Call the handler function, with the proper arguments.
		handler(result, error);
	}
}