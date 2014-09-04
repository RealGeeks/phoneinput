var phoneinput = require('../src/phoneinput');
var assert = require('assert');
var jsdom = require('jsdom').jsdom;
var document = jsdom("<html></html>");
global.window = document.parentWindow;
global.window.navigator = {};
global.window.navigator.userAgent = 'jsdom';
global.$ = require('jquery').create(global.window);

var typeChars = function($elem, text) {
  for (i=0;i<text.length;i++) {
    var keyCode = text[i].charCodeAt(0);
    $elem.val($elem.val() + text[i]);
    $elem.trigger($.Event('keypress', {keyCode: keyCode, which: keyCode}));
  }
}

describe('phoneinput', function() {
  it('formats phone numbers', function() {
    $input = $('<input type=tel>');
    phoneinput($input);
    typeChars($input, '1231231234');
    assert.equal($input.val(), '(123) 123-1234');
  })
})
