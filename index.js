var express = require('express');
var expressHandlebar = require('express-handlebars');
var session = require ('session');
var mysql = require('mysql');
var app = express();
var PORT = process.env.NODE_EV || 8080
var connection = mysql.createConnection({
  port : 3306,
  host : 'localhost',
  user : 'root',
  password : 'tinker511',
  database : 'notes_DB'
});
app.engine('handlebars', expressHandlebar({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(PORT, function(){
  console.log('you are listening on port %s', PORT);
});
app.get('/', function(req, res){
  connection.query('SELECT * FROM quick_notes', function(err, data){
    if (err) throw err;
    res.render('notes', {data});
  });
});
