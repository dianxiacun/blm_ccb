'use strict'
var express = require('express');
var payment = require('../service/payment.js');
var router = express.Router();

router.post('/', function(req, res, next) {
	let CCBPaymentURL = payment.getPaymentURL(req);
  	res.send({result: {paymentURL: CCBPaymentURL}});
});

module.exports = router;
