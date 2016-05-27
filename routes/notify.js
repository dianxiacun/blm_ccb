var express = require('express');
var notify = require('../service/ccb_notify.js');
var router = express.Router();

router.get('/', function(req, res, next) {
	var result = notify.verify(req);
	console.log('verified result: ', result);
	if (!result.isNormal) {
		res.status(500).send('something is wrong with the verified server...');
	} else {
		res.send({ isVerified: result.isVerified });
	}
  	
});

module.exports = router;
