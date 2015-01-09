/*!
 * Copyright 2015 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * # rhq-metrics-middleware
 *
 * Middleware for express and connect apps to inject system and site data into
 * `rhq-metrics` as timeseries data. See also: 
 *
 * https://github.com/rhq-project/rhq-metrics
 * https://github.com/lance/rhq-metrics-js
 *
 * [Usage example](example/index.js.html)
 */


/**
 * Obtain the middleware functions for connect/express. See usage above.
 * `options.host` - the server hostname. Defaults to `'localhost'`
 * `options.port` - the server port. Defaults to `8080`
 * `options.path` - the REST API path. Defaults to `'/rhq-metrics/metrics'`
 *
 * @param {Object} opts RHQ server connection options
 * @returns {Array} An array of middleware functions.
 */
function rhq(opts) {

  function loadAverage(req, res, next) {
    var rhq = new RHQ(opts);
    var load = os.loadavg();
    var time = Date.now();
    rhq.post([
        {id:'load-1', value:load[0], timestamp:time},
        {id:'load-5', value:load[1], timestamp:time},
        {id:'load-15', value:load[2], timestamp:time}]);
    next();
  }

  function freeMemory(req, res, next) {
    var rhq = new RHQ(opts);
    rhq.post({id:'free-memory', value:os.freemem(), timestamp:Date.now()});
    next();
  }

  function responseTime(req, res, next) {
    var rhq = new RHQ(opts);
    var start = Date.now();
    res.on('finish', function() {
      var end = Date.now();
      rhq.post({id:'response-time', value:end-start, timestamp:end});
    });
    next();
  }

  return [loadAverage, freeMemory, responseTime];
}


/** @ignore */
var os  = require('os'),
    RHQ = require('rhq-metrics');

module.exports = rhq;
