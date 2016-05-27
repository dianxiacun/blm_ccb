var util = require('../module/util.js');
var config = require('../config');
var qs = require('querystring');

var payment = {};

payment.getPaymentUrl = function(request) {
	var orderId = request.body.orderId;
	var price = request.body.payment; 
	// try {
	// 	if (!orderId) throw 'order id is empty!';
	// 	if (parseFloat(price))
	// }
	// if (!orderId) {}
	// var { orderId, price, remark1, remark2} = request.body;
	// 以下data为生成MAC校验位，不做为数据发送
	var data = {
	    MERCHANTID: config.blmApp.MERCHANTID,   //商户代码，建行分配，必填
	    POSID: config.blmApp.POSID,  		    //商户柜台代码，建行分配，必填
	    BRANCHID: config.blmApp.BRANCHID,  	    //分行代码，建行分配，必填
	    ORDERID: orderId,  						//订单号，最长30位，必填
	    PAYMENT: price,  						//付款金额，必填
	    CURCODE: config.blmApp.CURCODE,  		//币种，只为01 表人民币，必填
	    TXCODE: config.blmApp.TXCODE, 			//交易码，建行分配，必填
	    REMARK1: '',  							//备注1，选填
	    REMARK2: '',  							//备注2，选填
	    TYPE: config.blmApp.TYPE, 				//接口类型，0为非钓鱼借口，1为防钓鱼接口，必填
	    PUB: config.blmApp.PUB,  				//公钥后30位，必填
	    GATEWAY: '',  							//网关类型，选填
	    CLIENTIP: '',  							//客户端IP，选填
	    REGINFO: '',  							//客户注册信息，中文需使用escape编码，选填
	    PROINFO: '',  							//商品信息，中文需使用escape编码，选填
	    REFERER: ''  							//商户URL，缺省即可，选填
	};
	var mac = util.md5Encode(qs.stringify(data));
	console.log('mac: ', mac);

	var formalData = {
	    MERCHANTID: config.blmApp.MERCHANTID,   //商户代码，建行分配，必填
	    POSID: config.blmApp.POSID,  			//商户柜台代码，建行分配，必填
	    BRANCHID: config.blmApp.BRANCHID,  		//分行代码，建行分配，必填
	    ORDERID: orderId,  						//订单号，最长30位，必填
	    PAYMENT: price,  						//付款金额，必填
	    CURCODE: config.blmApp.CURCODE,  		//币种，只为01 表人民币，必填
	    TXCODE: config.blmApp.TXCODE, 			//交易码，建行分配，必填
	    REMARK1: '',  							//备注1，选填
	    REMARK2: '',  							//备注2，选填
	    TYPE: config.blmApp.TYPE, 				//接口类型，0为非钓鱼借口，1为防钓鱼接口，必填
	    GATEWAY: '',  							//网关类型，选填
	    CLIENTIP: '',  							//客户端IP，选填
	    REGINFO: '',  							//客户注册信息，中文需使用escape编码，选填
	    PROINFO: '',  							//商品信息，中文需使用escape编码，选填
	    REFERER: '',  							//商户URL，缺省即可，选填
	    MAC: mac  								//MAC校验域
	};

	var paymentUrl = 'https://ibsbjstar.ccb.com.cn/app/ccbMain?' + qs.stringify(formalData);
	console.log('payment url: ', paymentUrl);
	return paymentUrl;
};

module.exports = payment;

