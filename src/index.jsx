import { render } from 'preact';
import { joinRoom } from 'trystero'

import './style.css';
import { Board } from './board';
import { RoomDialog } from './roomDialog';
import { ScoreDisplay } from './scoreDisplay'
import { useReducer } from 'preact/hooks';
import { gameReducer, initialGame } from './gameState';

function getOrGenerateRoomId() {
	return window.location.hash.slice(1) || crypto.randomUUID();
}
const roomId = getOrGenerateRoomId();
const trysteroConfig = { appId: 'lunderot-tictactoe' }
const room = joinRoom(trysteroConfig, roomId);
const [sendPlace, getPlace] = room.makeAction('place');

export function App() {
	const [game, dispatch] = useReducer(gameReducer, initialGame);

	getPlace((index, peer) => {
		console.log(`Peer sent ${index}`);
		handlePlace(index, 'o');
	});
	room.onPeerJoin(peerId => {
		console.log('Peer joined');
		dispatch({ type: 'join', peerId: peerId });
	});
	room.onPeerLeave(peerId => {
		console.log('Peer left');
		dispatch({ type: 'leave', peerId: peerId });
	});

	const handlePlace = (index, marker = 'x') => {
		dispatch({ type: 'place', index, marker });
		if (marker == 'x')
			sendPlace(index);
	}

	return (
		<>
			<div>{JSON.stringify(game)}</div>
			<Board tiledata={game.board} onPlace={handlePlace} />
			<ScoreDisplay tiledata={game.board} />
			{game.state == 'lobby' && <RoomDialog link={`${window.location.origin + window.location.pathname}#${roomId}`} />}
		</>
	);
}

render(<App />, document.getElementById('app'));
