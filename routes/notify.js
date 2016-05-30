var express = require('express');
var notify = require('../service/ccb_notify.js');
var router = express.Router();

router.get('/', function(req, res, next) {
	var result = notify.verify(req);
	console.log('verified result: ', result); 	
});

module.exports = router;
