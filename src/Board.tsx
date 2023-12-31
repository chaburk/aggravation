import { useState, useEffect } from "react";
import "./Board.css";
import Marble from "./Marble";
import Player from "./Player";
import Die from "./Die";
import { Players } from "./types";

//Array of spaces to keep for board layout
const spacesToKeep: number[] = [
  5, 6, 7, 8, 9, 14, 16, 20, 22, 24, 28, 32, 35, 37, 39, 42, 48, 50, 52, 54, 56,
  64, 65, 67, 69, 70, 75, 76, 77, 78, 79, 80, 82, 84, 85, 86, 87, 88, 89, 90,
  104, 105, 106, 107, 108, 109, 110, 114, 115, 116, 117, 118, 119, 120, 112,
  134, 135, 136, 137, 138, 139, 140, 142, 144, 145, 146, 147, 148, 149, 155,
  157, 159, 170, 172, 174, 185, 187, 189, 200, 202, 204, 215, 216, 217, 218,
  219,
];

//board for translation. each index refers to a space on the grid.
const boardTranslation: number[] = [
  215, 200, 185, 170, 155, 140, 139, 138, 137, 136, 135, 120, 105, 90, 75, 76,
  77, 78, 79, 80, 65, 50, 35, 20, 5, 6, 7, 8, 9, 24, 39, 54, 69, 84, 85, 86, 87,
  88, 89, 104, 119, 134, 149, 148, 147, 146, 145, 144, 159, 174, 189, 204, 219,
  218, 217, 216,
];

//marbles are not correct spots
const playerOneMarbles: number[] = [0, 16, 32, 48, 64];
//const playerOneWin: number[] = [7, 23, 37, 52, 67, 82];
const playerTwoMarbles: number[] = [14, 28, 42, 56, 70];
//const playerTwoWin: number[] = [142, 157, 172, 187, 202, 217];
const playerThreeMarbles: number[] = [210, 196, 182, 168, 154];
//const playerThreeWin: number[] = [105, 106, 107, 108, 109, 110];
const playerFourMarbles: number[] = [224, 208, 192, 176, 160];
//const playerFourWin: number[] = [114, 115, 116, 117, 118, 119];

//function to initialize spaces array
function createSpaces() {
  const spaces: React.ReactNode[] = [];

  for (let i = 0; i < 225; i++) {
    if (playerOneMarbles.includes(i)) {
      spaces.push(
        <div
          className={`space marble`}
          key={`playerOne-${i}`}
          onClick={() => {
            console.log(`marble ${i} clicked`);
          }}
        >
          <Marble marbleColor={"blue"} />
        </div>
      );
    } else if (playerTwoMarbles.includes(i)) {
      spaces.push(
        <div className={`space marble`} key={`playerTwo-${i}`}>
          <Marble marbleColor={"purple"} />
        </div>
      );
    } else if (playerThreeMarbles.includes(i)) {
      spaces.push(
        <div className={`space marble`} key={`playerThree-${i}`}>
          <Marble marbleColor={"green"} />
        </div>
      );
    } else if (playerFourMarbles.includes(i)) {
      spaces.push(
        <div className={`space marble`} key={`playerFour-${i}`}>
          <Marble marbleColor={"red"} />
        </div>
      );
    } else if (spacesToKeep.includes(i)) {
      spaces.push(
        <div className={`space grid-item board_hole`} key={`hole-${i}`}></div>
      );
    } else {
      spaces.push(
        <div className={`space grid-item hide`} key={`hide-${i}`}></div>
      );
    }
  }

  return spaces;
}

const addPlayers = (players: Players, numOfPlayers: number) => {
  const playerPositions = [];
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
      <div className={`player ${position}`} key={`player${i}`}>
        <Player
          playerColor={players[i].color}
          playerName={players[i].name}
          active={active}
        />
      </div>
    );
  }
  return playerPositions;
};

interface BoardProps {
  players: Players;
  board: number[];
  getRollValue: (roll: number) => void;
  move: boolean;
  changeMove: () => void;
  marbleToUpdate: (marbleId: number) => void;
  takeOutMarble: () => void;
}

