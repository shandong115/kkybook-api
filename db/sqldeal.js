const mysql = require('mysql')
const { mysql : mysqlConfig } = require('../config/db.js')

console.log('host: '+mysqlConfig.host)
console.log('user: '+mysqlConfig.user)
console.log('password: '+mysqlConfig.password)
console.log('database: '+mysqlConfig.database)
console.log('port: '+mysqlConfig.port)

const conn_pool = mysql.createPool({
	host: mysqlConfig.host,
	user: mysqlConfig.user,
	password: mysqlConfig.password,
	database: mysqlConfig.database,
	port: mysqlConfig.port
});

const query = function(sql, option, callback) {
	conn_pool.getConnection(function(err, connection) {
		if(err) console.error(err);
		
		if(connection) {
			connection.query(sql, option, function(error, results, fields) {
				connection.release();
				if(error) throw error;
				callback(error, results, fields);
			});
		}
	});
};

module.exports = query;
