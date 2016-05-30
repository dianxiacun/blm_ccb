'use strict'
var express = require('express');
var payment = require('../service/payment.js');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
	var ccbPaymentUrl = payment.getPaymentUrl(req);
  	res.send({result: {paymentUrl: ccbPaymentUrl}});
});

module.exports = router;
