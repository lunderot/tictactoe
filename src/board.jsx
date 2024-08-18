import './board.css';

function Tile({ id, data }) {
    return (
        <div class={'tile ' + data} id={id}></div>
    )
}

const planes = [0, 1, 2]
const tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8]

export function Board({ tiledata }) {
    return (
        <div id="board">
            {
                planes.map(planeindex =>
                    <div class="plane">
                        {
                            tiles.map(tileindex => {
                                const index = planeindex * 9 + tileindex;
                                return <Tile id={index} data={tiledata[index]} />
                            }
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}