const Board: React.FC<BoardProps> = ({
  players,
  board,
  getRollValue,
  move,
  changeMove,
  marbleToUpdate,
  takeOutMarble,
}) => {
  const spacesInit = createSpaces();
  const [spaces, setSpaces] = useState(spacesInit);

  const numOfPlayers = Object.keys(players).length;
  const playerPositions = addPlayers(players, numOfPlayers);

  const updatePlayerMarbles = () => {
    const updatedSpaces = [...spaces];
    //will update base on how many marbles are in players and function will be to bring out a marble
    for (let i = 0; i < 225; i++) {
      if (playerOneMarbles.includes(i)) {
        updatedSpaces[i] = (
          <div
            className={`space marble`}
            key={`playerOne-${i}`}
            onClick={() => {
              console.log(`marble ${i} clicked`);
              takeOutMarble();
            }}
          >
            <Marble marbleColor={"blue"} />
          </div>
        );
      } else if (playerTwoMarbles.includes(i)) {
        updatedSpaces[i] = (
          <div
            className={`space marble`}
            key={`playerOne-${i}`}
            onClick={() => {
              console.log(`marble ${i} clicked`);
              takeOutMarble();
            }}
          >
            <Marble marbleColor={"purple"} />
          </div>
        );
      } else if (playerThreeMarbles.includes(i)) {
        updatedSpaces[i] = (
          <div
            className={`space marble`}
            key={`playerOne-${i}`}
            onClick={() => {
              console.log(`marble ${i} clicked`);
              takeOutMarble();
            }}
          >
            <Marble marbleColor={"green"} />
          </div>
        );
      } else if (playerFourMarbles.includes(i)) {
        updatedSpaces[i] = (
          <div
            className={`space marble`}
            key={`playerOne-${i}`}
            onClick={() => {
              console.log(`marble ${i} clicked`);
              takeOutMarble();
            }}
          >
            <Marble marbleColor={"red"} />
          </div>
        );
      }
    }
    setSpaces(updatedSpaces);
  };

  //do possible moves
  const updateBoard = (players: Players, gameBoard: number[]) => {
    const updatedSpaces = [...spaces];
    const possibleMove: number[] = [];
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] != 0) {
        console.log(`Space ${i} should be new`);
        const playerToPlace = gameBoard[i];
        const playerMarbles = players[playerToPlace].marbles;
        console.log(playerMarbles);
        possibleMove.push(i + 5);
        let color = "";
        color = players[playerToPlace].color;
        updatedSpaces[boardTranslation[i]] = (
          <div
            className={`space marble`}
            key={`${color}-${i}`}
            onClick={() => {
              console.log(`marble ${i} clicked`);
              marbleToUpdate(i);
            }}
          >
            <Marble marbleColor={color} />
          </div>
        );
        //why does it change the layout sometimes
        //getting rid of the last marble now but the board is messed up
      } else if (possibleMove.includes(i)) {
        updatedSpaces[boardTranslation[i]] = (
          <div
            className={`space grid-item board_hole possible-move`}
            key={`hole-${i}`}
          ></div>
        );
      } else {
        updatedSpaces[boardTranslation[i]] = (
          <div
            className={`space grid-item board_hole`}
            key={`new-hole-${i}`}
          ></div>
        );
      }
    }
    setSpaces(updatedSpaces);
  };
  useEffect(() => {
    updateBoard(players, board);
  }, [board]);

  useEffect(() => {
    updatePlayerMarbles();
  }, []);

  return (
    <div className="board__container">
      <div className="board">
        {playerPositions}
        <div className="inner-board">
          {move ? (
            <div className="dice-and-button">
              <Die getRoll={getRollValue} />
              <button onClick={changeMove}>Roll</button>
            </div>
          ) : (
            ""
          )}

          <div className="inner-board-container">{spaces}</div>
        </div>
      </div>
    </div>
  );
};

export default Board;
