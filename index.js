var os  = require('os'),
    RHQ = require('rhq-metrics');

function metrics(opts) {
  var rhq = new RHQ(opts);

  return [loadAverage, freeMemory, responseTime];
}

function loadAverage(req, res, next) {
  var load = os.loadavg();
  var time = Date.now();
  rhq.post([
      {id:'load-1', value:load[0], timestamp:time},
      {id:'load-5', value:load[1], timestamp:time},
      {id:'load-15', value:load[2], timestamp:time}]
      );
  next();
}

function freeMemory(req, res, next) {
  rhq.post({id:'free-memory', value:os.freemem(), timestamp:Date.now()});
  next();
}

function responseTime(req, res, next) {
  var start = Date.now();
  res.on('finish', function() {
    var end = Date.now();
    rhq.post({id:'response-time', value:end-start, timestamp:end});
  });
  next();
}

module.exports = metrics;
