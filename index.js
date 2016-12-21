var redis = require("redis"), db = redis.createClient() //connect to db #1

db.select(1, function(err,res) {
    db.hgetall("drivers", function (err, obj) {
         console.dir(obj);
    });
});
