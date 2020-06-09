const query = require('../db/sqldeal.js')
const cnt = require('../config/everyPageCounts').count

const allbooks = (req, rsp) => {
	console.log('p='+req.query.p)
	var currentPag = parseInt(req.query.p)
	if(!currentPag || currentPag < 0) currentPag = 1;
	
	console.log('currentPag: ' + currentPag);
	
	var sqlStr = 'Select t1.book_id, t1.title, t1.author, t2.img_path \
				from book_meta t1, book_info t2 \
				where t1.book_id and t2.book_id=t1.remark order by t1.book_id desc';
	query(sqlStr,(err, results, fields) => {
		if(err) throw err;
		console.log('length: '+results.length)
		items = getPages(results, currentPag);
		
		if(items.length<=0)  {
			rsp.json({
				errno: -1,
				msg: 'query failed...',
			})
		}
		else {
			data = {
				total: Math.ceil(results.length/cnt),
				currentPag: currentPag,
				detail: items
			};
			rsp.json({
				errno: 0,
				msg: 'success',
				data: data
			})
		}		
	});
}

function getPages(results, currentPag) {
	var items = new Array();
	for(var i = 0; i < cnt; i++) {
		index = cnt*(currentPag-1)+i;
		if(index >= results.length) break;
		items[i] = results[index];
	}
	return items;
}

console.log('get all books...')

module.exports = allbooks 
