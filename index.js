//Please dump schema.sql on top of ruby generated schema
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'limostag_dbuser',
  password : 'Zgejt034&he',
  database : 'limostag_db'
});

connection.connect();

/*connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});*/

var redis = require("redis"), db = redis.createClient() //connect to db #1
//driver_1474712527: '{"latitude":13.0215776,"longitude":77.6400993,"platform":"Android","timestamp":"1481199355"}'
db.select(1, function(err,res) {
    db.hgetall("drivers", function (err, obj) {
         console.dir(obj);
    });
});

connection.end();
