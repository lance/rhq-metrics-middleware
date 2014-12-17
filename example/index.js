var rhq = require('../');

var express = require('express');
var app = express();

app.set('port', 9000);
app.use(rhq());

app.get('/*', function(req, res) {
  res.send('Well hello there');
});

var server = app.listen(app.settings.port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});
