var express = require('express');
var notify = require('../service/ccb_notify.js');
var router = express.Router();

router.all('/', function(req, res, next) {
	notify.verify(req, res);
});

module.exports = router;
