const http = require('http');
const logger = require('./logger');
const reporter = require('./reportingService')
const server = http.createServer((req, res) => {
    console.log('TODO...');
    logger.log('Request - ' + req.url)
    reporter.collect('get')
    res.end()
})

server.listen(5000);

console.log('Server is listening on port 5000...')