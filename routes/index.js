var express = require('express');
var router = express.Router();
var mid = require('../middlewear/checklogin');

/* GET home page. */
router.get('/',mid.yeucaudangnhap, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
