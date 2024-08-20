import './board.css';

function Tile({ id, data, handleClick }) {
    return (
        <div class={'tile ' + data} id={id} onClick={handleClick}></div>
    )
}

const planes = [0, 1, 2]
const tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8]

export function Board({ tiledata, onPlace }) {
    const handleClick = e => onPlace(e.target.getAttribute("id"))
    return (
        <div id="board">
            {
                planes.map(planeindex =>
                    <div class="plane">
                        {
                            tiles.map(tileindex => {
                                const index = planeindex * 9 + tileindex;
                                return <Tile id={index} data={tiledata[index]} handleClick={handleClick} />
                            }
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}