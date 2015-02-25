'use strict';

// Module dependencies.
var express = require('express')
  , path = require('path')
var app = express();
  console.log(__dirname);
  app.engine('html', require('ejs').renderFile);
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.static(path.join(__dirname, 'bower_components')));
  app.set('views', path.join(__dirname, 'app', 'views'));
  var port = process.env.PORT || 3000;

  app.get('/',function(req, res){
    res.render(path.join(__dirname, 'app', 'index.html'))
  })
  app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.get('env'));
  });

