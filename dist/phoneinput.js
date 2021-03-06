(function($) {
var detectAndroid = function() {
  var navU = window.navigator.userAgent;
  // Android Mobile
  var isAndroidMobile = navU.indexOf('Android') > -1 && navU.indexOf('Mozilla/5.0') > -1 && navU.indexOf('AppleWebKit') > -1;
  // Android Browser (not Chrome)
  var regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/);
  var resultAppleWebKitRegEx = regExAppleWebKit.exec(navU);
  var appleWebKitVersion = (resultAppleWebKitRegEx === null ? null : parseFloat(regExAppleWebKit.exec(navU)[1]));
  var isAndroidBrowser = isAndroidMobile && appleWebKitVersion !== null && appleWebKitVersion < 537;
  return isAndroidBrowser;
};

var hasTextSelected = function($target) {
  var _ref;

  if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== $target.prop('selectionEnd')) {
    return true;
  }
  if (typeof document !== "undefined" && document !== null ? (_ref = document.selection) != null ? typeof _ref.createRange === "function" ? _ref.createRange().text : void 0 : void 0 : void 0) {
    return true;
  }
  return false;
};

var restrictNumeric = function(e) {
  var $target, input;

  $target = $(e.target);
  if (e.metaKey || e.ctrlKey) {
    return true;
  }
  if (e.which === 32) {
    return false;
  }
  if (e.which === 0) {
    return true;
  }
  if (e.which < 33) {
    return true;
  }
  input = String.fromCharCode(e.which);
  return !!/[\d\s]/.test(input);
};

var restrictPhoneNumber = function(e) {
  var $target, digit, value;

  $target = $(e.currentTarget);
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  if (hasTextSelected($target)) {
    return;
  }
  value = $target.val() + digit;
  value = value.replace(/\D/g, '');
  if (value.length > 10) {
    return false;
  }
};


var reFormatPhoneNumber = function(phoneNumberString) {
  var areaCode, first3, last4, phoneNumber, text, _ref;

  phoneNumber = phoneNumberString.replace(/\D/g, '').match(/^(\d{0,3})?(\d{0,3})?(\d{0,4})?$/);
  _ref = phoneNumber, phoneNumber = _ref[0], areaCode = _ref[1], first3 = _ref[2], last4 = _ref[3];
  text = '';
  if (areaCode != null) {
    text += "(" + areaCode;
  }
  if ((areaCode != null ? areaCode.length : void 0) === 3) {
    text += ") ";
  }
  if (first3 != null) {
    text += "" + first3;
  }
  if ((first3 != null ? first3.length : void 0) === 3) {
    text += " - ";
  }
  if (last4 != null) {
    text += "" + last4;
  }
  return text;
};

var formatPhoneNumber = function(e) {
  var $target, digit, text, val;

  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  $target = $(e.currentTarget);
  val = $target.val() + digit;
  try {
  text = reFormatPhoneNumber(val);
  }
  catch(error) {
    return;
  }
  e.preventDefault();
  return $target.val(text);
};

var formatBackPhoneNumber = function(e) {
  var $target, value;

  if (e.meta) {
    return;
  }
  $target = $(e.currentTarget);
  value = $target.val();
  if (e.which !== 8) {
    return;
  }
  if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
    return;
  }
  if (/\(\d$/.test(value)) {
    e.preventDefault();
    return $target.val('');
  } else if (/\d\)(\s)+$/.test(value)) {
    e.preventDefault();
    return $target.val(value.replace(/\d\)(\s)*$/, ''));
  } else if (/\d(\s|\-)+$/.test(value)) {
    e.preventDefault();
    return $target.val(value.replace(/\d(\s|\-)+$/, ''));
  }
};

var formatPastePhoneNumber = function(e) {
  return setTimeout(function() {
    var $target, text, val;

    $target = $(e.currentTarget);
    val = $target.val();
    text = reFormatPhoneNumber(val);
    return $target.val(text);
  });
};

var applyAndroidHacks = function() {
  $('input.phone_number').css('-webkit-user-modify','read-write').css('outline-style', 'none').css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');
};

var phoneinput = function($elem) {
  $elem.on('keypress', restrictNumeric);
  $elem.on('keypress', restrictPhoneNumber);
  $elem.on('keypress', formatPhoneNumber);
  $elem.on('keydown', formatBackPhoneNumber);
  $elem.on('paste', formatPastePhoneNumber);
  if (detectAndroid()) {
    applyAndroidHacks();
  }
};

window.phoneinput = phoneinput
})(jQuery);
