var communication = (function() {

  var parser = require('../lib/parser');

  var http = require('http');

  var control = function(io) {
    io.sockets.once('connection', function(socket) {
      socket.emit('ready');
      // console.log('sent ready');
      
      socket.on('ok', function() {
        // console.log('received ok');
      });

      socket.on('get', function(transport) {
        var result  = undefined;
        // console.log('in get');
        if (transport['text'] === '') {
          // console.log('getting Oliver Twist');
          parser.getOT(retText); 
        } else {
          retText(transport['text']);
        }
      });

      var retText = function(result) {
        parser.parse(result, function(json) {
          socket.set('json', json, function() {
            parser.getHtml(json, function(text) {
              // console.log('text ready');
              socket.emit('text ready', text);
            });
          });
        });
      };

      socket.on('query', function(id) {
        socket.get('json', function(err, json) {
          if (err) throw err;
          socket. emit('info', json['text'][id]['token']);
          dicLookUp(json['text'][id]['token']);
        });
      });

      var dicKey = '009726bf-a073-45ce-97f8-35f6b1453b39';
      var options = {
          host : 'www.dictionaryapi.com',
          port : 80,
          path : undefined
      }

      var req = undefined;
      var dicInfo = undefined;
      var htmlparser = require('htmlparser');
      var handler = new htmlparser.DefaultHandler(function(err, dom) {}, {verbose: false, ignoreWhitespace: true, enforceEmptyTags: false});
      var myParser = new htmlparser.Parser(handler);
      var util = require('util');

      var displayObject = function(obj, indent) {
        sp = '';
        for (var x = 0; x < indent; x++) {
          sp = sp + ' ';
        }
        if (typeof(obj) === 'object') {
          //console.log('displayObject got object: ', obj);
          for (var x in obj) {
            console.log(sp + x + ': ');
            displayObject(obj[x], indent+3);
          }
        }
        else {
          console.log(sp + obj);
        }
      };

      var dicLookUp = function(token) {
        var path = '/api/v1/references/learners/xml/' + token + '?key=' + dicKey;
        options['path'] = path;
        console.log('request sent:', options['host'] +  options['path']);
        dicInfo = '';
        req = http.get(options, function(res) {
          console.log('result status Code:', res.statusCode);
        });
        req.on('error', function(e) {
          console.log('Req error:', e.message);
        });
        req.on('response', function(response) {
            response.on('data', function(chunk) {
            dicInfo = dicInfo + chunk;
          });
          response.on('end', function() {
            //{
            //  if (err) throw err;
            //}, {verbose: false, ignoreWhitespace: true, enforceEmptyTags: false} );
            //var parser = new htmlParser.Parser(handler);
            myParser.parseComplete(dicInfo);
            console.log(dicInfo);
            console.log(util.inspect(handler.dom, false, null));
            //displayObject(result, 0);
            socket.emit('dicInfo', util.inspect(handler.dom, false, null));
            });
          });
     }


      

    });
  }
  

  return {
    control : control
  };
})();

module.exports=communication;
