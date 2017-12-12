//#region initilanizations
var express = require('express');
var port = process.env.PORT || 1350;

console.log('Port ' + port);
console.log('Hello world');
var app = express();
//#endregion

app.get('/', function (req, res) {
    res.end("<h1>Halo from the other side</h1>");
});

app.use('/favicon.ico', function (req, res) {
    res.end("<h1>Halo from the other side</h1>");
});

app.use('/robots.txt', function (req, res) {
    res.end("<h1>Halo from the other side</h1>");
});

app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);

});