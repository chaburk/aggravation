import "./Board.css";
import Marble from "./Marble";
import Player from "./Player";

//create an updateboard function.

interface Space {
  id: number;
  type: "board" | "marble";
  active: boolean;
}
//15 x 15 grid only put spots on some of them
//need to have a board to contain the spaces
//112 middle
const spaces: React.ReactNode[] = [];

const spacesToKeep: number[] = [
  5, 6, 7, 8, 9, 14, 16, 20, 22, 24, 28, 32, 35, 37, 39, 42, 48, 50, 52, 54, 56,
  64, 65, 67, 69, 70, 75, 76, 77, 78, 79, 80, 82, 84, 85, 86, 87, 88, 89, 90,
  104, 105, 106, 107, 108, 109, 110, 114, 115, 116, 117, 118, 119, 120, 112,
  134, 135, 136, 137, 138, 139, 140, 142, 144, 145, 146, 147, 148, 149, 155,
  157, 159, 170, 172, 174, 185, 187, 189, 200, 202, 204, 215, 216, 217, 218,
  219,
];

const tempPlayer: number[] = [
  215, 200, 185, 170, 155, 140, 139, 138, 137, 136, 135, 120, 105, 90, 75, 76,
  77, 78, 79, 80, 65, 50, 35, 20, 5, 6, 7, 8, 9, 24, 39, 54, 69, 84, 85, 86, 87,
  88, 89, 104, 119, 134, 149, 148, 147, 146, 145, 144, 159, 174, 189, 204, 219,
  218, 217, 216,
];

//board for translation. each index refers to a space on the grid.
// const board: number[] = [
//   215, 200, 185, 170, 155, 140, 139, 138, 137, 136, 135, 120, 105, 90, 75, 76,
//   77, 78, 79, 80, 65, 50, 35, 20, 5, 6, 7, 8, 9, 24, 39, 54, 69, 84, 85, 86, 87,
//   88, 89, 104, 119, 134, 149, 148, 147, 146, 145, 144, 159, 174, 189, 204, 219,
//   218, 217, 216,
// ];
// console.log(board.indexOf(7));

//playerthreewin 105, 106, 107, 108, 109, 110,
//playerfourwin 114, 115, 116, 117, 118, 119,

const playerOneMarbles: number[] = [0, 16, 32, 48, 64];
const playerOneWin: number[] = [7, 23, 37, 52, 67, 82];
const playerTwoMarbles: number[] = [14, 28, 42, 56, 70];
const playerTwoWin: number[] = [142, 157, 172, 187, 202, 217];
const playerThreeMarbles: number[] = [210, 196, 182, 168, 154];
const playerFourMarbles: number[] = [224, 208, 192, 176, 160];

function createSpaces() {
  for (let i = 0; i < 225; i++) {
    if (playerOneMarbles.includes(i)) {
      spaces.push(
        <div className={`space marble`} key={i}>
          <Marble marbleColor={"red"} />
        </div>
      );
    } else if (playerTwoMarbles.includes(i)) {
      spaces.push(
        <div className={`space marble`} key={i}>
          <Marble marbleColor={"blue"} />
        </div>
      );
    } else if (playerThreeMarbles.includes(i)) {
      spaces.push(
        <div className={`space marble`} key={i}>
          <Marble marbleColor={"green"} />
        </div>
      );
    } else if (playerFourMarbles.includes(i)) {
      spaces.push(
        <div className={`space marble`} key={i}>
          <Marble marbleColor={"purple"} />
        </div>
      );
    } else if (spacesToKeep.includes(i)) {
      spaces.push(<div className={`space grid-item board_hole`} key={i}></div>);
    } else {
      spaces.push(<div className={`space grid-item hide`} key={i}></div>);
    }
  }
}

//need to pass in the players marbles / board and then call createSpaces to update board.
//useeffect to update a board when something is passed
createSpaces();

const updateBoard = (gameBoard) => {
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] !== 0) {
      spaces[tempPlayer[i]] = (
        <div className={`space marble possible-move`} key={i}>
          <Marble marbleColor={"purple"} />
        </div>
      );
    }
  }
};

console.log(spaces.length);

const Board = ({ players, board }) => {
  const numOfPlayers = Object.keys(players).length;
  const playerPositions = [];
  updateBoard(board);
  for (let i = 1; i <= numOfPlayers; i++) {
    let position: string = "";
    let active = players[i].active;
    if (i === 1) {
      position = "bottom-right";
    } else if (i === 2) {
      position = "top-left";
    } else if (i === 3) {
      position = "bottom-left";
    } else if (i === 4) {
      position = "top-right";
    }
    playerPositions.push(
      <div className={`player ${position} `}>
        <Player
          playerColor={players[i].color}
          playerName={players[i].name}
          active={active}
        />
      </div>
    );
  }
  return (
    <div className="board__container">
      <div className="board">
        {playerPositions}
        <div className="inner-board">
          <div className="inner-board-container">{spaces}</div>
        </div>
      </div>
    </div>
  );
};

export default Board;
