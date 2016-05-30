'use strict'
const net = require('net');
var notify = {};

notify.verify = function(request) {
	console.log('req body: ', request.params);
	let originalUrl = request.originalUrl;
	let index = originalUrl.indexOf('?') + 1;
	let verifiedData = originalUrl.slice(index) + '\n';

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
		} else if (result.startsWith('N')) {
			console.log('verified failed...');
		}
	});

	client.on('error', (err) => {
		console.error(err);
		client.destroy();
	});

	client.on('end', () => {
		console.log('disconnected from server');
	})
}

module.exports = notify;