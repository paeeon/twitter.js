var express = require('express');
var router = express.Router();
var mime = require("mime")
var fs = require("fs")

//Same as: var router = require('express').Router();

var tweetBank = require('../tweetBank');



router.get('/', function(req, res) {
	var tweets = tweetBank.list();
	// tweets is a clone of the data array in tweetBank.js
	res.render('index', {title: 'Twitter.js', text: tweets} );
});

// router.get('/public/stylesheets/style.css', function(req, res) {
// 	res.sendFile(req.path);
// });

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

module.exports = router;