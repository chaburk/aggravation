import StartPage from "./StartPage";
import "./App.css";
import Board from "./Board";
import { useState, useEffect, useLayoutEffect, useMemo } from "react";
import Die from "./Die";

interface Player {
  name: string;
  color: string;
  marbles: number[];
  start: number;
  limit: number;
  active: boolean;
}

interface Players {
  [key: number]: Player;
}

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
  const startGame = () => {
    setStart((prevStart) => !prevStart);
  };

  const numOfPlayers = Object.keys(players).length;

  //function to remove marble on board.
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

  const addMarbles = (current, location) => {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      newPlayers[current].marbles.push(location);
      return newPlayers;
    });
  };

  const showDie = () => {
    //setMove(true);
    setMove((prevMove) => !prevMove);
  };

  const updateBoard = (location, who: number) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[players[turn].marbles[0]] = 1;
      newBoard[location.start] = who;
      return newBoard;
    });
  };

  const emptySpace = (location: number) => {
    return board[location] === 0;
  };

  //roll is not getting updated each time. when it should be
  const memoizedSetBoardCallback = useMemo(() => {
    console.log("inside of memo");
    return (board) => {
      const currentPlayer = players[turn];
      updateBoard(currentPlayer.marbles[0] + roll - 1, turn);
    };
  }, [roll, players, turn]);

  //Primary game logic function
  const updateBoardBasedOnRoll = () => {
    const currentPlayer: Player = players[turn];
    //If current player has no marbles out and rolls a starting number
    console.log("outside");
    console.log(currentPlayer.marbles);
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
      //updateBoard(currentPlayer.start, turn);
      console.log(`Roll while 1 or 6: ${roll}`);
      updateBoard(currentPlayer.start, turn);
      addMarbles(turn, currentPlayer.start);
      console.log(currentPlayer.marbles);
    }
    //If the player has marbles on the board
    else if (currentPlayer.marbles.length != 0) {
      if (currentPlayer.marbles.length < 5) {
        if (roll === 1 || roll === 6) {
          let bringOutMarble = false;
          console.log("one or six");
          if (emptySpace(currentPlayer.start)) {
            //button to press
            bringOutMarble = true;
            if (bringOutMarble) {
              console.log("add marbles");
              //addMarbles(turn, currentPlayer.start);
            } else {
              console.log("move marble");
            }
          } else {
            console.log("move marble");
          }
        }
        //if roll is not 1 or 6
        else {
          console.log("not one or six");
          console.log(`This is the roll ${roll}`);
          //wait for which marble to move
          //then check if the space is empty or is a valid move
          if (emptySpace(currentPlayer.marbles[0] + roll)) {
            console.log("Next space is empty");
            const currentLocation = currentPlayer.marbles[0];
            //move marble
            //each move to check if it is in the limit
            //this section runs twice
            memoizedSetBoardCallback(board);

            console.log(`This is the roll after memo${roll}`);
            console.log(board);
            console.log(`This is the location to remove ${currentLocation}`);
            removeMarble(turn, currentLocation);
            console.log(
              `This is the location to be placed ${roll + currentLocation}`
            );
            addMarbles(turn, roll + currentLocation);
          }
          //if marbles next move is not empty then replace
          else {
            console.log("Next space is not empty");
            const currentLocation = currentPlayer.marbles[0];
            //move marble
            //each move to check if it is in the limit
            //this section runs twice
            memoizedSetBoardCallback(board);
            console.log(board);
            console.log(`This is the location to remove ${currentLocation}`);
            removeMarble(turn, currentLocation);
            console.log(
              `This is the location to be placed ${roll + currentLocation}`
            );
            addMarbles(turn, roll + currentLocation);
          }
        }
      } else {
        console.log("too many marbles");
      }
    }
  };
  //why did go from 5 to 9 and 14
  //why does it sometimes do 10
  //Is something wrong at start

  // //useEffect that updates board after each roll
  // useLayoutEffect(() => {
  //   updateBoardBasedOnRoll();
  // }, [roll]);

  //useEffect that updates player active state after each turn
  useEffect(() => {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      newPlayers[turn].active = true;
      return newPlayers;
    });
    showDie();
  }, [turn]);

  //useEffect for any player update

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
              getRoll={getRoll}
              move={move}
              changeMove={showDie}
            />
            <button
              onClick={() => {
                setPlayers((prevPlayers) => {
                  console.log(turn);
                  const newPlayers = { ...prevPlayers };
                  newPlayers[turn].active = false;
                  return newPlayers;
                });
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
          </>
        )}
      </div>
    </>
  );
}

export default App;
