let state = {};
let me = '';
let conn = null;

function updateState(data) {
	state = data;
	console.log('State ' + data);
	document.querySelectorAll('.button').forEach((element, index) => {
		element.classList = 'button';
		if (state.board[index] != '0')
			element.classList.add(state.board[index]);
	});
}

function sendState() {
	conn.send(JSON.stringify(state));
}

function isValidMove(move) {
	return state.board[move] == '0';
}

function getOppositePlayer() {
	return me == 'master' ? 'slave' : 'master';
}

function getCharFromPlayer(player) {
	return player == 'master' ? 'x' : 'o';
}

function click(index) {
	if (me == state.turn) {
		if (isValidMove(index)) {
			state.board[index] = getCharFromPlayer(me);
			state.turn = getOppositePlayer();
			updateState(state);
			sendState();
		}
		else {
			console.log('Invalid move');
		}
	}
	else {
		console.log('It\'s not your turn');
	}

}

function init(player, connection) {
	me = player;
	conn = connection;
	document.querySelectorAll('.button').forEach((element, index) => {
		element.addEventListener('click', () => {
			click(index);
		})
	})
}

function receive(conn, data) {
	console.log('shared.recv')
	console.log(data);
	if (data.turn == me) {
		updateState(data);
	}
}

export { updateState, init, receive, sendState }