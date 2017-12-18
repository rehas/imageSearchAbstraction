//#region initilanizations
var express = require('express');
var path = require('path');
var port = process.env.PORT || 1350;
var is = require('./imageSearch.js');
var latest = require('./latest.js');

console.log('Port ' + port);
console.log('Hello world');
var app = express();
//#endregion

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/is', function (req, res) {
    
    var obj = {
        oURL : req.originalUrl,
        headers : req.headers,
        body : req.body,
        bURL : req.baseUrl,
        hostname: req.hostname,
        path: req.path,
        query: req.query
    }

    is(obj, function (data) {
        console.log("data came");
        console.log(JSON.parse(data));
        res.send(data);
    });
});

app.use('/api/latest/is', function (req, res) {
    var obj = {
        oURL : req.originalUrl,
        headers : req.headers,
        body : req.body,
        bURL : req.baseUrl,
        hostname: req.hostname,
        path: req.path,
        query: req.query
    }

    latest(obj, function (data) {
        console.log("Data came to Latest");
        console.log(JSON.parse(data));
        console.log(data);
        res.send(data);
    });
})

//#region misc path handling for favicon and robots

app.use('/favicon.ico', function (req, res) {
    res.end("<h1>Halo from the other side</h1>");
});

app.use('/robots.txt', function (req, res) {
    res.end("<h1>Halo from the other side</h1>");
});

//#endregion

app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);

});