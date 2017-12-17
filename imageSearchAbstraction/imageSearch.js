var async = require('async');

var resTest = {
    url : "testUrl",
    snippet : "testSnippet",
    thumbnail : "testThumbnail",
    context : "you got the point",
}
var gApiKey = "AIzaSyBzUxb68xDEQ8hvFuzAvLJ9uk-uzO3Uu10";
var CSEID = "007165501120063598584:bzvkbifi0lm";
const GI = require('google-images');
const client = new GI(CSEID, gApiKey);

//var transferItem = {
//    url: "",
//    tag: "",
//    thumbnail: "",
//    parent: ""
//}

var res = {};

//var transferObject = {
//    0: transferItem,
//    1: transferItem,
//    2: transferItem,
//    3: transferItem,
//    4: transferItem,
//    5: transferItem,
//    6: transferItem,
//    7: transferItem,
//    8: transferItem,
//    9: transferItem,
//};

var transferObject = [];

//transferObject['1'].url = "fonfik";


module.exports = function (str, callback) {
    
    /*
    //#region async tests
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
    //#endregion
    */
    
    
    var qStr = str.path.slice(1);
    console.log("We're in Image Search Baby");
    console.log("Our query string is: " + qStr);
    
    var getResults = function (callback) {
        var gr = setTimeout(function (pass) {
            client.search(qStr, { page: 1 }).
                then(function (response) {
                console.log("WERE IN THEN\n\n");
                console.log("Headers = " + response.headers);
                console.log("Body = " + response.body);
                console.log("PROMISE = " + response.Promise);
                console.log("DATA = " + response.data);
                console.log("response Length >> " + response.length);
                
                    //console.log("Transfer Object status as of" + i + "   " +JSON.stringify(transferObject));

                    //TODO : burdasin, transfer Object'i dolduramadik, array denenebilir, 
                    //TODO obje yapisi bastan olusturulabilir, objeye push etmenin methodu vardir belki
                    //Buranin possible cozumu : https://stackoverflow.com/questions/2295496/convert-array-to-json 
                    //Yani array olarak tut TransferObject'i, doldurduktan sonra, JSON Stringify yap, sonra da parse et. 
            
                pass = response;
               // console.log(pass);
                res = pass;
                console.log("RES  =   " + JSON.stringify(res));
            });
            
        }, 500);
        
            callback();    
        

    }
    
    var fillTransferObject = function (callback) {
        setTimeout(function () {
            
            console.log("Our res is    " + JSON.stringify(res[5]) );

            for (var i = 0; i < res.length; i++) {
                
                var transferItem = {
                    url: "",
                    tag: "",
                    thumbnail: "",
                    parent: ""
                }

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
                //Trying with transfer Item
                transferItem.url = res[i].url;
                transferItem.tag = res[i].description;
                transferItem.thumbnail = res[i].thumbnail.url;
                transferItem.parent = res[i].parentPage;
                
                transferObject[i] = transferItem;
            }
            console.log("TransFerItem after FTO   \n\n" + JSON.stringify(transferObject));
        callback();
        }, 4500);
    }
    

    
    //var x = setTimeout(function () {
    //    res = client.search(qStr, { page: 1 })
    //}, 2000);

    //console.log(res);
    async.series([
        getResults,
        fillTransferObject,
        function () {
            setTimeout(function () {
                //var x = res.slice(8);
                console.log("We're now in async series last");
                console.log("\n\n\n" + JSON.stringify( transferObject) );
                //console.log(res['Promise']);
                callback(JSON.stringify( transferObject));
            }, 7500)
            
        },
    ]);
};

