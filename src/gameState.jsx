export const initialGame = {
    state: 'lobby',
    board: Array(27).fill(' '),
    enemyPeerId: null,
};

export function gameReducer(game, action) {
    switch (action.type) {
        case 'join':
            if (game.state == 'lobby') {
                return { ...game, state: 'ingame', enemyPeerId: action.peerId };
            }
            break;
        case 'leave':
            if (game.state == 'ingame' && game.enemyPeerId == action.peerId) {
                return initialGame;
            }
            break;
        case 'place':
            if (game.state == 'ingame') {
                return { ...game, board: game.board.toSpliced(action.index, 1, action.marker) };
            }
            break;
        case 'reset':
            return initialGame;
            break;
        default:
            break;
    }
    return game;
}