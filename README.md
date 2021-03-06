#phoneinput

A javascript input masking library that only supports 1 thing: north american phone numbers, and actually works pretty well on old Android browsers.

It formats numbers like this: (123) 123 - 1234

Requires that you have jquery installed and available as `window.jQuery`

Tested on IE8+, Android 4.0+, and modern browsers.

Based on code from [formance.js](http://omarshammas.github.io/formancejs) which is itself a fork of [jQuery.payment](https://github.com/stripe/jquery.payment)

## Demo

See the demo here: http://realgeeks.github.io/phoneinput/

## Usage

Make sure you are using jquery already:

```html
<script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
```

and add the script tag:

```html
<script src="phoneinput.min.js"></script>
```

Make an input like this:

```html
<input type="tel" class="phone_number" placeholder="Phone Number">
```

then call the `phoneinput` function on the input:

```html
  <script>
  $(document).ready(function() {
    phoneinput($('input.phone_number'));
  });
  </script>
```

## Special features
Applies a special hack to older android browsers that keeps the weird "ghost input" from appearing over the top of your normal input when used inside an iframe.  More about that bug can be found [in the android bugtracker](https://code.google.com/p/android/issues/detail?id=30964)

## Caveats
We have to apply a hack to older android browsers that prevents the input type=tel popup keyboard from working like a telephone keypad in those browsers.  It still works like a normal keyboard though.

## Testing

phoneinput uses webdriver for testing, so you have to do a bit of setup:

  1. Install selenium-standalone:
  ```
  npm install selenium-standalone -g
  ```
  2. Start selenium-standalone:
  ```
  start-selenium -debug
  ```
  3. run `gulp test`


If you want to test on browserstack, you'll need a browserstack account.  Then you can run:

```bash
BROWSERSTACK_USERNAME=your@username.org BROWSERSTACK_ACCESS_KEY=youraccesskey gulp test
```

You can use browserstack to test some older android browsers
