'use strict'
const net = require('net');
var notify = {};

notify.verify = function(request) {
	console.log('req body: ', request.params);
	let originalUrl = request.originalUrl;
	let index = originalUrl.indexOf('?') + 1;
	let verifiedData = originalUrl.slice(index) + '\n';
	let isVerified = false;
	let isNormal = true;


	const client = net.connect({port: 55500}, () => {
		console.log('connected to server!');
		client.write(verifiedData);
	});

	client.on('data', (data) => {
		let result = data.toString();
		console.log('received data: ', result);
		client.destroy();
		if (result.startsWith('Y')) {
			console.log('verified successfully...');
			isVerified = true;
			return {
				isNormal: isNormal,
				isVerified: isVerified
			};
		} else if (result.startsWith('N')) {
			console.log('verified failed...');
			return {
				isNormal: isNormal,
				isVerified: isVerified
			};
		}
	});

	client.on('error', () => {
		console.log('something is wrong...');
		client.destroy();
		return { isNormal: false };
	});

	client.on('end', () => {
		console.log('disconnected from server');
	})
}

module.exports = notify;