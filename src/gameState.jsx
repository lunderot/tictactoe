const State = {
    lobby: 'lobby',
    ingame: 'ingame',
    postgame: 'postgame',
};

const Action = {
    join: 'join',
    leave: 'leave',
    place: 'place',
    reset: 'reset',
};

export const initialGame = {
    state: State.lobby,
    board: Array(27).fill(' '),
    enemyPeerId: null,
};

function isValidMove(board, index) {
    return board[index] == ' ';
}

function isFull(board) {
    return !board.includes(' ');
}

export function gameReducer(game, action) {
    switch (action.type) {
        case Action.join:
            if (game.state == State.lobby) {
                game = { ...game, state: State.ingame, enemyPeerId: action.peerId };
            }
            break;
        case Action.leave:
            if (game.enemyPeerId == action.peerId) {
                game = initialGame;
            }
            break;
        case Action.place:
            if (game.state == State.ingame && isValidMove(game.board, action.index)) {
                const board = game.board.toSpliced(action.index, 1, action.marker);
                const state = isFull(board) ? State.postgame : game.state;
                game = { ...game, board: board, state: state };
            }
            break;
        case Action.reset:
            game = initialGame;
            break;
        default:
            break;
    }
    return game;
}