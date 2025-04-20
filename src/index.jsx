import { render } from 'preact';
import { signal, computed } from '@preact/signals'
import { joinRoom } from 'trystero'

import { tilesToScore } from './combos'
import { Board } from './board';
import './style.css';
import { RoomDialog } from './roomDialog';

const tiles = signal(Array(27).fill(' '));

const score = computed(() => ({
	x: tilesToScore(tiles.value, 'x'),
	o: tilesToScore(tiles.value, 'o'),
}));
const gameState = signal(1);

function getOrGenerateRoomId() {
	return window.location.hash.slice(1) || crypto.randomUUID();
}

const roomId = getOrGenerateRoomId();
const trysteroConfig = { appId: 'lunderot-tictactoe' }
const room = joinRoom(trysteroConfig, roomId);
const [sendPlace, getPlace] = room.makeAction('place');
getPlace((index, peer) => {
	console.log(`Peer sent ${index}`)
	handlePlace(index, 'o');
});
room.onPeerJoin(() => {
	console.log('Peer joined')
	gameState.value = 0;
});

const handlePlace = (index, marker = 'x') => {
	const t = [...tiles.value];
	t[parseInt(index)] = marker;
	tiles.value = t;
	if (marker == 'x')
		sendPlace(index);
}

export function App() {
	return (
		<>
			<div>Score X: {score.value.x}</div>
			<div>Score O: {score.value.o}</div>
			<Board tiledata={tiles.value} onPlace={handlePlace} />
			{gameState.value && <RoomDialog link={`${window.location.origin}#${roomId}`} />}
		</>
	);
}

render(<App />, document.getElementById('app'));
