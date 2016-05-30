'use strict'
const net = require('net');
var notify = {};

notify.verify = function(request, response) {
	console.log('req body: ', request.params);
	let originalUrl = request.originalUrl;
	let index = originalUrl.indexOf('?') + 1;
	let verifiedData = originalUrl.slice(index) + '\n';

	const client = net.connect({port: 55500}, () => {
		console.log('connected to the server!');
		client.write(verifiedData);
	});

	client.on('data', (data) => {
		let result = data.toString();
		console.log('received data: ', result);
		client.destroy();
		if (result.startsWith('Y')) {
			console.log('verified successfully...');
			response.send({'result': {'isVerified': true}});
		} else if (result.startsWith('N')) {
			console.log('verified failed...');
			response.send({'result': {'isVerified': false}});
		}
	});

	client.on('error', (err) => {
		console.error(err);
		client.destroy();
		response.status(500).send('something is wrong with the verify server');
	});

	client.on('end', () => {
		console.log('disconnected from the server');
	})
}

module.exports = notify;