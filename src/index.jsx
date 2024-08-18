import { render } from 'preact';

import './style.css';
import { Board } from './board';

export function App() {
	const tilestate = [' ', 'x', 'o']
	const tiles = Array(27).fill().map(_ =>
		tilestate[Math.floor(Math.random() * tilestate.length)]
	)
	return (
		<>
			<Board tiledata={tiles}/>
		</>
	);
}

render(<App />, document.getElementById('app'));
