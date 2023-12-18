import "./Board.css";
import Marble from "./Marble";
import Player from "./Player";

interface Space {
  id: number;
  type: "board" | "marble";
  active: boolean;
}
//15 x 15 grid only put spots on some of them
//need to have a board to contain the spaces
//112 middle
const spaces: React.ReactNode[] = [];

const spacesToKeep: int = [
  5, 6, 7, 8, 9, 14, 16, 20, 22, 24, 28, 32, 35, 37, 39, 42, 48, 50, 52, 54, 56,
  64, 65, 67, 69, 70, 75, 76, 77, 78, 79, 80, 82, 84, 85, 86, 87, 88, 89, 90,
  104, 105, 106, 107, 108, 109, 110, 114, 115, 116, 117, 118, 119, 120, 112,
  134, 135, 136, 137, 138, 139, 140, 142, 144, 145, 146, 147, 148, 149, 155,
  157, 159, 170, 172, 174, 185, 187, 189, 200, 202, 204, 215, 216, 217, 218,
  219,
];
//playerthreewin 105, 106, 107, 108, 109, 110,
//playerfourwin 114, 115, 116, 117, 118, 119,
//for the win, i can render smaller ones? keep same outside size but render smaller
//can do the same for the marbles because it looks bad
//how should i do this? should i create a dictionary to map them so inside the game its just 1-n
const playerOneMarbles: int = [0, 16, 32, 48, 64];
const playerOneWin: int = [7, 23, 37, 52, 67, 82];
const playerTwoMarbles: int = [14, 28, 42, 56, 70];
const playerTwoWin: int = [142, 157, 172, 187, 202, 217];
const playerThreeMarbles: int = [210, 196, 182, 168, 154];
const playerFourMarbles: int = [224, 208, 192, 176, 160];

function createSpaces() {
  for (let i = 0; i < 225; i++) {
    if (playerOneMarbles.includes(i)) {
      spaces.push(<div className={`space grid-item playerOne`} key={i}></div>);
    } else if (playerTwoMarbles.includes(i)) {
      spaces.push(<div className={`space grid-item playerTwo`} key={i}></div>);
    } else if (playerThreeMarbles.includes(i)) {
      spaces.push(
        <div className={`space grid-item playerThree`} key={i}></div>
      );
    } else if (playerFourMarbles.includes(i)) {
      spaces.push(<div className={`space grid-item playerFour`} key={i}></div>);
    } else if (spacesToKeep.includes(i)) {
      spaces.push(<div className={`space grid-item`} key={i}></div>);
    } else {
      spaces.push(<div className={`space grid-item hide`} key={i}></div>);
    }
  }
}

createSpaces();

const Board = () => {
  //Logic of the game will be in this file?
  return (
    <div className="board__container">
      <div className="board">
        <div className="player top-left">
          <Player colorBg={"red"} />
        </div>
        <div className="player top-right">
          <Player colorBg={"blue"} />
        </div>
        <div className="player bottom-left">
          <Player colorBg={"green"} />
        </div>
        <div className="player bottom-right">
          <Player colorBg={"purple"} />
        </div>
        <div className="inner-board">
          <div className="inner-board-container">{spaces}</div>
        </div>
      </div>
    </div>
  );
};

export default Board;
