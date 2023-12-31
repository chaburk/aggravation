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

  const [players, setPlayers] = useState(startPlayers); //players contains player's information
  const [board, setBoard] = useState(startBoard); //board contains location of marbles
  const [start, setStart] = useState(true); //start is used to load the board
  const [turn, setTurn] = useState(1); //turn is used to keep track of whose turn it is
  const [roll, setRoll] = useState(0); //roll is used to keep track of last dice roll
  const [move, setMove] = useState(true); //move is used to make die disappear
  const [marble, setMarble] = useState(-1); //marble is used to keep track of marble to move
  const [bringOutMarble, setBringOutMarble] = useState(false); //bringOutMarble is used to switch between moving and placing for 1/6 rolls

  const numOfPlayers = Object.keys(players).length; //numOfPlayers is used to keep track of how many players

  //Function to start game
  const startGame = () => {
    setStart((prevStart) => !prevStart);
  };

  //Function to update roll
  const getRoll = (roll: number): void => {
    setRoll(roll);
  };

  //Function to remove Die from screen
  const showDie = () => {
    setMove((prevMove) => !prevMove);
  };

  //Function to check if board space is empty
  const emptySpace = (location: number) => {
    return board[location] === 0;
  };

  //Function to update marble that was clicked
  const updateMarble = (marbled: number) => {
    setMarble(marbled);
  };

  //function to
  const bringOut = () => {
    setBringOutMarble((prevBring) => !prevBring);
  };

  //Function to update which player's turn
  const nextTurn = () => {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      newPlayers[turn].active = false;
      return newPlayers;
    });
    setTurn((prevTurn) => (prevTurn % numOfPlayers) + 1);
  };

  //Function to update player's active value
  const updateActive = (tOrF: boolean) => {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      newPlayers[turn].active = tOrF;
      return newPlayers;
    });
  };

  //Function to remove a marble from player's array (Not involved with the board)
  const removeMarbleFromPlayer = (
    whoToRemove: number,
    marbleToRemove: number
  ) => {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      const indexOfMarble =
        newPlayers[whoToRemove].marbles.indexOf(marbleToRemove);
      newPlayers[whoToRemove].marbles.splice(indexOfMarble, 1);
      return newPlayers;
    });
  };

  //Function to add a marble from player's array (Not involved with the board)
  const addMarbleToPlayer = (current: number, location: number) => {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      if (newPlayers[current].marbles.includes(location)) {
      } else {
        newPlayers[current].marbles.push(location);
      }
      return newPlayers;
    });
  };

  //Function to update board by replacing previous marble
  const updateBoard = (
    newLocation: number,
    who: number,
    locationToRemove: number
  ) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[locationToRemove] = 0;
      newBoard[newLocation] = who;
      return newBoard;
    });
  };

  //Function to update player's own location on board
  const selfUpdate = (howFar: number, spaceToUpdate: number) => {
    updateBoard(howFar, turn, spaceToUpdate);
    removeMarbleFromPlayer(turn, spaceToUpdate);
    addMarbleToPlayer(turn, roll + spaceToUpdate);
  };

  //Function to update another player's location on board
  const elseUpdate = (
    howFar: number,
    spaceToUpdate: number,
    removingPlayer: number
  ) => {
    updateBoard(howFar, turn, spaceToUpdate);
    removeMarbleFromPlayer(removingPlayer, spaceToUpdate + roll);
    addMarbleToPlayer(turn, roll + spaceToUpdate);
  };

  //Function to control primary game logic
  const updateBoardBasedOnMarble = () => {
    const currentPlayer: Player = players[turn];
    const activeMarbles = currentPlayer.marbles.length;
    //If current player has no marbles out and rolls a starting number
    if (activeMarbles === 0 && (roll === 1 || roll === 6)) {
      const startingSpace = board[currentPlayer.start];
      //If another player's marble is occupying the start square.
      if (startingSpace != turn || startingSpace != 0) {
        let playerToRemove = board[currentPlayer.start];
        playerToRemove = 1;
        const playerMarbleToRemove = currentPlayer.start;
        //need to check if this is removing the marble from the other player's array
        removeMarbleFromPlayer(playerToRemove, playerMarbleToRemove);
      }
      //function call to update board
      updateBoard(currentPlayer.start, turn, currentPlayer.start);
      addMarbleToPlayer(turn, currentPlayer.start);
    }
    //If the player has marbles on the board
    else if (currentPlayer.marbles.length != 0) {
      if (currentPlayer.marbles.length <= 5) {
        if (roll === 1 || roll === 6) {
          //If a player rolls a 1 or 6 and wants to add another marble to board
          if (bringOutMarble) {
            updateBoard(currentPlayer.start, turn, currentPlayer.start);
            //need to add a valid move check here
            //because if it is the same marble can't move another one out
            if (emptySpace(currentPlayer.start)) {
            } else {
              removeMarbleFromPlayer(turn, currentPlayer.start);
            }
            addMarbleToPlayer(turn, currentPlayer.start);
            updateMarble(-1);
          }
          //If a player rolls a 1 or 6 and wants to use roll to move another marble
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
            selfUpdate(spacesToMove, currentLocation);
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
          if (emptySpace(marble + roll)) {
            selfUpdate(spacesToMove, currentLocation);
          }
          //if marbles next move is not empty then replace
          else {
            const personToRemove = board[currentPlayer.marbles[0] + roll];
            elseUpdate(spacesToMove, currentLocation, personToRemove);
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

  //useEffect that updates board based on clicked marble
  useEffect(() => {
    updateBoardBasedOnMarble();
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
              getRollValue={getRoll}
              move={move}
              changeMove={showDie}
              marbleToUpdate={updateMarble}
              takeOutMarble={bringOut}
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
                updateBoardBasedOnMarble();
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
