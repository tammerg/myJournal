var express = require('express');
var expressHandlebar = require('express-handlebars');
var session = require ('session');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
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

app.get('/', function(req, res){
  connection.query('SELECT * FROM quick_notes', function(err, data){
    if (err) throw err;
    res.render('notes', {data});
  });
});
app.post('/create', function(req, res){
  connection.query('INSERT INTO quick_notes (note) VALUES (?)', [req.body.note], function(){
    if (err) throw err;
  });
    res.redirect('/');
})

app.listen(PORT, function(){
  console.log('you are listening on port %s', PORT);
});
