var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/finish', function(req, res, next) {
  res.render('finish');
});

router.get('/failed', function(req, res, next) {
  res.render('failed');
});

router.get('/login/federated/twitter.com', passport.authenticate('twitter'));

router.get('/oauth/callback/twitter.com',
  passport.authenticate('twitter', { assignProperty: 'federatedUser', failureRedirect: '/failed' }),
  function(req, res, next) {

    res.cookie('twitter-data', JSON.stringify({
      token: req.federatedUser.token,
      token_s: req.federatedUser.tokenSecret
    }));

    res.redirect('/finish');
  }
);

module.exports = router;
