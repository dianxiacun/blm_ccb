'use strict'
var express = require('express');
var payment = require('../service/payment.js');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
	console.log('orderid: ', req.body.orderId);
	console.log('body: ', req.body);
	var description = '';
	for (let i in req.body) {
		let property = req.body[i];
		description += i + ': ' + property + '\n';
	}
	console.log('object: ', description);
	var ccbPaymentUrl = payment.getPaymentUrl(req);
  	res.send({result: {paymentUrl: ccbPaymentUrl}});
});

module.exports = router;
