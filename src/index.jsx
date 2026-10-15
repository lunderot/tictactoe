import { render } from 'preact';
import { selfId } from 'trystero'
import { useRoom } from './useRoom';

import './style.css';
import { Board } from './board';
import { RoomDialog } from './roomDialog';
import { ScoreDisplay } from './scoreDisplay'
import { useEffect, useReducer, useRef } from 'preact/hooks';
import { gameReducer, initialGame, State, Action, isValidMove } from './gameState';
import { SpinnerDialog } from './spinnerDialog';

function getOrGenerateRoomId() {
	const randomId = Math.random().toString(2).slice(2, 16).split('').map(a => a == '0' ? 'x' : 'o').join('');
	return window.location.hash.slice(1) || randomId;
}
const roomId = getOrGenerateRoomId();
const trysteroConfig = { appId: 'lunderot-tictactoe', relayConfig: { warnOnRelayFailure: false } };

function equal(a, b) {
	if (a.byteLength != b.byteLength) return false;
	const dv1 = new Int8Array(a);
	const dv2 = new Int8Array(b);
	for (var i = 0; i != a.byteLength; i++) {
		if (dv1[i] != dv2[i]) return false;
	}
	return true;
}

function xor(a, b) {
	if (a.length !== b.length) {
		throw new Error("Arrays must be the same length");
	}
	const va = new Uint8Array(a);
	const vb = new Uint8Array(b);
	const result = new Uint8Array(a.length);
	for (let i = 0; i < a.length; i++) {
		result[i] = va[i] ^ vb[i];
	}
	return result;
}

const seed = new Uint8Array(32);
crypto.getRandomValues(seed);
const hash = await crypto.subtle.digest('SHA-256', seed);
let enemyHash;
let enemySeed;
let finalSeed;

export function App() {
	const room = useRoom(trysteroConfig, roomId);
	const actions = useRef(null);
	const [game, dispatch] = useReducer(gameReducer, initialGame);

	useEffect(() => {
		const placeAction = room.makeAction('place', {
			onMessage: (index, { peerId }) => dispatch({ type: 'place', index, marker: 'o' })
		});

		const exchangeHash = room.makeAction('rnghash', {
			kind: 'request',
			onRequest: r => {
				enemyHash = r;
				console.log(`got enemy hash: ${new Uint8Array(r).toBase64()}`);
				return hash;
			},
		});

		const exchangeSeed = room.makeAction('rngseed', {
			kind: 'request',
			onRequest: s => {
				enemySeed = s;
				console.log(`got enemy seed: ${new Uint8Array(s).toBase64()}`);

				crypto.subtle.digest('SHA-256', s).then(computedEnemyHash => {
					if (equal(computedEnemyHash, enemyHash)) {
						finalSeed = xor(seed, enemySeed);
						console.log(`hashes match!`);
						console.log(`final seed: ${new Uint8Array(finalSeed).toBase64()}`);
					}
					const isLocalTurn = !(new Uint8Array(finalSeed)[0] & 1);
					dispatch({ type: 'seed', seed: finalSeed, isLocalTurn });
				})
				return enemyHash ? seed : 0;
			},
		});

		room.onPeerJoin = peerId => {
			console.log('Peer joined', peerId);
			console.log(`my hash: ${new Uint8Array(hash).toBase64()}`);
			console.log(`my seed: ${new Uint8Array(seed).toBase64()}`);

			if (selfId < peerId) {
				exchangeHash.request(hash, { target: peerId })
					.then(h => enemyHash = h)
					.then(h => {
						console.log(`got enemy hash: ${new Uint8Array(h).toBase64()}`);
						return exchangeSeed.request(seed, { target: peerId });
					})
					.then(s => {
						console.log(`got enemy seed: ${new Uint8Array(s).toBase64()}`);
						enemySeed = s;
						return crypto.subtle.digest('SHA-256', s);
					})
					.then(computedEnemyHash => {
						console.log(`computed enemy seed: ${new Uint8Array(computedEnemyHash).toBase64()}`);
						if (equal(computedEnemyHash, enemyHash)) {
							finalSeed = xor(seed, enemySeed);
							console.log(`hashes match!`);
							console.log(`final seed: ${new Uint8Array(finalSeed).toBase64()}`);
						}
						return finalSeed;
					})
					.then(finalSeed => {
						const isLocalTurn = !!(new Uint8Array(finalSeed)[0] & 1);
						dispatch({ type: 'seed', seed: finalSeed, isLocalTurn });
					});
			}
			dispatch({ type: 'join', peerId });
		};
		room.onPeerLeave = peerId => {
			console.log('Peer left');
			dispatch({ type: 'leave', peerId });
		};

		actions.current = { placeAction, exchangeHashAction: exchangeHash, exchangeSeedAction: exchangeSeed };

		return () => room.leave();
	}, [room]);

	const handlePlace = (index) => {
		if (game.isLocalTurn && isValidMove(game.board, index)) {
			actions.current.placeAction.send(index);
			dispatch({ type: 'place', index, marker: 'x' });
		}
	};

	useEffect(() => {
		if (game.state == State.postgame) {
			const timer = setTimeout(() => {
				dispatch({ type: Action.clear });
			}, 3000);

			return () => clearTimeout(timer);
		}
		if (game.state == State.pregame) {
			const timer = setTimeout(() => {
				dispatch({ type: Action.goIngame });
			}, 8000);

			return () => clearTimeout(timer);
		}
	}, [game.state]);

	return (
		<>
			<pre style="position:absolute">{JSON.stringify(game, null, 2)}</pre>

			<Board tiledata={game.board} onPlace={handlePlace} />
			<ScoreDisplay tiledata={game.board} isLocalTurn={game.isLocalTurn} isIngame={game.state == State.ingame} />


			{game.state == State.pregame && <SpinnerDialog />}
			{game.state == State.lobby && <RoomDialog link={`${window.location.origin + window.location.pathname}#${roomId}`} />}
		</>
	);
}

render(<App />, document.getElementById('app'));
