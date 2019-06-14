import * as shared from './shared'

let state = {
	request: 'state',
	turn: 'master',
	board: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'x']
};

function receive(conn, data) {
	if (data.request == 'state') {
		conn.send(JSON.stringify(state));
	}
}

function init(conn) {
	shared.updateState(state);
	shared.init('master');
}

export { receive, init };