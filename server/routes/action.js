const express = require('express');
const router = express.Router();

router.get('/api/test', function(req, res, next) {
  res.render('page');
  return {
    data: {}
  };
});

module.exports = router;
