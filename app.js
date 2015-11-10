var express = require("express");
var swig = require("swig");
var routes = require("./routes/");


var app = express();

var server = app.listen(3000, function() {
	console.log("Server listening on port, 3000");
})


// This is where all the magic happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var title = "An Example"
var people = [{"name": "Tom"}, {"name": "Lily"}, {"name": "Joe"}]

swig.setDefaults({ cache: false });





app.use('/', routes);

// // OLD ROUTES:
// app.use(function(req, res, next){
// 	// console.log(req.method, req.url)
// 	next()
// })


// app.get("/", function(req, res) {
// 	res.render("index", {title: title, people: people})
// 	// res.send("Home page!");
// })

// app.get("/news", function(req, res) {
// 	res.send("Welcome to the news page");
// })


