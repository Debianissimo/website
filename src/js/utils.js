/*
     _____
    |  ___|_ _ ___ _ __ ___    __ _  __ _
    | |_ / _` / __| '_ ` _ \  / _` |/ _` |
    |  _| (_| \__ \ | | | | || (_| | (_| |
    |_|  \__,_|___/_| |_| |_(_)__, |\__,_|
                              |___/

	-> Name: utils.js
	-> Description: General utility/debugging functions
	-> Resource: /src/js/utils.js
	-> Licensing: GPLv3 | © 2022, Fasm.ga
*/

/*** —————————————————— ***//*** —————————————————— ***//*** —————————————————— ***//*** —————————————————— ***/


/* The document body in jQuery */
const body =()=> $(document.body);

/* Get the current browser location */
let href =()=> window.location.href;

/* Change the user's location */
function go(href) {
	window.location.href = href;
	return href;
}

/* Get the current user's theme */
let theme =()=> $(res.css.colorScheme).attr('href');

/* Change the current webpage theme */
function setTheme(themeName) {
	let path = themeName;
	// Check if the given theme name exists in the res.themes list, if so gets
	// the associated path
	if (themeName in res.themes) { path = res.themes[themeName]; }
	// Applies the theme by changing the href attribute of the colorscheme object
	// because CSS does not allow dynamic imports
	$(res.css.colorScheme).attr('href', path);
	return theme();
}

/* Handling screen sizes */
function screenSmaller(size) {
	return window.matchMedia(`only screen and (max-width: ${size}px)`).matches;
}
function screenLarger(size) {
	return window.matchMedia(`only screen and (min-width: ${size}px)`).matches;
}

let isDesktop =()=> screenLarger(settings.ux.desktopScreen);
let isTablet =()=> screenLarger(settings.ux.tabletScreen) && screenSmaller(settings.ux.desktopScreen);
let isMobile =()=> screenSmaller(settings.ux.mobileScreen);

/* Switch between UI modes */
function setUI(device) {
	res.ui[device].forEach(expr => {
		return eval(expr)
	});
}

/* Return the CSS root element */
// Selecting :root in jQuery will return the :root element from the CSS, this
// allows us to conveniently access and modify variables declared in :root by
// simply calling the jQuery .css() method
let root =()=> $(':root');

/* Get or set the value a CSS style variable */
function styleVar(name, value = null) {
	// Check if the name starts with -- (the CSS variable syntax):
	// if it doesn't, prepend it automatically
	if (!name.startsWith('--')) { name = `--${name}`; }
	// Return the value using jQuery and, if specified, modify its current
	// value
	let arguments = [name]; // we use an array to give the function the arguments
	// To allow for method chaining, the jQuery css() function will return "this"
	// even if "value" is null. So the function can't return the value of the
	// variable we asked for.
	// To account for this we just check if value is the default, aka null, and
	// if so, we add that to our list of arguments.
	if (value !== null) { arguments.push(value); }
	return root().css(...arguments);
}

/* Get the user's current working page */
let section =()=> window.location.hash.replace('#', '');

/* The page's header */
let header =()=> $('header').first();

/* The page's footer */
let footer =()=> $('footer').last();

/* Move to a specific section of the website */
function moveTo(page) {
	let path = page;
	// Check if the page exists in the pages list
	// If so, move to the associated path
	if (page in res.pages) { path = res.pages[page]; }
	// Add a leading # hash to the given string if not already present
	if (!path.startsWith("#")) { path = `#${path}`; }
	// Move to the specified section; it just adds #section to the URL
	window.location.hash = path;
	return section();
}

/* Convenience functions for quicker debugging */
const dark =()=> setTheme('dark');
const light =()=> setTheme('light');
const desktop =()=> setUI('desktop');
const tablet =()=> setUI('tablet');
const mobile =()=> setUI('mobile');