# rhq-metrics-middleware

Middleware for express and connect apps to inject system and site data into
rhq-metrics as timeseries data.

## Usage

    // load the RHQ middleware module
    var rhq = require('rhq-metrics-middleware');

    var express = require('express');
    var app = express();

    app.set('port', 9000);

    // Use the rhq-metrics-middleware module.
    // By default the module will insert the following data:
    // load-1: 1 minute load average. See `os.loadavg()`
    // load-5: 5 minute load average. See `os.loadavg()`
    // load-15: 15 minute load average. See `os.loadavg()`
    // free-memory: Current free memory. See `os.freemem()`
    // response-time: Response time for the current request.
    app.use(rhq({
      host: 'metricserver.mydomain.com', // default is localhost
      port: 4567, // default is 8080
      path: '/rhq-metrics/metrics' // default
      }));

    app.get('/*', function(req, res) {
      res.send('Well hello there');
    });

    var server = app.listen(app.settings.port, function () {
      var addr = server.address();
      console.log('listening at http://%s:%s', addr.address, addr.port);
    });
