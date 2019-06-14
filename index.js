import Peer from 'peerjs';
import * as master from './master.js'
import * as slave from './slave.js'

var peer = new Peer();

if (window.location.hash) {
	console.log('connecting to ' + window.location.hash.substring(1));
	const conn = peer.connect(window.location.hash.substring(1));
	conn.on('open', () => {
		conn.on('data', data => {
			slave.receive(conn, JSON.parse(data));
		});
		slave.init(conn);
	});
}
else {
	peer.on('connection', conn => {
		master.init();
		conn.on('data', data => {
			master.receive(conn, JSON.parse(data));
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