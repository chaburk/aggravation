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
  const startGame = () => {
    setStart((prevStart) => !prevStart);
  };

  const numOfPlayers = Object.keys(players).length;

  //function to remove marble on board.
  const removeMarble = (whoToRemove: number, marbleToRemove: number) => {
    console.log(`We are removing a marble from player: ${whoToRemove}`);
    console.log(`The marble we are removing is:  ${marbleToRemove}`);
    console.log(
      `The players to remove marbles: ${players[whoToRemove].marbles}`
    );
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      const indexOfMarble =
        newPlayers[whoToRemove].marbles.indexOf(marbleToRemove);
      console.log(`The index in the players marbles is:  ${indexOfMarble}`);
      newPlayers[whoToRemove].marbles.splice(indexOfMarble, 1);
      console.log(
        `The new players marbles is:  ${newPlayers[whoToRemove].marbles}`
      );
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

  const addMarbles = (current: number, location: number) => {
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

  const updateBoard = (
    location: number,
    who: number,
    currentLocation: number
  ) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      //updates the board with the location of the first players marble
      //will need to expand to all the marbles.
      console.log(`current location is ${currentLocation}`);
      console.log(`new location is ${location}`);
      newBoard[currentLocation] = 0;
      newBoard[location] = who;
      //newBoard[players[turn].marbles[0]] = turn;
      //newBoard[location.start] = who;
      console.log(players[turn].marbles);
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
      if (currentPlayer.marbles.length < 5) {
        if (roll === 1 || roll === 6) {
          let bringOutMarble = false;
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
          const currentLocation = currentPlayer.marbles[0];
          const spacesToMove = currentPlayer.marbles[0] + roll;
          //wait for which marble to move
          //then check if the space is empty or is a valid move
          if (emptySpace(currentPlayer.marbles[0] + roll)) {
            updateBoard(spacesToMove, turn, currentLocation);
            //updateBoard(spacesToMove, turn, );
            removeMarble(turn, currentLocation);
            addMarbles(turn, roll + currentLocation);
          }
          //if marbles next move is not empty then replace
          else {
            const personToRemove = board[currentPlayer.marbles[0] + roll];
            console.log(personToRemove);
            updateBoard(spacesToMove, turn);
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
          </>
        )}
      </div>
    </>
  );
}

export default App;
