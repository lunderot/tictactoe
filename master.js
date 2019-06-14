import * as shared from './shared'

let state = {
	turn: 'master',
	board: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
};

function init(conn) {
	shared.init('master', conn);
	shared.updateState(state);
	shared.sendState();
}

export { init };