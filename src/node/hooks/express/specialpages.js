var path = require('path');
var eejs = require('ep_etherpad-lite/node/eejs');

exports.expressCreateServer = function (hook_name, args, cb) {

  //serve index.html under /
  args.app.get('/', function(req, res)
  {
    res.send(eejs.require("ep_etherpad-lite/templates/index.html"), { maxAge: exports.maxAge });
  });

  //serve robots.txt
  args.app.get('/robots.txt', function(req, res)
  {
    var filePath = path.normalize(__dirname + "/../../../static/robots.txt");
    res.sendfile(filePath, { maxAge: exports.maxAge });
  });

  //serve favicon.ico
  args.app.get('/favicon.ico', function(req, res)
  {
    var filePath = path.normalize(__dirname + "/../../../static/custom/favicon.ico");
    res.sendfile(filePath, { maxAge: exports.maxAge }, function(err)
    {
      //there is no custom favicon, send the default favicon
      if(err)
      {
	filePath = path.normalize(__dirname + "/../../../static/favicon.ico");
	res.sendfile(filePath, { maxAge: exports.maxAge });
      }
    });
  });

  //serve pad.html under /p
  args.app.get('/p/:pad', function(req, res, next)
  {    
    res.send(eejs.require("ep_etherpad-lite/templates/pad.html"), { maxAge: exports.maxAge });
  });

  //serve timeslider.html under /p/$padname/timeslider
  args.app.get('/p/:pad/timeslider', function(req, res, next)
  {
    res.send(eejs.require("ep_etherpad-lite/templates/timeslider.html"), { maxAge: exports.maxAge });
  });

}