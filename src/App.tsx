import StartPage from "./StartPage";
import "./App.css";
import Board from "./Board";
import { useState, useEffect, useRef } from "react";
import { Player, Players } from "./types";

const startBoard = Array(56).fill(0);

function App() {
  //Limit is the last index they can go to before going to the winners array
  const startPlayers: Players = {
    1: {
      name: "Chase",
      color: "red",
      marbles: [],
      winners: [0, 0, 0, 0, 0],
      start: 0,
      limit: 54,
      returnFromCenter: 47,
      active: true,
      middle: false,
    },
    2: {
      name: "Jordan",
      color: "blue",
      marbles: [],
      winners: [0, 0, 0, 0, 0],
      start: 28,
      limit: 26,
      returnFromCenter: 19,
      active: false,
      middle: false,
    },
    3: {
      name: "Taylor",
      color: "green",
      marbles: [],
      winners: [0, 0, 0, 0, 0],
      start: 14,
      limit: 12,
      returnFromCenter: 5,
      active: false,
      middle: false,
    },
    4: {
      name: "Karen",
      color: "purple",
      marbles: [],
      winners: [0, 0, 0, 0, 0],
      start: 42,
      limit: 40,
      returnFromCenter: 33,
      active: false,
      middle: false,
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
  const [gameOver, setGameOver] = useState(false);
  const [middle, setMiddle] = useState(false);

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
    //Doesn't switch switch turn if player rolled a six
    //if you get multiple sixes in a roll it doesn't reload
    // if (roll != 6) {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      newPlayers[turn].active = false;
      return newPlayers;
    });
    setTurn((prevTurn) => (prevTurn % numOfPlayers) + 1);
    // } else {
    //setTurn(turn);
    //   showDie();
    // }
  };

  const rollRef = useRef(roll);
  rollRef.current = roll;

  //Function to update player's active value
  const updateActive = (tOrF: boolean) => {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      newPlayers[turn].active = tOrF;
      return newPlayers;
    });
  };

  const addToWinner = (who: number, move: number) => {
    let empty = true;
    players[who].winners.forEach((marbles) => {
      if (marbles === 1) {
        empty = false;
      }
    });

    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      newPlayers[who].winners[move - 1] = 1;
      return newPlayers;
    });
  };

  const moveInWinner = (winnerMarble: number) => {
    console.log(`This is the roll ${rollRef.current}`);
    if (winnerMarble + rollRef.current >= 5) {
      console.log("not a valid move");
    } else {
      setPlayers((prevPlayers) => {
        const newPlayers = { ...prevPlayers };
        newPlayers[turn].winners[winnerMarble] = 0;
        newPlayers[turn].winners[winnerMarble + rollRef.current] = 1;
        console.log(newPlayers[turn]);
        return newPlayers;
      });
    }
  };

  const validMove = (spacesToCheck: number) => {
    //check each space before it, and if there is no other marbles, then you can move.
    for (let check = marble + 1; check <= spacesToCheck; check++) {
      console.log(board[check]);
      if (board[check] === turn) {
        return false;
      }
    }
    return true;
  };

  const firstRow = () => {
    //function to check if middle logic could apply.
    return marble <= players[turn].start + 6;
  };

  const canGoMiddle = () => {
    return marble + roll === players[turn].start + 6;
  };

  const moveOutOfMiddle = () => {
    //function to check if the player can move out of the middle.
    //update player marble
    if (rollRef.current === 1) {
      setPlayers((prevPlayers) => {
        const newPlayers = { ...prevPlayers };
        newPlayers[turn].middle = false;
        newPlayers[turn].marbles.push(newPlayers[turn].returnFromCenter);
        return newPlayers;
      });
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[players[turn].returnFromCenter] = turn;
        return newBoard;
      });
    }
  };

  //Function to remove a marble from player's array (Not involved with the board)
  //think i need another removeMarble?
  const removeMarbleFromPlayer = (
    whoToRemove: number,
    marbleToRemove: number
  ) => {
    //if the move is over 55 need to do something
    if (marbleToRemove > 55) {
      marbleToRemove = marbleToRemove % 56;
    }
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      const indexOfMarble =
        newPlayers[whoToRemove].marbles.indexOf(marbleToRemove);
      newPlayers[whoToRemove].marbles.splice(indexOfMarble, 1);
      return newPlayers;
    });
  };

  const replacePlayerMarble = () => {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      const indexOfMarbleForcurrent = newPlayers[turn].marbles.indexOf(marble);
      newPlayers[turn].marbles.splice(indexOfMarbleForcurrent, 1);
      return newPlayers;
    });
  };

  //Function to add a marble from player's array (Not involved with the board)
  const addMarbleToPlayer = (current: number, location: number) => {
    console.log(current);
    if (current > 55) {
      current = current % 56;
    }
    console.log(current);
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      if (newPlayers[current].marbles.includes(location)) {
      } else {
        newPlayers[current].marbles.push(location);
      }
      return newPlayers;
    });
  };

  const changeMiddle = () => {
    setMiddle((prev) => !prev);
    console.log(6 - rollRef.current + players[turn].start);
    if (middle === false) {
      updateMarble(6 - rollRef.current + players[turn].start);
    }
  };

  const addToMiddle = (marbleToRemove: number) => {
    //if this is called.
    //we need to remove the marble that brought us there.
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      newPlayers[turn].middle = true;
      return newPlayers;
    });
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[marbleToRemove] = 0;
      return newBoard;
    });
  };

  //Function to update board by replacing previous marble
  const updateBoard = (
    newLocation: number,
    who: number,
    locationToRemove: number
  ) => {
    let winner = false;
    const tryingMOve = newLocation - players[who].limit;
    if (players[who].limit === 54) {
      if (newLocation > players[who].limit) {
        winner = true;
      }
    } else if (
      locationToRemove < players[who].start &&
      (newLocation > players[who].limit || newLocation >= players[who].start)
    ) {
      winner = true;
    }
    if (newLocation > 55 || locationToRemove > 55) {
      newLocation = newLocation % 56;
      locationToRemove = locationToRemove % 56;
    }
    if (winner) {
      addToWinner(who, tryingMOve);
      removeMarbleFromPlayer(who, newLocation);
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[locationToRemove] = 0;
        newBoard[newLocation] = 0;
        return newBoard;
      });
    } else {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[locationToRemove] = 0;
        newBoard[newLocation] = who;
        return newBoard;
      });
    }
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
    //remove from other player
    removeMarbleFromPlayer(removingPlayer, spaceToUpdate + roll);
    //remove from yourself
    replacePlayerMarble();
    addMarbleToPlayer(turn, roll + spaceToUpdate);
  };

  console.log(`This is the middle value: ${middle}`);

  //Function to control primary game logic
  const updateBoardBasedOnMarble = () => {
    const currentPlayer: Player = players[turn];
    const activeMarbles = currentPlayer.marbles.length;
    //If current player has no marbles out and rolls a starting number

    if (activeMarbles === 0 && (roll === 1 || roll === 6)) {
      const startingSpace = board[currentPlayer.start];
      //make sure it is replacing the other persons marble correctly
      //If another player's marble is occupying the start square.
      if (emptySpace(startingSpace) === false && startingSpace !== turn) {
        let playerToRemove = board[currentPlayer.start];
        //playerToRemove = 1;
        const playerMarbleToRemove = currentPlayer.start;
        //need to check if this is removing the marble from the other player's array
        removeMarbleFromPlayer(playerToRemove, playerMarbleToRemove);
      }
      //if they already have a marble there then can't do that.
      //function call to update board
      updateBoard(currentPlayer.start, turn, currentPlayer.start);
      addMarbleToPlayer(turn, currentPlayer.start);
      //nextTurn();
      bringOut();
    }
    //If current player has no marbles out but doesn't roll a starting number
    // else if (activeMarbles == 0 && roll != 0) {
    //   alert("Player has no legal move");
    //   //nextTurn();
    // }
    //If the player has marbles on the board
    else if (currentPlayer.marbles.length != 0) {
      let currentLocation = marble;
      let spacesToMove = marble + roll;
      if (spacesToMove > 55) {
        currentLocation = currentLocation % 56;
      }
      if (currentPlayer.marbles.length <= 5) {
        //need to make sure they aren't replacing their own marble
        if (roll === 1 || roll === 6) {
          //If a player rolls a 1 or 6 and wants to add another marble to board
          if (bringOutMarble) {
            updateBoard(currentPlayer.start, turn, currentPlayer.start);
            //need to add a valid move check here
            //because if it is the same marble can't move another one out
            if (emptySpace(currentPlayer.start) === false) {
              removeMarbleFromPlayer(turn, currentPlayer.start);
            }
            addMarbleToPlayer(turn, currentPlayer.start);
            updateMarble(-1);
            bringOut();
          }
          //If a player rolls a 1 or 6 and wants to use roll to move another marble
          else {
            if (middle) {
              if (firstRow() && canGoMiddle()) {
                addToMiddle(marble);
                //need to remove
                removeMarbleFromPlayer(turn, marble);
                changeMiddle();
              }
            } else {
              if (validMove(spacesToMove)) {
                console.log("this is happening");
                selfUpdate(spacesToMove, currentLocation);
              }
            }

            //wait for which marble to move
          }
        }
        //if roll is not 1 or 6
        else {
          if (middle) {
            if (firstRow() && canGoMiddle()) {
              addToMiddle(marble);
              removeMarbleFromPlayer(turn, marble);
              changeMiddle();
            }
          } else {
            if (emptySpace((marble + roll) % 56)) {
              if (validMove(spacesToMove)) {
                selfUpdate(spacesToMove, currentLocation);
              } else {
                console.log("can't move in front of own marble");
              }
            } //if marbles next move is not empty then replace
            else {
              if (validMove(spacesToMove)) {
                const tempSpace = (marble + roll) % 56;
                const personToRemove = board[tempSpace];
                elseUpdate(spacesToMove, currentLocation, personToRemove);
              }
            }
          }
          //then check if the space is empty or is a valid move
        }
        //nextTurn();
      } else {
        console.log("too many marbles");
      }
    }
  };

  //Function to signal that someone has won.
  const endGame = () => {
    setGameOver((prevGame) => !prevGame);
  };

  //useEffect that updates player active state after each turn
  useEffect(() => {
    updateActive(true);
    showDie();
  }, [turn]);

  // useEffect(() => {
  //   //need to change the location of the die or make smaller
  //   if (roll != -1) {
  //     setTimeout(() => {
  //       showDie();
  //       //sets the roll to -1 but need to keep the value
  //       //it doesn't update otherwise
  //       // getRoll(-1);
  //     }, 1000);
  //   }
  // }, [roll, rollTrigger]);

  //useEffect that updates board based on clicked marble

  useEffect(() => {
    updateBoardBasedOnMarble();
  }, [marble]);

  useEffect(() => {
    for (let m = 1; m < numOfPlayers + 1; m++) {
      const sum = players[m].winners.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      if (sum / m === 5) {
        endGame();
        console.log("game over");
      }
    }
  }, [players]);
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
              marbleToUpdate={updateMarble}
              takeOutMarble={bringOut}
              updateWinner={moveInWinner}
              moveMiddle={moveOutOfMiddle}
              changeMiddle={changeMiddle}
              middleValue={middle}
            />
            <button onClick={nextTurn}>Next Turn</button>
            <button onClick={showDie}>Show Die</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
