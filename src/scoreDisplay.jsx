import './scoreDisplay.css';
import { computed } from '@preact/signals'
import { tilesToScore } from './combos'

export function ScoreDisplay({ tiledata, isLocalTurn, isIngame }) {
    const classSelector = isIngame ? isLocalTurn ? 'current' : 'not-current' : '';
    return (
        <div id="scoreDisplay">
            <div class={classSelector}>{tilesToScore(tiledata, 'x')}</div>
            <div>{tilesToScore(tiledata, 'o')}</div>
        </div>
    );
}