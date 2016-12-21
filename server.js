var mysql = require('mysql');
var express = require('express')
var app = express();
//select * from drivers_redis where (UNIX_TIMESTAMP()-timestamp) < 900 order by timestamp desc;
var options = {
  host     : 'localhost',
  user     : 'limostag_dbuser',
  password : 'Zgejt034&he',
  database : 'limostag_db'
};

app.get('/', function (req, res) {
  var connection = mysql.createConnection(options);  
  connection.connect();
  connection.query('select * from drivers_redis where (UNIX_TIMESTAMP()-timestamp) < 900 order by timestamp desc', function(err, results) {
  	res.json(results)
  });
  connection.end();
})

app.listen(4545, 'localhost', function () {
  console.log('Map server listening on port 4545!')
})

