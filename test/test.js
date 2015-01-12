var assert = require('assert'),
    nock = require('nock');
    _ = require('lodash');

describe('rhq-metrics-middleware', function() {
  var rhq = require('../');
  var middleware = rhq();

  it('should return an array of 3 middleware functions', function() {
    assert(middleware.length === 3);
    for (var i in middleware) {
      assert(typeof middleware[i] === 'function');
    }
  });

  // TODO: find a better way to get a handle on these functions
  // indexing into the array seems breaky
  it('should post load average metrics to RHQ', function(done) {
    var req, resp, called = false, next = function() { called = true; };
    var loadAverage = middleware[0];
    nock('http://localhost:8080')
      .filteringRequestBody(function(b) {
        var body = JSON.parse(b);
        assert(body.length === 3);
        assert(body[0].id === 'load-1');
        assert(body[1].id === 'load-5');
        assert(body[2].id === 'load-15');
        _.forEach(body, function(row) {
          assert(row.timestamp <= Date.now());
          assert(row.value > 0);
        });
      })
      .post('/rhq-metrics/metrics')
      .reply(201, {ok:true});
    loadAverage(req, resp, next);
    assert(called === true);
    done();
  });

  it('should post free memory metrics to RHQ', function(done) {
    var req, resp, called = false, next = function() { called = true; };
    var freeMemory = middleware[1];
    nock('http://localhost:8080')
      .filteringRequestBody(function(b) {
        var body = JSON.parse(b);
        assert(body.length === 1);
        _.forEach(body, function(row) {
          assert(row.id === 'free-memory');
          assert(row.timestamp <= Date.now());
          assert(row.value > 0);
        });
      })
      .post('/rhq-metrics/metrics')
      .reply(201, {ok:true});
    freeMemory(req, resp, next);
    assert(called === true);
    done();
  });

  it('should post response-time metrics to RHQ', function(done) {
    var req, resp = {}, called = false, next = function() { called = true; };
    var responseTime = middleware[2];
    resp.on = function(name, f) {
      assert(name === 'finish');
      f();
    };
    nock('http://localhost:8080')
      .filteringRequestBody(function(b) {
        var body = JSON.parse(b);
        assert(body.length === 1);
        _.forEach(body, function(row) {
          assert(row.id === 'response-time');
          assert(row.timestamp <= Date.now());
          assert(row.value >= 0);
        });
      })
      .post('/rhq-metrics/metrics')
      .reply(201, {ok:true});
    responseTime(req, resp, next);
    assert(called === true);
    done();
  });
});
