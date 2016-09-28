var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.redirect('/public/index.html');
});

app.listen(process.env.PORT || 3000);
