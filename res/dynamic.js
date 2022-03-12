/*
	Appends dynamic properties to the resources object
*/
res.pages['_home'] = $('main > section').attr('id') ?? "#_null";
res.themes['_auto'] = window.matchMedia('(prefers-color-scheme: light)').matches
										? res.themes.light
										: res.themes.dark;