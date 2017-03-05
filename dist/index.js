(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {

	// pick between the local development url or the rawgit hosted 'production' url

	// url: 'http://localhost:9966/dist/'
	url: 'https://rawgit.com/vbachevhx/cookie-bookmarklet/master/dist/'
};
},{}],2:[function(require,module,exports){
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
},{"./config":1}]},{},[2]);
