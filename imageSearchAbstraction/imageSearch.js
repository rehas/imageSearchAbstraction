//#region initialization
var async = require('async');
var MongoClient = require('mongodb').MongoClient;

var gApiKey = "AIzaSyBzUxb68xDEQ8hvFuzAvLJ9uk-uzO3Uu10";
var CSEID = "007165501120063598584:bzvkbifi0lm";
const GI = require('google-images');
const client = new GI(CSEID, gApiKey);

var res = {};

var transferObject = [];
//#endregion

//#region db initialization
var dbURL = "mongodb://heroku_7rpcp6qs:samvk6sgru0hvp2ch24kadghn8@ds149535.mlab.com:49535/heroku_7rpcp6qs";
var collectionStr = "imageSearchDB";

//#endregion

var insertOneDocument = function (db, qStr, callback) {
    var collection = db.collection(collectionStr.toString());
    collection.insertOne(
        {
            searchTerm : qStr.toString(),
            time: new Date()
        }
    )
};

module.exports = function (str, callback) {
    
    //#region async tests
    
    /*
    var f1 = function (callback) {
        setTimeout(function () {
            console.log("Im from f1");
            callback();
        }, 3000);
    }
    
    var f2 = function (callback) {
        setTimeout(function () {
            console.log("Im from f2");
            callback();
        }, 1000);
    }
    
    
    async.series([
        f1,
        f2,
        function () {
            setTimeout(function () {
                console.log("I'm from f3 anonymous");
            }, 3000);
        },
    ]);
    */
    //#endregion
    
    //#region query handling

    var qStr = str.path.slice(1);
    var qPrm = str.query.offset;
    console.log("qPrm is  " + qPrm);
    var qPrm2 = str.query.page;
    console.log("qPrm2 is  " + qPrm2);
    console.log("We're in Image Search Baby");
    console.log("Our query string is: " + qStr);
    console.log("Our param is: " + JSON.stringify(str.query.offset));
    
    var pageProperty = 1;
    
    if (qPrm !== undefined) {
        pageProperty = qPrm
    } else if (qPrm2 !== undefined) {
        pageProperty = qPrm2
    };
    
    MongoClient.connect(dbURL, function (err, db) {
        if (err) {
            console.log("DB CONNECTION ERROR  " + err); return
        } else {
            var searchTermToDB = decodeURI(qStr);
            console.log("SearchTermToDB  \n" + searchTermToDB);
            console.log("qStr in DB Insertion  \n" + qStr);
            console.log("We have a DB connection  " + db);
            insertOneDocument(db, searchTermToDB ,function (_, docs) {
                console.log("Inserted Docs are  ", +docs);
                db.close();
            });
        }

    });
    
    
    console.log("Our page property is >>> " + pageProperty);
    
    //#endregion
    
    //#region get results
    var getResults = function (callback) {
        var gr = setTimeout(function (pass) {
            var searchTerm = decodeURI(qStr);
            client.search(searchTerm, { page: pageProperty }).
                then(function (response) {
                //#region console testleri
                //console.log("WERE IN THEN\n\n");
                //console.log("Headers = " + response.headers);
                //console.log("Body = " + response.body);
                //console.log("PROMISE = " + response.Promise);
                //console.log("DATA = " + response.data);
                //console.log("response Length >> " + response.length);
                
                //console.log("Transfer Object status as of" + i + "   " +JSON.stringify(transferObject));
                
                //TODO : burdasin, transfer Object'i dolduramadik, array denenebilir, 
                //TODO obje yapisi bastan olusturulabilir, objeye push etmenin methodu vardir belki
                //Buranin possible cozumu : https://stackoverflow.com/questions/2295496/convert-array-to-json 
                //Yani array olarak tut TransferObject'i, doldurduktan sonra, JSON Stringify yap, sonra da parse et. 
                //#endregion
                pass = response;
                // console.log(pass);
                res = pass;
                console.log("RES  =   " + JSON.stringify(res));
            });
        }, 500);
        callback();
    }
    
    //#endregion
    
    //#region fill transfer object
    var fillTransferObject = function (callback) {
        setTimeout(function () {
            console.log("Our res is    " + JSON.stringify(res[5]));
            for (var i = 0; i < res.length; i++) {
                var transferItem = {
                    url: "",
                    tag: "",
                    thumbnail: "",
                    parent: ""
                }
                //#region console tests
                //console.log("Individual res Item>>" + JSON.stringify(res[i]));
                console.log("Individual res URL>>" + res[i].url);
                //console.log("Individual res DESC>>" + JSON.stringify(res[i].description));
                //console.log("Individual res TN>>" + JSON.stringify(res[i].thumbnail.url));
                //console.log("Individual res PP>>" + JSON.stringify(res[i].parentPage));
                ////transferObject.i.url = res[i].url;
                //console.log("Transfer Object URL" + transferObject.i.url );
                //transferObject.i.tag = res[i].description;
                //console.log("Transfer Object TAG" + transferObject.i.tag);
                //transferObject.i.thumbnail = res[i].thumbnail.url;
                //console.log("Transfer Object TN" + transferObject.i.thumbnail);
                //transferObject.i.parent     = res[i].parentPage;
                //console.log("Transfer Object Parent" + transferObject.i.parent);
                //#endregion
                //Trying with transfer Item
                transferItem.url = res[i].url;
                transferItem.tag = res[i].description;
                transferItem.thumbnail = res[i].thumbnail.url;
                transferItem.parent = res[i].parentPage;
                transferObject[i] = transferItem;
            }
            console.log("TransFerItem after FTO   \n\n" + JSON.stringify(transferObject));
            callback();
        }, 3500);
    }
    //#endregion
    
    //console.log(res);
    
    //#region Final Syncronious Execution
    async.series([
        getResults,
        fillTransferObject,
        function () {
            setTimeout(function () {
                //var x = res.slice(8);
                console.log("We're now in async series last");
                console.log("\n\n\n" + JSON.stringify(transferObject));
                //console.log(res['Promise']);
                callback(JSON.stringify(transferObject));
            }, 6500)
            
        },
    ]);

    //#endregion
};

