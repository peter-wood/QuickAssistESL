
/*
 * GET home page.
 */

exports.index = function(req, res) {
  // console.log('in index.js');
  var comm = require('../lib/communication');
  comm.control(io);
  res.render('index', {title : 'QuickAssist English'} );
}
