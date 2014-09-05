var webdriverjs = require('webdriverio'),
    assert      = require('assert');

var browserStackClientOptions = {
  desiredCapabilities: {
    browserName: 'android',
    version: '4.0',
    device: 'Samsung Galaxy Nexus',
    "browserstack.local": true,
    "browserstack.debug": true
  },
  host: 'hub.browserstack.com',
  port: 80,
  user : process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  logLevel: 'silent',
};

var localClientOptions = { desiredCapabilities: {browserName: 'chrome'} };

describe('phoneinput', function(){

    this.timeout(99999999);
    var client = {};
    var co;

    if (process.env.BROWSERSTACK_USERNAME) {
      co = browserStackClientOptions;
    }
    else {
      co = localClientOptions;
    }

    before(function(done){
      client = webdriverjs.remote(co);
      client.init().
        url('http://localhost:8080')
        .pause(1000)
        .call(done);
    });

    it('formats phone numbers', function(done) {
      client
        .setValue('#phoneinput', '1231231234')
        .getValue('#phoneinput', function(err, value) {
          assert(err === undefined);
          assert(value === '(123) 123 - 1234');
        })
      .call(done);
    });

    it('handles the backspace key', function(done) {
      client
        .setValue('#phoneinput', '1231231234\b\b\b\b\b55555')
        .getValue('#phoneinput', function(err, value) {
          assert(err === undefined);
          assert(value === '(123) 125 - 5555');
        })
      .call(done);
    });

    it('wont freak out if you press the same key a lot', function(done) {
      client
        .setValue('#phoneinput', '55555555555555555555555555555555555555555')
        .getValue('#phoneinput', function(err, value) {
          assert(err === undefined);
          assert(value === '(555) 555 - 5555');
        })
      .call(done);
    });

    it('handles cut and paste', function(done) {
      client
        .setValue('#phoneinput', '1231231234')
        .addValue('#phoneinput', ['Control', 'c'])
        .getValue('#phoneinput', function(err, value) {
          assert(err === undefined);
          assert(value === '(123) 123 - 1234');
        })
        .addValue('#phoneinput', ['Control', 'a'])
        .addValue('#phoneinput', ['Control', 'x'])
        .getValue('#phoneinput', function(err, value) {
          assert(err === undefined);
          assert(value === '');
        })
        .addValue('#phoneinput', ['Control', 'v'])
        .getValue('#phoneinput', function(err, value) {
          assert(err === undefined);
          assert(value === '(123) 123 - 1234');
        })

      .call(done);
    });

    it('wont let you put alpha characters', function(done) {
      client
        .setValue('#phoneinput', 'foobar1foo2foobar3')
        .getValue('#phoneinput', function(err, value) {
          assert(err === undefined);
          assert(value === '(123) ');
        })
      .call(done);
    });


    after(function(done) {
        client.end(done);
    });
});
