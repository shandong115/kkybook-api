const express = require('express');
const server = express();
const port = require('./config/server-port').port;
const BaseData = require('./api/baseData.js');

const baseData = new BaseData();

baseData.setItems();

server.all('*', function(req, rsp, next) {
    rsp.header("Access-Control-Allow-Credentials", true)
    rsp.header("Access-Control-Allow-Origin", "*")
    rsp.header("Access-Control-Allow-Headers", "X-Requested-With")
    rsp.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    rsp.header("X-Powered-By", ' 3.2.1')
    rsp.header("Content-Type", "application/json;charset=utf-8")
    next()
});

var cb = function(req, rsp, next) {
	console.log('this is the first cb.');
	req.params['items'] = baseData.getItems();
	next();
}

server.get('/', (req, rsp) => {	
	rsp.send('Hello DaYou!')
})

server.get('/onePageBooks', [cb], require('./api/onePageBooks.js'))

server.listen(port, () => {
	console.log(`the server is listening on port ${port}!`)
})

