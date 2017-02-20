'use strict';
(function() {
  var _container = null;
  // var _baseUrl = 'http://localhost:8080/';
  var _baseUrl = 'https://rawgit.com/vbachev/js-cookie-editor/master/';
  var _tests = [];
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
        '<div class="ccc-contents">{{variants}}</div>' +
      '</li>',

    variant: '' +
      '<input type="radio" class="ccc-variant-radio" id="{{variantId}}" name="{{name}}" value="{{value}}" {{selected}} />' +
      '<label class="ccc-variant" for={{variantId}}>' +
        '{{value}}' +
        '<span class="ccc-weight">{{weight}}</span>' +
      '</label>',

    noTests: '' +
      '<li class="ccc-item">' +
        '<label class="ccc-name">No ABBA tests on this page.</label>' +
      '</li>'
  };

  function getTests() {
    if (!window.hx || !hx.abba) {
      return [];
    }

    var tests = [];
    for (var key in hx.abba._tests) {
      tests.push({
        name: key,
        variants: hx.abba._tests[key]._cachedAbba.variants.map(function(variant) {
          return {
            value: variant.name,
            weight: variant.weight,
            chosen: hx.abba._tests[key]._cachedAbba.chosen.name == variant.name,
            control: Boolean(variant.control)
          };
        })
      });
    }
    return tests;
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
    _tests = getTests();
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
    var itemsMarkup = itemsMarkup = _templates.noTests;
    if (_tests.length) {
      itemsMarkup = _tests.reduce(function(markup, test, index) {
        var variantsMarkup = test.variants.reduce(function(vMarkup, variant, variantIndex) {
          return vMarkup + parseTemplate(_templates.variant, {
            variantId: 'cccItem' + index + 'v' + vIndex,
            name: test.name,
            value: variant.value,
            weight: variant.weight,
            selected: variant.chosen ? 'selected' : ''
          });
        }, '');
        return markup + parseTemplate(_templates.item, {
          toggleId: 'cccItem' + index,
          name: test.name,
          variants: variantsMarkup
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
