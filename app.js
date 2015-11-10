var express = require("express");

var app = express();

var server = app.listen(3000, function() {
	console.log("Server listening on port, 3000");
})

app.get("/", function(req, res) {
	res.send("Your server is working!");
})