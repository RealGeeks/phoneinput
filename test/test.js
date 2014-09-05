var phoneinput = require('../src/phoneinput'); var assert = require('assert'); 
var $ = require('jquery');

var sendEvent = function($elem, eventType, keyCode) {
  var event = $.Event(eventType, {keyCode: keyCode, which: keyCode});
  var oldPreventDefault = event.preventDefault;
  var preventDefaultCalled = false;
  event.preventDefault = function() {
    preventDefaultCalled = true;
    return oldPreventDefault.apply(this, arguments);
  };
  $elem.trigger(event);
  return preventDefaultCalled;
}

var typeChar = function($elem, char) {
  var keyCode = char.charCodeAt(0);
  var keyDownPreventDefaultCalled = sendEvent($elem, 'keydown', keyCode);
  var keyPressPreventDefaultCalled = sendEvent($elem, 'keypress', keyCode);
  if (keyDownPreventDefaultCalled || keyPressPreventDefaultCalled) {
    return;
  }

  var val = $elem.val();
  if (char === '\b') {
    $elem.val(val.substring(0, val.length - 1));
  }
  else {
    $elem.val(val + char);
  }
};

var typeChars = function($elem, text) {
  for (i=0;i<text.length;i++) {
    typeChar($elem, text[i]);
  }
};

var pasteChars = function($elem, text) {
  $elem.val(text);
  $elem.trigger($.Event('paste'));
};

describe('phoneinput', function() {
  it('formats phone numbers', function(done) {
    var $input = $('<input type="tel"/>');
    phoneinput($input);
    typeChars($input, '1231231234');
    setTimeout(function() {
      assert.equal($input.val(), '(123) 123 - 1234');
      done();
    }, 1000);
  });
  it('handles the backspace key', function() {
    var $input = $('<input type="tel"/>');
    phoneinput($input);
    typeChars($input, '1231231234\b\b\b\b\b55555');
    assert.equal($input.val(), '(123) 125 - 5555');
  });

  it('doesnt freak out if you press the same key a lot', function() {
    var $input = $('<input type="tel"/>');
    phoneinput($input);
    typeChars($input, '55555555555555555555555555555555555555555');
    assert.equal($input.val(), '(555) 555 - 5555');
  });

  it('handles pasted phone numbers', function() {
    var $input = $('<input type="tel"/>');
    pasteChars($input, '123-123-1234');
    phoneinput($input);
    assert.equal($input.val(), '(123) 123 - 1234');
  });

  it('wont let you put alpha characters', function() {
    var $input = $('<input type="tel"/>');
    typeChars($input, 'foobar1foo2foobar3');
    phoneinput($input);
    assert.equal($input.val(), '(123)');
  });
})
