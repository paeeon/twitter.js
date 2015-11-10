var express = require('express');
var router = express.Router();
var mime = require("mime")
var fs = require("fs")
var bodyParser = require("body-parser")

//Same as: var router = require('express').Router();

var tweetBank = require('../tweetBank');




router.get('/', function(req, res) {
	var tweets = tweetBank.list();
	// tweets is a clone of the data array in tweetBank.js
	res.render('index', {title: 'Twitter.js', text: tweets, showForm: true} );

});


// say that a client GET requests the path /users/nimit
router.get( '/users/:name', function (req, res) {
	var name = req.params.name
    // console.log(name); // --> 'nimit'
    var list = tweetBank.find({name: name})
    res.render( 'index', { title: 'Twitter.js - Posts by '+ name, text: list } );
});

router.get( '/users/:name/tweets/:id', function (req, res) {
	var name = req.params.name;
	var id = parseInt(req.params.id)
    var list = tweetBank.find({name: name, id: id});
    res.render( 'index', { title: 'Twitter.js - Posts by ' + name, text: list} );
});



// static file middleware
router.use(function(req, res, next) {
  // console.log(req.path)
  var mimeType = mime.lookup(req.path)
  fs.readFile('./public/' + req.path, function(err, fileBuffer) {
    if(err) return next()
    res.header('Content-Type', mimeType)
    res.send(fileBuffer)
  })
})




//**************************
//FOR PARSING THE BODY OF OUR TWEETS:

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

router.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.end(JSON.stringify(req.body, null, 2))
})

//**************************


//POST TWEETS:
router.post("/submit", function(req, res) {
	console.log(req.body)
	tweetBank.add(req.body.name, req.body.text)
})





module.exports = router;





