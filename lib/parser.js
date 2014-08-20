var parser = (function () {

  var textObject = function(owner) {
    var that = {};
    that['owner'] = owner;
    that['idcounter'] = 0;
    that['imported'] = new Date(); 
    that['accessed'] = [];
    that['text'] = [];
    return that;
  }

  var textElement = function (token, type, id) {
    that = {};
    that['token'] = token;
    that['id'] = id;
    if (type === 'w') that['html'] = "<a class = 'myText' id='" + id  + "'>" + token + "</a>";
    else if (token === '\n') that['html'] = '<br/>\n';
    else that['html'] = token;
    that['accessed'] = [];
    return that;
  }

  var access = function(func) {
    that = {};
    that['date']= new Date();
    that['function'] = func;
    return that;
  }

    var getOT = function(callb) {
    // console.log('in getOT');
    readfile('public/resources/otwist.txt', function(text) {
      // console.log('getOT returning text');
      callb(text);
    });
  };

  var readfile = function(path, cback) {
    // console.log('in readfile');
    var fs = require('fs');
    var text = fs.readFile( path, { encoding: 'utf-8' }, function (err, data) {
      if (err) throw err;
      cback(data);
    });
  };

  var parse = function(text, cback) {
    // console.log('in parse');
    var result = textObject('unknown'); // needs to be changed
    result['owner'] = 'unknown'; // needs to be changed
    var lastAccess = access('import');
    result['accessed'].push( lastAccess );
    var token = '';
    var element = undefined;
    var count = 0;
    loop1:    for (var character in text) {
      count++;
      if (count === 1000) break loop1;
      if (text[character].match(/\w/)) token = token + text[character];
      else {
        if (token.length > 0) {
        element = textElement(token, 'w', result['idcounter']);
        result['idcounter']++;
        result['text'].push(element);
        // console.log(JSON.stringify(element));
        // console.log('elements in text:', result['text'].length);
        token = '';
        }
      element = textElement(text[character], 'p', result['idcounter']);
      result['idcounter']++;
      result['text'].push(element);
      // console.log(JSON.stringify(element));
      // console.log('elements in text:', result['text'].length);
      }
    }
    cback(result);
  };

  var getHtml = function(json, cback) {
    var result = '';
    for (var i = 0; i < json['text'].length; i++) { 
      result = result + json['text'][i]['html'];
    }
    cback(result);
  };


  return {
    read : readfile,
    parse : parse,
    getHtml: getHtml,
    getOT : getOT
  };
})();

module.exports = parser;
