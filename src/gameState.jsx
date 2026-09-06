export const State = {
    lobby: 'lobby',
    pregame: 'pregame',
    ingame: 'ingame',
    postgame: 'postgame',
};

export const Action = {
    join: 'join',
    leave: 'leave',
    goIngame: 'goIngame',
    place: 'place',
    clear: 'clear',
    seed: 'seed',
};

export const initialGame = {
    state: State.lobby,
    board: Array(27).fill(' '),
    enemyPeerId: null,
    isLocalTurn: true,
    seed: null,
};

export function isValidMove(board, index) {
    return board[index] == ' ';
}

function isFull(board) {
    return !board.includes(' ');
}

export function gameReducer(game, action) {
    switch (action.type) {
        case Action.join:
            if (game.state == State.lobby) {
                game = { ...game, state: State.pregame, enemyPeerId: action.peerId };
            }
            break;
        case Action.leave:
            if (game.enemyPeerId == action.peerId) {
                game = initialGame;
            }
            break;
        case Action.place:
            if (game.state == State.ingame) {
                const board = game.board.toSpliced(action.index, 1, action.marker);
                const state = isFull(board) ? State.postgame : game.state;
                const isLocalTurn = !game.isLocalTurn;
                game = { ...game, board: board, state: state, isLocalTurn: isLocalTurn };
            }
            break;
        case Action.goIngame:
            game = { ...game, state: State.ingame };
            break;
        case Action.clear:
            game = { ...game, state: State.pregame, board: initialGame.board };
            break;
        case Action.seed:
            game = { ...game, isLocalTurn: action.isLocalTurn, seed: action.seed };
            break;
        default:
            break;
    }
    return game;
}