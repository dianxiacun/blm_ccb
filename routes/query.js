'use strict'
var express = require('express');
var query = require('../service/ccb_batch_query.js');
var router = express.Router();

router.post('/', function(req, res, next) {
	let queryURL = query.CCBBatchQuery(req);
  	res.send({result: {queryURL: queryURL}});
});

module.exports = router;
