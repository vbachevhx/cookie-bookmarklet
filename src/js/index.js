'use strict';

(function(){

	var config = require('./config');
	var bookmarkletSource = "(function(){"
		+ "var scriptTag = document.createElement('script');"
		+ "scriptTag.setAttribute('src', '" + config.url + "cookie_bookmarklet.js');"
		+ "document.body.appendChild(scriptTag);})()";

	// set the correct HREF value to the bookmarklet anchor tag
	document.getElementById('bookmarkletLink')
		.setAttribute('href', 'javascript:' + encodeURIComponent(bookmarkletSource));

})();