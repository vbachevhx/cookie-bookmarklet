'use strict';
(function() {
  var _container = null;
  // var _baseUrl = 'http://localhost:8888/';
  _baseUrl = 'https://rawgit.com/vbachevhx/js-cookie-editor/master/';
  var _cookies = [];
  var _templates = {
    list: '' +
      '<div class="ccc-popup">' +
        '<div class="ccc-title">Cookie Editor</div>' +
        '<ul class="ccc-list">{{items}}</ul>' +
      '</div>',

    item: '' +
      '<li class="ccc-item">' +
        '<input class="ccc-toggle" type="radio" id="{{toggleId}}" name="ccc-toggle" />' +
        '<label class="ccc-name" for="{{toggleId}}">{{name}}</label>' +
        '<div class="ccc-contents">' +
          '<input class="ccc-value-input" value="{{value}}" name="{{name}}" />' +
          '<button class="ccc-button ccc-update">Update</button>' +
          '<button class="ccc-button ccc-delete">Delete</button>' +
        '</div>' +
      '</li>',

    noCookies: '' +
      '<li class="ccc-item">' +
        '<label class="ccc-name">No cookies on this page.</label>' +
      '</li>'
  };

  function getCookies() {
    return document.cookie.split(';')
      // return as {name, value} pairs
      .map(function(record) {
        var parts = record.trim().split('=');
        return {
          name: parts[0],
          value: parts[1]
        };
      })
      // skip empty items (e.g. when no cookies are found)
      .filter(function(cookie){
        return Boolean(cookie.name);
      })
      // sort alphabetically
      .sort(function(a, b) {
        return a.name > b.name;
      });
  }

  function setCookie(name, value) {
    document.cookie = name + '=' + value;
  }

  function deleteCookie(name) {
    if(confirm('Will delete cookie named ' + name)){
      document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }

  function create() {
    _cookies = getCookies();
    createContainer();
    loadCSS();
  	_container.addEventListener('click', handleClick);
  }

  function destroy() {
    document.body.removeChild(_container);
  }

  function createContainer() {
    _container = document.createElement('div');
    _container.classList.add('ccc-wrapper');
    _container.innerHTML = getContents();
    document.body.appendChild(_container);
  }

  function loadCSS() {
  	var styleTag = document.createElement('link');
  	styleTag.setAttribute('rel', 'stylesheet');
  	styleTag.setAttribute('href', _baseUrl + 'cookie_bookmarklet.css');
  	_container.appendChild(styleTag);
  }

  function getContents() {
    var itemsMarkup = itemsMarkup = _templates.noCookies;
    if (_cookies.length) {
      itemsMarkup = _cookies.reduce(function(markup, cookie, index) {
        return markup + parseTemplate(_templates.item, {
          toggleId: 'cccItem' + index,
          name: cookie.name,
          value: cookie.value
        });
      }, '');
    }
    return parseTemplate(_templates.list, { items: itemsMarkup });
  }

  function parseTemplate(template, values) {
    for (var key in values) {
      var rx = new RegExp('{{' + key + '}}', 'g');
      template = template.replace(rx, values[key]);
    }
    return template;
  }

  function handleClick(event) {
  	if (event.target === event.currentTarget) {
      // click on the container element (gray overlay)
  		destroy();
  	} else if (event.target.classList.contains('ccc-button')) {
      handleButtonClick(event.target);
    }
  }

  function handleButtonClick(button) {
    var input = button.parentNode.querySelectorAll('.ccc-value-input')[0];
    if (button.classList.contains('ccc-update')) {
      // click on the Update button
      setCookie(input.name, input.value);
    } else if (button.classList.contains('ccc-delete')) {
      // click on the Delete button
      deleteCookie(input.name);
    }
    destroy();
  }

  create();
})();
