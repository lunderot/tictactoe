var state = {};

function updateState(data) {
	state = data;
	document.querySelectorAll('.button').forEach((element, index) => {
		element.classList = 'button';
		if (state.board[index] != '0')
			element.classList.add(state.board[index]);
	});
}

function click(index, player) {
	if (player == state.turn) {
		state.board[index] = player == 'master' ? 'x' : 'o';
		updateState(state);
	}
	else
		console.log('It\'s not your turn');

}

function init(player) {
	document.querySelectorAll('.button').forEach((element, index) => {
		element.addEventListener('click', () => {
			click(index, player);
		})
	})
}

export { updateState, init }