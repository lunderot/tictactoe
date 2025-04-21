import './scoreDisplay.css';
import { computed } from '@preact/signals'
import { tilesToScore } from './combos'

export function ScoreDisplay({ tiledata }) {
    const score = computed(() => ({
        x: tilesToScore(tiledata.value, 'x'),
        o: tilesToScore(tiledata.value, 'o'),
    }));
    
    return (
        <div id="scoreDisplay">
            <div>{score.value.x}</div>
            <div>{score.value.o}</div>
        </div>
    );
}