# Sample rhq-metrics-middleware usage

This is a very basic express.js example. To run this example locally, you'll
need to have the rhq-metrics server up and running. The easiest path to
success here is to clone the `rhq-metrics` repo and run `start.sh`. This will
download all of the server dependencies, including the Wildfly application
server. It will take a little while to do this, but once it's done you'll
have a fully functional server responding to REST API requests at
http://localhost:8080.

    $ git clone https://github.com/rhq-project/rhq-metrics.git
    ...
    $ cd rhq-metrics
    $ ./start.sh

Once you've run `start.sh` once, you don't need to download and build
everything again. You can just run the server from the build target.

    $ ./target/wildfly-8.1.0.Final/bin/standalone.sh -Drhq-metrics.backend=mem --debug 8787 -b 0.0.0.0

If you want to play around with rhq-metrics itself, then browse to
`http://localhost:8080/explorer`. If you are eager to see this middleware in
action, you can now start the express.js app.

    $ npm install
    ...
    $ npm start

If all goes well, you can now browse to any path at http://localhost:9000 and
data will be generated and inserted into your rhq-metrics server. You can use
curl to fetch and view the data from the rhq-metrics server.

    $ curl -i http://localhost:8080/rhq-metrics/metrics/free-memory
    HTTP/1.1 200 OK
    X-Powered-By: Undertow/1
    Access-Control-Allow-Headers: origin,accept,content-type
    Server: WildFly/8
    Date: Thu, 18 Dec 2014 14:29:25 GMT
    Connection: keep-alive
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Credentials: true
    Transfer-Encoding: chunked
    Content-Type: application/json
    Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, HEAD
    Access-Control-Max-Age: 259200

    [{"timestamp":1418912920667,"value":8.16873472E8},{"timestamp":1418912920098,"value":8.16832512E8},{"timestamp":1418912916147,"value":8.31991808E8},{"timestamp":1418912918280,"value":8.17975296E8},{"timestamp":1418912916840,"value":8.2857984E8},{"timestamp":1418912915236,"value":8.37492736E8},{"timestamp":1418912920599,"value":8.16324608E8},{"timestamp":1418912916070,"value":8.34809856E8},{"timestamp":1418912917251,"value":8.20744192E8},{"timestamp":1418912921671,"value":8.17139712E8},{"timestamp":1418912916412,"value":8.26916864E8},{"timestamp":1418912918356,"value":8.15054848E8},{"timestamp":1418912916360,"value":8.30701568E8},{"timestamp":1418912914406,"value":9.28268288E8},{"timestamp":1418912917199,"value":8.2235392E8},{"timestamp":1418912921617,"value":8.1956864E8},{"timestamp":1418912916912,"value":8.25643008E8},{"timestamp":1418912920039,"value":8.35203072E8}]

Or browse to the URL in your browser to view the data rendered as XML.
