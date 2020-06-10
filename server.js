const express = require('express')
const server = express()
const port = require('./config/server-port').port
const baseData = require('./api/baseData.js')

const items = baseData()
console.log('item length: ' + items.length)

server.all('*', function(req, rsp, next) {
    rsp.header("Access-Control-Allow-Credentials", true)
    rsp.header("Access-Control-Allow-Origin", "*")
    rsp.header("Access-Control-Allow-Headers", "X-Requested-With")
    rsp.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    rsp.header("X-Powered-By", ' 3.2.1')
    rsp.header("Content-Type", "application/json;charset=utf-8")
    next()
});

server.get('/', (req, rsp) => {
	rsp.send('Hello DaYou!')
})

server.get('/pageBooks', require('./api/PageBooks.js'))

server.listen(port, () => {
	console.log(`the server is listening on port ${port}!`)
})