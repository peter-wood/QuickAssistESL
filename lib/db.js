var db = (function() {

	var test = function() {
		var client = require('mongodb').MongoClient,
    	            format = require('util').format;

		client.connect('mongodb://127.0.0.1:27017/quickassist', function (err, db) {
			if (err) throw err;
			db.collection('users').findOne({'email' : 'peter.wood@usask.ca'}, function(err, res) {
				console.dir(res === null ? 'No entry' : res);
				db.close( function (err, cls) {
					if (err) throw err;
					if (err === null) console.dir('close successful' );

				});
			});
		});
	};

	return {
		test:test
	};

})();

module.exports=db;

var stuff = db;
stuff.test();


