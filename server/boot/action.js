var passport = require('passport');
var Strategy = require('passport-twitter');
var Twit = require('twit');
var path = require('path');

module.exports = function() {
  
  /*
  var trustProxy = false;
  if (process.env.DYNO) {
    // Apps on heroku are behind a trusted proxy
    trustProxy = true;
  }
  */
  
  // Configure the Twitter strategy for use by Passport.
  //
  // OAuth 1.0-based strategies require a `verify` function which receives the
  // credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
  // user's behalf, along with the user's profile.  The function must invoke `cb`
  // with a user object, which will be set at `req.user` in route handlers after
  // authentication.
  passport.use(new Strategy({
      consumerKey: process.env['TWITTER_CONSUMER_KEY'],
      consumerSecret: process.env['TWITTER_CONSUMER_SECRET'],
      callbackURL: '/oauth/callback/twitter.com',
    },
    function(token, tokenSecret, profile, cb) {

      // var T = new Twit({
      //   consumer_key:         process.env['TWITTER_CONSUMER_KEY'],
      //   consumer_secret:      process.env['TWITTER_CONSUMER_SECRET'],
      //   access_token:         token,
      //   access_token_secret:  tokenSecret,
      //   timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
      //   strictSSL:            false,     // optional - requires SSL certificates to be valid.
      // })
    
      // var video = path.join(__dirname, '../public/videos/test.mp4');
      // var twitText = 'Text here...';

      // T.postMediaChunked({ file_path: video }, function (err, data, response) {
        
      //   function checkUploadStatus(data) {
      //     if (!data.media_id_string) return;
      //     var sec = data.processing_info.check_after_secs;

      //     setTimeout(function() {
      //       T.get('media/upload', { command: 'STATUS', media_id: data.media_id_string },  function (err, data, response) {
      //         if (data.processing_info.state === 'succeeded') {
      //           postTwitWithVideo(data.media_id_string)
      //         }
      //         else { checkUploadStatus(data) }
      //       })
      //     }, sec * 1000)
      //   }

      //   function postTwitWithVideo(videoId) {
      //     T.post('statuses/update', { status: twitText, media_ids: [videoId] }, function(err, data, response) {
      //       console.log(data)
      //     })
      //   }

      //   checkUploadStatus(data)

      // })
    
    
    return cb(null, {...profile, token, tokenSecret});
  }));
  
    
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  In a
  // production-quality application, this would typically be as simple as
  // supplying the user ID when serializing, and querying the user record by ID
  // from the database when deserializing.  However, due to the fact that this
  // example does not have a database, the complete Facebook profile is serialized
  // and deserialized.
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  
};
