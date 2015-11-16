var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var models = require('../models/index');

// Removing this line because we're using a database now
// var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  models.Tweet.findAll( {include: [models.User]} )
  .then(function(tweets) {
    var tweetArray = [];
    tweets.forEach(function(tweet) {
      var tweetObj = {
        text: tweet.dataValues.tweet,
        user: tweet.dataValues.User.dataValues.name,
        pictureUrl: tweet.dataValues.User.dataValues.pictureUrl
      };
      tweetArray.push(tweetObj);
    });
    res.render('index', { tweets: tweetArray });
  }, function(err) {
    console.error(err);
  });
});

// function createSimpleTweet (tweets) {
//   console.log(tweets);
//   var tweetArray = [];
//   tweets.forEach(function(tweet) {
//     var tweetObj = {
//       text: tweet.dataValues.tweet,
//       user: tweet.dataValues.User.dataValues.name,
//       pictureUrl: tweet.dataValues.User.dataValues.pictureUrl
//     };
//     tweetArray.push(tweetObj);
//   });
//   return tweetArray;
// }



router.get('/users/:name', function(req, res) {
  // req.params.name = "David";
  models.User.findAll({
    include: [models.Tweet],
    where: {
      name: req.params.name
    }
  })
  .then(function(user){
    // var tweetArray = createSimpleTweet(user[0].dataValues.Tweets);
    var tweetArray = [];
    user[0].dataValues.Tweets.forEach(function(tweet) {
      var tweetObj = {
        text: tweet.dataValues.tweet, 
        user: user[0].dataValues.name,
        pictureUrl: user[0].dataValues.pictureUrl
      };
      tweetArray.push(tweetObj);
    });
    res.render('index', { tweets: tweetArray });
  })
  .catch(function(err){
    console.error(err);
  });
});



// function getTweet (req, res){
//   var tweets = tweetBank.find(req.params);
//   res.render('index', { tweets: tweets });
// }


router.get('/users/:name/tweets/:id', function(req, res){
  models.Tweet.findAll({
    include: [models.User],
    where: { 
      id: req.params.id
    }
  })
  .then(function(tweets){
    var tweetArray = [];
    var currentTweet = tweets[0];
    var tweetObj = {
      text: currentTweet.dataValues.tweet,
      user: currentTweet.dataValues.User.dataValues.name,
      pictureUrl: currentTweet.dataValues.User.dataValues.pictureUrl
    };
    tweetArray.push(tweetObj);
    res.render('index', { tweets: tweetArray });
    }, function(err) {
      console.error(err);
    });
});

// // note: this is not very REST-ful. We will talk about REST in the future.
// router.post('/submit', function(req, res) {
//   var name = req.body.name;
//   var text = req.body.text;
//   tweetBank.add(name, text);
//   res.redirect('/');
// });

router.post('/submit', function(req,res){
  models.User.findOrCreate({
    include: [models.Tweet],
    where: {
      name: req.body.name
      //text: req.body.text
    }
    // defaults: {
    //   models.Tweet.dataValues.tweet: req.body.text
    // }
  }).then(function(user){
    var currentUser = user[0];
    models.Tweet.create(
      {UserId: currentUser.dataValues.id,
        tweet: req.body.text
      }
    );
      res.redirect('/');
  })
})

module.exports = router;

