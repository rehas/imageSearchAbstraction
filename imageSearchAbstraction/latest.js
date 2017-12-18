var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var dbURL = "mongodb://heroku_7rpcp6qs:samvk6sgru0hvp2ch24kadghn8@ds149535.mlab.com:49535/heroku_7rpcp6qs";
var collectionStr = "imageSearchDB";


var bringLast10Searches = function (db, callback) {
    var col = db.collection(collectionStr.toString());
    
    col.find({}, { "time": 1, "searchTerm": 1, "_id": 0 }).sort({ time : -1 }).toArray(function (err, docs) {
        if (err) {
            console.log("Some error occured when gettings docs")
        } else {
            callback(docs);
        }
    });
}

module.exports = function (str, callback) {
    console.log("We're now in latest");
    
    MongoClient.connect(dbURL, function (err, db) {
        if (err) {
            console.log("DB CONNECTION PROBLEM" + err)
        } else {
            bringLast10Searches(db, function (docs) {
                console.log("DOCS have arrived");
                console.log(JSON.stringify(docs));
                db.close();
                callback(JSON.stringify(docs));
            })   
        }
    });

}

