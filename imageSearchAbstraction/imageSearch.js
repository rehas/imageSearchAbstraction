var resTest = {
    url : "testUrl",
    snippet : "testSnippet",
    thumbnail : "testThumbnail",
    context : "you got the point",
}

module.exports = function (str, callback) {

    console.log("We're in Image Search Baby");
    console.log(JSON.stringify(str));

    callback(str);
};