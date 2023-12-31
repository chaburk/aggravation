import StartPage from "./StartPage";
import "./App.css";
import Board from "./Board";
import { useState, useEffect } from "react";
import { Player, Players } from "./types";

const startBoard = Array(56).fill(0);

function App() {
  //Limit is the last index they can go to before going to the winners array
  const startPlayers: Players = {
    1: {
      name: "Chase",
      color: "red",
      marbles: [],
      start: 0,
      limit: 54,
      active: true,
    },
    2: {
      name: "Jordan",
      color: "blue",
      marbles: [],
      start: 28,
      limit: 26,
      active: false,
    },
    3: {
      name: "Taylor",
      color: "green",
      marbles: [],
      start: 14,
      limit: 12,
      active: false,
    },
    4: {
      name: "Karen",
      color: "purple",
      marbles: [],
      start: 42,
      limit: 40,
      active: false,
    },
  };

  const [players, setPlayers] = useState(startPlayers);
  const [board, setBoard] = useState(startBoard);
  const [start, setStart] = useState(true);
  const [turn, setTurn] = useState(1);
  const [roll, setRoll] = useState(0);
  const [move, setMove] = useState(true);
  const [marble, setMarble] = useState(-1);
  const [bringOutMarble, setBringOutMarble] = useState(true);
  const startGame = () => {
    setStart((prevStart) => !prevStart);
  };

  const numOfPlayers = Object.keys(players).length;

  //function to remove marble from players array
  //not involved with the actual board
  const removeMarble = (whoToRemove: number, marbleToRemove: number) => {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      const indexOfMarble =
        newPlayers[whoToRemove].marbles.indexOf(marbleToRemove);
      newPlayers[whoToRemove].marbles.splice(indexOfMarble, 1);
      return newPlayers;
    });
  };

  //function to update turn and active player
  const nextTurn = () => {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      newPlayers[turn].active = false;
      return newPlayers;
    });
    setTurn((prevTurn) => (prevTurn % numOfPlayers) + 1);
  };

  //function to set roll state and update board
  const getRoll = (roll: number): void => {
    setRoll(roll);
  };

  const bringOut = () => {
    setBringOutMarble((prevBring) => !prevBring);
  };

  const addMarbles = (current: number, location: number) => {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      if (newPlayers[current].marbles.includes(location)) {
      } else {
        newPlayers[current].marbles.push(location);
      }
      return newPlayers;
    });
  };

  const showDie = () => {
    setMove((prevMove) => !prevMove);
  };

  const updateBoard = (
    location: number,
    who: number,
    currentLocation: number
  ) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[currentLocation] = 0;
      newBoard[location] = who;

      return newBoard;
    });
  };

  const emptySpace = (location: number) => {
    return board[location] === 0;
  };

  const updateActive = (tOrF: boolean) => {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      newPlayers[turn].active = tOrF;
      return newPlayers;
    });
  };

  const updateMarble = (marbled: number) => {
    setMarble(marbled);
  };

  //Primary game logic function
  const updateBoardBasedOnRoll = () => {
    const currentPlayer: Player = players[turn];
    //If current player has no marbles out and rolls a starting number
    if (currentPlayer.marbles.length === 0 && (roll === 1 || roll === 6)) {
      //If another marble is occupying the start square.
      if (
        board[currentPlayer.start] != turn ||
        board[currentPlayer.start] != 0
      ) {
        //get the player whose marble it is.
        let playerToRemove = board[currentPlayer.start];
        playerToRemove = 1;
        const playerMarbleToRemove = currentPlayer.start;
        removeMarble(playerToRemove, playerMarbleToRemove);
      }
      //function call to update board
      updateBoard(currentPlayer.start, turn);
      addMarbles(turn, currentPlayer.start);
    }
    //If the player has marbles on the board
    else if (currentPlayer.marbles.length != 0) {
      if (currentPlayer.marbles.length <= 5) {
        if (roll === 1 || roll === 6) {
          if (bringOutMarble) {
            if (emptySpace(currentPlayer.start)) {
              updateBoard(currentPlayer.start, turn);
              addMarbles(turn, currentPlayer.start);
            } else {
              updateBoard(currentPlayer.start, turn);
              removeMarble(turn, currentPlayer.start);
              addMarbles(turn, currentPlayer.start);
            }
            updateMarble(-1);
            //click on one of the players marbles and it will call a function
            //to put out a marble rather than move one.
            //can change bringoutMarble state to true
          } else {
            let currentLocation = currentPlayer.marbles[0];
            let spacesToMove = currentPlayer.marbles[0] + roll;
            //wait for which marble to move
            if (currentPlayer.marbles.includes(marble)) {
              currentLocation = marble;
              spacesToMove = marble + roll;
            } else {
              console.log("doesn't have marble");
            }
            //click on one of the marbles and it will move the marble
            //that was clicked.
            updateBoard(spacesToMove, turn, currentLocation);
            removeMarble(turn, currentLocation);
            addMarbles(turn, roll + currentLocation);
          }
        }
        //if roll is not 1 or 6
        else {
          let currentLocation = currentPlayer.marbles[0];
          let spacesToMove = currentPlayer.marbles[0] + roll;
          //wait for which marble to move
          if (currentPlayer.marbles.includes(marble)) {
            currentLocation = marble;
            spacesToMove = marble + roll;
          } else {
            console.log("doesn't have marble");
          }
          //then check if the space is empty or is a valid move
          if (emptySpace(currentPlayer.marbles[0] + roll)) {
            updateBoard(spacesToMove, turn, currentLocation);
            removeMarble(turn, currentLocation);
            addMarbles(turn, roll + currentLocation);
          }
          //if marbles next move is not empty then replace
          else {
            const personToRemove = board[currentPlayer.marbles[0] + roll];
            updateBoard(spacesToMove, turn, currentLocation);
            removeMarble(personToRemove, currentLocation + roll);
            addMarbles(turn, roll + currentLocation);
          }
        }
      } else {
        console.log("too many marbles");
      }
    }
  };

  //useEffect that updates player active state after each turn
  useEffect(() => {
    updateActive(true);
    showDie();
  }, [turn]);

  useEffect(() => {
    updateBoardBasedOnRoll();
  }, [marble]);
  return (
    <>
      <div>
        {start ? (
          <StartPage startGame={startGame} />
        ) : (
          <>
            <Board
              players={players}
              board={board}
              //get rollvalue and passing isn't right but i can't focus
              getRollValue={getRoll}
              move={move}
              changeMove={showDie}
              marbleToUpdate={updateMarble}
            />
            <button
              onClick={() => {
                updateActive(false);
                nextTurn();
              }}
            >
              Next turn
            </button>
            <button
              onClick={() => {
                updateBoardBasedOnRoll();
              }}
            >
              Update Board
            </button>
            <button
              onClick={() => {
                bringOut();
              }}
            >
              change bring out
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
