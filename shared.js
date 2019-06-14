let state = {};
let me = '';
let conn = null;

let combos = [
	0b111000000000000000000000000,
	0b000111000000000000000000000,
	0b000000111000000000000000000,
	0b000000000111000000000000000,
	0b000000000000111000000000000,
	0b000000000000000111000000000,
	0b000000000000000000111000000,
	0b000000000000000000000111000,
	0b000000000000000000000000111,

	0b000000000000000000001001001,
	0b000000000000000000010010010,
	0b000000000000000000100100100,
	0b000000000001001001000000000,
	0b000000000010010010000000000,
	0b000000000100100100000000000,
	0b001001001000000000000000000,
	0b010010010000000000000000000,
	0b100100100000000000000000000,

	0b000000000000000000100010001,
	0b000000000100010001000000000,
	0b100010001000000000000000000,
	0b000000000000000000001010100,
	0b000000000001010100000000000,
	0b001010100000000000000000000,

	0b000000001000000001000000001,
	0b000000010000000010000000010,
	0b000000100000000100000000100,
	0b000001000000001000000001000,
	0b000010000000010000000010000,
	0b000100000000100000000100000,
	0b001000000001000000001000000,
	0b010000000010000000010000000,
	0b100000000100000000100000000,

	0b000000100000000010000000001,
	0b000100000000010000000001000,
	0b100000000010000000001000000,
	0b000000001000000010000000100,
	0b000001000000010000000100000,
	0b001000000010000000100000000,

	0b001000000000001000000000001,
	0b010000000000010000000000010,
	0b100000000000100000000000100,
	0b000000001000001000001000000,
	0b000000010000010000010000000,
	0b000000100000100000100000000,

	0b100000000000010000000000001,
	0b001000000000010000000000100,
	0b000000001000010000100000000,
	0b000000100000010000001000000,
];

function getScore(player) {
	let score = 0;
	let marker = getCharFromPlayer(player);
	let markers =
		state.board.join()
			.replace(/,/g, '')
			.replace(/x/g, marker == 'x' ? '1' : '0')
			.replace(/o/g, marker == 'x' ? '0' : '1')

	let packed = parseInt(markers, 2);
	combos.forEach((combo) => {
		if ((packed & combo) == combo) {
			score++;
		}
	});
	return score;
}

function updateState(data) {
	state = data;
	console.log('State ' + data);
	document.querySelectorAll('.button').forEach((element, index) => {
		element.classList = 'button';
		if (state.board[index] != '0')
			element.classList.add(state.board[index]);
	});
	document.querySelector('#score-container .x').innerHTML = getScore('master').toString();
	document.querySelector('#score-container .o').innerHTML = getScore('slave').toString();
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
	updateState(data);
}

export { updateState, init, receive, sendState }