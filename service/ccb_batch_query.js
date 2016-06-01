'use strict';
var util = require('../module/util.js');
var config = require('../config');
var qs = require('querystring');

var query = {};

query.CCBBatchQuery = function(request) {
	let orderId = request.body.orderId;
	let orderDate = request.body.orderDate;
	let begOrderTime = request.body.begOrderTime;
	console.log('begin time: ', begOrderTime);
	let endOrderTime = request.body.endOrderTime;
	console.log('end time: ', endOrderTime);
	let type = request.body.type;
	let kind = request.body.kind;
	let status = request.body.status;
	let selType = request.body.selType;
	let page = request.body.page;
	let operator = request.body.operator;

	let data = {
	    MERCHANTID: config.blmApp.MERCHANTID,   //商户代码，建行分配，必填
	    BRANCHID: config.blmApp.BRANCHID,  	    //分行代码，建行分配，必填
	    POSID: config.blmApp.POSID,  		    //商户柜台代码，建行分配，必填
	    ORDERDATE: orderDate,					//订单日期，格式'yyyymmdd',与ORDERID必须有一个输入
	    BEGORDERTIME: begOrderTime,				//订单开始时间，格式'hh:mm:ss',已结算流水查询只支持按日期查询
	    ENDORDERTIME: endOrderTime,				//订单结束时间，同上
	    ORDERID: orderId,  						//订单号，值可为空，若有值则只按订单号查询
	    QUPWD: '',								//主管或操作员登录密码，必填，参与mac计算时不必填值
	    TXCODE: config.blmApp.QUERYTXCODE,		//交易码，必填，固定值
	    TYPE: type,								//流水类型，0为支付流水，1为退款流水，必填
	    KIND: kind,								//流水状态，0为未结算流水，1为已结算流水，当日只有未结算流水可查询，必填
	    STATUS: status,							//交易状态，0失败，1成功，2不确定，3全部，必填
	    SEL_TYPE: selType,						//查询方式，1页面形式，2文件返回形式，3XML页面形式，必填
	    PAGE: page,								//要查询的页码，必填
	    OPERATOR: operator,						//操作员
	    CHANNEL: ''								//预留字段
	};

	// 订单开始时间和结束时间的':'会被转义为'%3A'，故增加replace步骤
	let mac = util.md5Encode(qs.stringify(data).replace(/%3A/g, ':'));
	console.log('mac: ', mac);

	let formalData = {
	    MERCHANTID: config.blmApp.MERCHANTID,   //商户代码，建行分配，必填
	    BRANCHID: config.blmApp.BRANCHID,  	    //分行代码，建行分配，必填
	    POSID: config.blmApp.POSID,  		    //商户柜台代码，建行分配，必填
	    ORDERDATE: orderDate,					//订单日期，格式'yyyymmdd',与ORDERID必须有一个输入
	    BEGORDERTIME: begOrderTime,				//订单开始时间，格式'hh:mm:ss',已结算流水查询只支持按日期查询
	    ENDORDERTIME: endOrderTime,				//订单结束时间，同上
	    ORDERID: orderId,  						//订单号，值可为空，若有值则只按订单号查询
	    QUPWD: config.blmApp.QUPWD,				//主管或操作员登录密码，必填，参与mac计算时不必填值
	    TXCODE: config.blmApp.QUERYTXCODE,		//交易码，必填，固定值
	    TYPE: type,								//流水类型，0为支付流水，1为退款流水，必填
	    KIND: kind,								//流水状态，0为未结算流水，1为已结算流水，当日只有未结算流水可查询，必填
	    STATUS: status,							//交易状态，0失败，1成功，2不确定，3全部，必填
	    SEL_TYPE: selType,						//查询方式，1页面形式，2文件返回形式，3XML页面形式，必填
	    PAGE: page,								//要查询的页码，必填
	    OPERATOR: operator,						//操作员
	    CHANNEL: '',							//预留字段
	    MAC: mac 								//MAC校验域
	};

	let queryURL = 'https://ibsbjstar.ccb.com.cn/app/ccbMain?' + qs.stringify(formalData).replace(/%3A/g, ':');
	console.log('query URL: ', queryURL);
	return queryURL;
};

module.exports = query;
