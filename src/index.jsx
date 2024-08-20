import { render } from 'preact';
import { signal, computed } from '@preact/signals'
import { combos } from './combos.jsx'

import './style.css';
import { Board } from './board';

const tiles = signal(Array(27).fill(' '));

function getScore(tiles, marker) {
	const scoremap = parseInt(tiles.map(c => c == marker ? '1' : '0').join(''), 2);
	return combos.reduce(
		(prev, combo) => (prev + Number((scoremap & combo) == combo)
		), 0
	);
}

const score = computed(() => ({
	x: getScore(tiles.value, 'x'),
	o: getScore(tiles.value, 'o'),
}));

const handlePlace = (index) => {
	const t = [...tiles.value];
	t[parseInt(index)] = 'x';
	tiles.value = t;
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
