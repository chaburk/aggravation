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
      winners: [0, 0, 0, 0, 0],
      start: 0,
      limit: 54,
      returnFromCenter: 144,
      active: true,
    },
    2: {
      name: "Jordan",
      color: "blue",
      marbles: [],
      winners: [0, 0, 0, 0, 0],
      start: 28,
      limit: 26,
      returnFromCenter: 80,
      active: false,
    },
    3: {
      name: "Taylor",
      color: "green",
      marbles: [],
      winners: [0, 0, 0, 0, 0],
      start: 14,
      limit: 12,
      returnFromCenter: 140,
      active: false,
    },
    4: {
      name: "Karen",
      color: "purple",
      marbles: [],
      winners: [0, 0, 0, 0, 0],
      start: 42,
      limit: 40,
      returnFromCenter: 75,
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

  const [rollTrigger, setRollTrigger] = useState(0);

  const numOfPlayers = Object.keys(players).length; //numOfPlayers is used to keep track of how many players

  //Function to start game
  const startGame = () => {
    setStart((prevStart) => !prevStart);
  };

  //Function to update roll
  const getRoll = (roll: number): void => {
    setRoll(roll);
    setRollTrigger((prev) => prev + 1);
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
    //setBringOutMarble(true);
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

  console.log(players[turn].winners);

  const updateWinnerMarble = (winnerMarble: number) => {
    console.log(`This is winner marble: ${winnerMarble}`);
    console.log(`This is index to move to: ${winnerMarble + roll}`);
    console.log(`This is the roll ${roll}`);
    if (winnerMarble + roll >= 5) {
      console.log("not a valid move");
    } else {
      setPlayers((prevPlayers) => {
        const newPlayers = { ...prevPlayers };
        newPlayers[turn].winners[winnerMarble] = 0;
        newPlayers[turn].winners[winnerMarble + roll] = 1;
        console.log(newPlayers[turn]);
        return newPlayers;
      });
    }
  };

  //Function to update player's active value
  const updateActive = (tOrF: boolean) => {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      newPlayers[turn].active = tOrF;
      return newPlayers;
    });
  };

  const addToWinner = (who: number, move: number) => {
    //logic is almost right but move stuff is a little wrong and need to update something to just update updateboard and the player shit.
    //everytime the players[turn].winners is updated it will trigger that and update.
    let empty = true;
    players[who].winners.forEach((marbles) => {
      if (marbles === 1) {
        empty = false;
      }
    });
    if (move > 5) {
      console.log("move too big");
    } else {
      console.log("this is move");
      console.log(move);
      console.log(players[who].marbles);
      //need to remove the old marble
      setPlayers((prevPlayers) => {
        const newPlayers = { ...prevPlayers };
        newPlayers[who].winners[move - 1] = 1;
        console.log(newPlayers[who]);
        return newPlayers;
      });
    }
  };

  const validMove = (spacesToCheck: number) => {
    //check each space before it, and if there is no other marbles, then you can move.
    console.log(
      `This is inside valid move and we checking from marble ${marble} to ${spacesToCheck}`
    );
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
    //I don't know how to have people put it in the middle yet.
  };

  const moveOutOfMiddle = () => {
    //function to check if the player can move out of the middle.
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
    if (current > 55) {
      current = current % 56;
    }
    console.log(players[current].limit);
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
    let winner = false;
    //make special case for this player
    const tryingMOve = newLocation - locationToRemove;
    if (players[who].limit === 54) {
      console.log(players[who].winners);
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
      console.log(`This is newLocation ${newLocation}`);
    }
    if (winner) {
      addToWinner(who, tryingMOve);
      removeMarbleFromPlayer(who, newLocation);
      //not perfect
      //need to check if i am removing and that i don't
      //remove another marble
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[locationToRemove] = 0;
        newBoard[newLocation] = 0;
        return newBoard;
      });

      console.log(board);
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

  //Function to control primary game logic
  //need to go middle logic and limits
  //need to make sure they can't move again if another space is occupying square
  //problem with showing the die after moves
  //can't click older marbles for some reason
  //can't switch between putting one out or in
  //adding more marbles isn't updating how many marbles they have
  const updateBoardBasedOnMarble = () => {
    const currentPlayer: Player = players[turn];
    const activeMarbles = currentPlayer.marbles.length;
    //If current player has no marbles out and rolls a starting number

    if (activeMarbles === 0 && (roll === 1 || roll === 6)) {
      const startingSpace = board[currentPlayer.start];
      //If another player's marble is occupying the start square.
      if (emptySpace(startingSpace) === false && startingSpace !== turn) {
        let playerToRemove = board[currentPlayer.start];
        playerToRemove = 1;
        const playerMarbleToRemove = currentPlayer.start;
        //need to check if this is removing the marble from the other player's array
        removeMarbleFromPlayer(playerToRemove, playerMarbleToRemove);
      }
      //if they already have a marble there then can't do that.
      //function call to update board
      console.log(currentPlayer.marbles);
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
      if (currentPlayer.marbles.length <= 5) {
        if (roll === 1 || roll === 6) {
          //If a player rolls a 1 or 6 and wants to add another marble to board
          if (bringOutMarble) {
            updateBoard(currentPlayer.start, turn, currentPlayer.start);
            //need to add a valid move check here
            //because if it is the same marble can't move another one out
            if (emptySpace(currentPlayer.start) === false) {
              removeMarbleFromPlayer(turn, currentPlayer.start);
            }
            console.log(currentPlayer.marbles);
            addMarbleToPlayer(turn, currentPlayer.start);
            updateMarble(-1);
            bringOut();
          }
          //If a player rolls a 1 or 6 and wants to use roll to move another marble
          else {
            let currentLocation = marble; //let currentLocation = currentPlayer.marbles[0];
            let spacesToMove = marble + roll; //let spacesToMove = currentPlayer.marbles[0] + roll;
            if (spacesToMove > 55) {
              currentLocation = currentLocation % 56;
            }
            //wait for which marble to move
            if (currentPlayer.marbles.includes(marble)) {
              currentLocation = marble;
              if (spacesToMove > 55) {
                currentLocation = currentLocation % 56;
              }
              spacesToMove = marble + roll;
            } else {
              console.log("doesn't have marble");
            }
            selfUpdate(spacesToMove, currentLocation);
          }
        }
        //if roll is not 1 or 6
        else {
          let currentLocation = marble; //let currentLocation = currentPlayer.marbles[0];
          let spacesToMove = marble + roll; //let spacesToMove = currentPlayer.marbles[0] + roll;
          if (spacesToMove > 55) {
            currentLocation = currentLocation % 56;
          }
          //wait for which marble to move
          if (currentPlayer.marbles.includes(marble)) {
            currentLocation = marble;
            if (spacesToMove > 55) {
              currentLocation = currentLocation % 56;
            }
            spacesToMove = marble + roll;
          } else {
            console.log("doesn't have marble");
          }
          //then check if the space is empty or is a valid move
          if (emptySpace((marble + roll) % 56)) {
            console.log("we are checking validity");
            console.log(validMove(spacesToMove));
            const tempSpace = (marble + roll) % 56;
            selfUpdate(spacesToMove, currentLocation);
            //issue is when you replace someone elses marble, now you have both of them in your array
          } //if marbles next move is not empty then replace
          else {
            const tempSpace = (marble + roll) % 56;
            const personToRemove = board[tempSpace];
            elseUpdate(spacesToMove, currentLocation, personToRemove);

            setTimeout(() => {
              console.log(currentPlayer.marbles);
            }, 1000);
          }
        }
        //nextTurn();
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
    console.log(`This is marble: ${marble}`);
    updateBoardBasedOnMarble();
  }, [marble]);

  useEffect(() => {
    for (let m = 1; m < numOfPlayers + 1; m++) {
      const sum = players[m].winners.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      if (sum / m === 5) {
        //console.log("game over");
        //console.log(`Player ${m} winss`);
      } else {
        //console.log("game is still going");
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
              updateWinner={updateWinnerMarble}
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
