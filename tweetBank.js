//Will hold all tweets
//And give methods for interacting w/ them

var _ = require("underscore");

var data = []; //will contain tweets

var add = function(name, text) {
	//each tweet is an object
	//containing a name + text
	data.push({name: name, text: text})
}

var list = function() {
	return _.clone(data)
}

var find = function(properties) {
	//will look for tweets matching properties
	//in data array (which is our tweet bank)
	return _.where(data, properties)
}



module.exports = {add: add, list: list, find: find}



////SAMPLE DATA:

var randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeName = function() {
  var fakeFirsts = ['Nimit', 'Dave', 'Will', 'Charlotte', 'Jacob','Ethan','Sophia','Emma','Madison'];
  var fakeLasts = ["Alley", 'Stacky', 'Fullstackerson', 'Nerd', 'Ashby', 'Gatsby', 'Hazelnut', 'Cookie', 'Tilde', 'Dash'];
  //RANDOMLY SELECTS A FAKE FIRST + FAKE LAST NAME
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

var getFakeTweet = function() {
  var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];
  //RANDOMLY SELECTS FAKE ADJECTIVES
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for(var i=0; i<10; i++) {
	//PUSHES 10 FAKE NAMES + 10 FAKE TWEETS INTO DATA ARRAY
  module.exports.add( getFakeName(), getFakeTweet() );
}





