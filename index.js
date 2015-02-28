// This section includes imported packages
var express = require('express');
var Twit = require('twit');
var config =  require('./config');
var util = require('./modules/util');
var app = express();

/* If we need to, here we create tiny web app
app.set('port', (process.env.PORT || 5000));
app.get('/', function(request, response) {
  response.send('No dont do that.');
});
app.listen(app.get('port'), function() {
  console.log("running at localhost:" + app.get('port'));
});
*/

// using a package that makes using the api easier
var T = new Twit(config);

var tweet_something_popular = function(query) {
  var params = {
      q: query
    , since: util.datestring()
    , result_type: 'recent'
  };

  // search with our parameters
  T.get('search/tweets', params, function (err, reply) {
    if (err || !reply.statuses) { 
      return util.handleError(err);
    }

    var highest_popularity = 0;
    var status = '';

    // loop over each status
    for (var i = 0; i < reply.statuses.length; i++) {
      var tweet = reply.statuses[i];

      // higher retweets means more popular
      if (tweet.retweet_count > highest_popularity) {
        highest_popularity = tweet.retweet_count;
        status = tweet.text;
        console.log("maybe... " + status);
      }
    };

    // If we have something... lets post it!
    if (status !== '') {
      tweet_this(status);
    }
  });
};

var tweet_this = function(status) {
  T.post('statuses/update', { status: status }, function(err, data, r) {
    if (err) return util.handleError(err);
    console.log("tweeted: " + data.text);
  });
};

var searches = [ "@beyonce", "#growthhacking", "#allstarcode" ];
var phrases = [
  "The business that scales the worst, fails the fastest. #failoften",
  "We're changing everything you know about retail clothing.",
  "We're doing for college applications what google did for search."
];

var main = function(){
  var rand = Math.random();

  if (rand <= .15) {
    tweet_something_popular(util.randIndex(searches));
  }
  else if (rand <= .3) {
    var phrase = util.randIndex(phrases);
    var tag = util.randIndex(searches);
    tweet_this(phrase + " " + tag);
  }

  setTimeout(main, 60 * 1000); // repeat each minute
}

// Start loop
main();

