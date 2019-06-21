import Peer from 'peerjs';
import * as shared from './shared.js'

var peer = new Peer();

if (window.location.hash) {
	console.log('connecting to ' + window.location.hash.substring(1));
	const conn = peer.connect(window.location.hash.substring(1));
	conn.on('open', () => {
		conn.on('data', data => {
			shared.receive(conn, JSON.parse(data));
		});
		shared.init('slave', conn);
	});
}
else {
	peer.on('connection', conn => {
		shared.init('master', conn);
		shared.reset();
		conn.on('data', data => {
			shared.receive(conn, JSON.parse(data));
		});
	});
	peer.on('open', id => {
		document.querySelector('#share-link').value = window.location + '#' + id;
		document.querySelector('#share-link-click').href = window.location + '#' + id;
	});
	peer.on('disconnected', () => {
		console.log('disconnected')
	});
	peer.on('error', error => {
		console.error(error);
	})
}