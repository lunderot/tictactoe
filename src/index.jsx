import { render } from 'preact';
import { signal, computed } from '@preact/signals'
import { joinRoom } from 'trystero'

import { tilesToScore } from './combos'
import { Board } from './board';
import './style.css';

const tiles = signal(Array(27).fill(' '));

const score = computed(() => ({
	x: tilesToScore(tiles.value, 'x'),
	o: tilesToScore(tiles.value, 'o'),
}));

const trysteroConfig = {appId: 'lunderot-tictactoe'}
const room = joinRoom(trysteroConfig, 'testing');
const [sendPlace, getPlace] = room.makeAction('place');
getPlace((index, peer) => {
	console.log(`Peer sent ${index}`)
	handlePlace(index, 'o');
});
room.onPeerJoin(() => console.log('Peer joined'));

const handlePlace = (index, marker = 'x') => {
	const t = [...tiles.value];
	t[parseInt(index)] = marker;
	tiles.value = t;
	if(marker == 'x')
		sendPlace(index);
}

export function App() {
	return (
		<>
			<div>Score X: {score.value.x}</div>
			<div>Score O: {score.value.o}</div>
			<Board tiledata={tiles.value} onPlace={handlePlace} />
		</>
	);
}

render(<App />, document.getElementById('app'));
