//#region initilanizations
var express = require('express');
var port = process.env.port;

console.log('Port ' + port);
console.log('Hello world');
var app = express();
//#endregion

app.get('/', function (req, res) {
    res.end("<h1>Halo from the other side</h1>");
});

app.get('/favicon.ico', function (req, res) {
    res.end("<h1>Halo from the other side</h1>");
});

app.get('/robots.txt', function (req, res) {
    res.end("<h1>Halo from the other side</h1>");
});

app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);

});