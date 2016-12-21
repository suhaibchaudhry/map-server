//Please dump schema.sql on top of ruby generated schema
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'limostag_dbuser',
  password : 'Zgejt034&he',
  database : 'limostag_db'
});
var _ = require('lodash');

/* Query Samples */
/*INSERT INTO `drivergeo`.`drivers_redis` (`driver_id`, `latlon`, `timestamp`) VALUES ('1', GeomFromText('POINT(13.02169401981124 77.64023683648082)',0), 1);*/
/*SELECT X(latlon), Y(latlon) FROM `drivers`*/

connection.connect();

/*connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});*/

var redis = require("redis"), db = redis.createClient() //connect to db #1
//driver_1474712527: '{"latitude":13.0215776,"longitude":77.6400993,"platform":"Android","timestamp":"1481199355"}'
var busy = true;
db.select(1, function(err,res) {
    db.hgetall("drivers", function (err, obj) {
        //console.dir(obj);
	_.each(obj, (d, driver_id) => {
		d = JSON.parse(d);
		//console.log(d);
		//console.log(driver_id);
		console.log(mysql.format('REPLACE INTO drivers_redis (driver_id, latlon, timestamp) VALUES (?, GeomFromText(\'POINT(? ?)\'), ?)', [driver_id, parseFloat(d.latitude), parseFloat(d.longitude), d.timestamp]));
		connection.query('REPLACE INTO drivers_redis (driver_id, latlon, timestamp) VALUES (?, GeomFromText(\'POINT(? ?)\'), ?)', [driver_id, parseFloat(d.latitude), parseFloat(d.longitude), d.timestamp], function(err) {
			if(err) console.error(err);
		});
	});
	busy = false;
    });
});
require('deasync').loopWhile(() => {return busy;});
connection.end();
db.quit();
