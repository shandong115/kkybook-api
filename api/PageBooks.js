const query = require('../db/sqldeal.js')
const cnt = require('../config/everyPageCounts').count

const allbooks = (req, rsp) => {
	// console.log('p='+req.query.p)
	var currentPage = parseInt(req.query.p)
	if(!currentPage || currentPage < 0) currentPage = 1;
	
	console.log('currentPage: ' + currentPage);
	
	var sqlStr = 'Select t1.book_id, t1.title, t1.author, t2.img_path \
				from book_meta t1, book_info t2 \
				where t1.book_id and t2.book_id=t1.remark order by t1.book_id desc';
	query(sqlStr,(err, results, fields) => {
		if(err) throw err;
		console.log('total items: '+results.length)
		items = getPages(results, currentPage);
		
		if(items.length<=0)  {
			rsp.json({
				errno: -1,
				msg: 'query failed...',
			})
		}
		else {
			data = {
				total: Math.ceil(results.length/cnt),
				currentPage: currentPage,
				detail: items
			};
			rsp.json({
				errno: 0,
				msg: 'success',
				data: data
			})
			console.log("total pages: " + data.total)
		}		
	});
}

function getPages(results, currentPage) {
	var items = new Array();
	for(var i = 0; i < cnt; i++) {
		index = cnt*(currentPage-1)+i;
		if(index >= results.length) break;
		items[i] = results[index];
	}
	return items;
}

console.log('get all books...')

module.exports = allbooks 
