const query = require('../db/sqldeal.js');

function BaseData () {
	var items;
	this.setItems = function () {
		let sqlStr = 'Select t1.book_id, t1.title, t1.author,t1.size, t2.img_path \
					from book_meta t1, book_info t2 \
					where t1.isOk=1 and t2.book_id=t1.remark order by t1.book_id desc';
		console.log(sqlStr)
		query(sqlStr,(err, results, fields) => {
			if(err) throw err;
			console.log('total items: '+results.length);
			items = results;
		});
	}
	this.getItems = function () {
		return items;
	}
}

console.log('get baseData...');

module.exports = BaseData;
