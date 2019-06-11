import Peer from 'peerjs';
var peer = new Peer();

if (window.location.hash) {
	console.log('connecting to ' + window.location.hash.substring(1));
	const conn = peer.connect(window.location.hash.substring(1));
	conn.on('open', (id) => {
		conn.on('data', function (data) {
			console.log('Received', data);
		});
		setInterval(()=>conn.send('hi '+Math.random()), 1000);
	});
}
else {
	peer.on('connection', (conn) => {
		conn.on('data', (data) => {
			console.log(data);
		});
	});
	peer.on('open', (id) => {
		document.querySelector('#share-link').value = window.location + '#' + id;
		document.querySelector('#share-link-click').href = window.location + '#' + id;
	});
	peer.on('disconnected', () => {
		console.log('disconnected')
	});
	peer.on('error', (error) => {
		console.error(error);
	})
}