const cnt = require('../config/everyPageCounts').count

const onePageBooks = (req, rsp) => {
	const items = req.params.items
	var currentPage = parseInt(req.query.p)
	if(!currentPage || currentPage <= 0) currentPage = 1;
	
	console.log('currentPage: ' + currentPage);
	
	const books = getPages(items, currentPage);
			
	if(books.length<=0)  {
		rsp.json({
			errno: -1,
			msg: 'get books failed...',
		})
	}
	else {
		data = {
			total: Math.ceil(items.length/cnt),
			currentPage: currentPage,
			detail: books
		};
		rsp.json({
			errno: 0,
			msg: 'success',
			data: data
		})
		console.log("total pages: " + data.total)
	}
}

function getPages(results, currentPage) {
	var books = new Array();
	for(var i = 0; i < cnt; i++) {
		index = cnt*(currentPage-1)+i;
		if(index >= results.length) break;
		books[i] = results[index];
	}
	return books;
}

console.log('get onePage books...')

module.exports = onePageBooks
