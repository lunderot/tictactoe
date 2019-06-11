import Peer from 'peerjs';
var peer = new Peer();

if (window.location.hash) {
	console.log('connecting to ' + window.location.hash.substring(1));
	const conn = peer.connect(window.location.hash.substring(1));
	conn.on('open', (id) => {
		conn.on('data', function (data) {
			console.log('Received', data);
		});
		conn.send('hi!');
	});
}
else {
	peer.on('connection', (conn) => {
		conn.on('data', (data) => {
			console.log(data);
		});
	});
	peer.on('open', (id) => {
		document.write('<a target="_blank" rel="noopener noreferrer" href="' + 'http://localhost:1234#' + id + '">Click to open!</a>');
	});
}