import './scoreDisplay.css';
import { computed } from '@preact/signals'
import { tilesToScore } from './combos'

export function ScoreDisplay({ tiledata }) {
    return (
        <div id="scoreDisplay">
            <div>{tilesToScore(tiledata, 'x')}</div>
            <div>{tilesToScore(tiledata, 'o')}</div>
        </div>
    );
}