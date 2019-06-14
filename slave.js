import * as shared from './shared'

let state = {};

function receive(conn, data) {
	console.log('Slave got data: ');
	console.log(data);
	shared.updateState(data);
}

function init(conn) {
	shared.init('slave');
	conn.send(JSON.stringify(
		{
			request: 'state'
		}
	));
}

export { receive, init };