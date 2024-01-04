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

  //Function to update player's active value
  const updateActive = (tOrF: boolean) => {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      newPlayers[turn].active = tOrF;
      return newPlayers;
    });
  };

  const validMove = () => {
    //check each space before it, and if there is no other marbles, then you can move.
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
    //how did we get 5?
    console.log(
      `We are replacing player ${turn} marble ${players[turn].marbles}`
    );
    console.log(`This is the marbleToRemove: ${marbleToRemove}`);
    console.log(`This is the current marble:  ${marble}`);
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
  //getting a random 5
  //Check if it is overflow or over the limit.
  const addMarbleToPlayer = (current: number, location: number) => {
    if (current > 55) {
      current = current % 56;
    }
    console.log(players[current].limit);
    setPlayers((prevPlayers) => {
      console.log("adding marble function");
      const newPlayers = { ...prevPlayers };
      if (newPlayers[current].marbles.includes(location)) {
      } else {
        newPlayers[current].marbles.push(location);
      }
      console.log(newPlayers[current].marbles);
      return newPlayers;
    });
  };

  //Function to update board by replacing previous marble
  const updateBoard = (
    newLocation: number,
    who: number,
    locationToRemove: number
  ) => {
    if (newLocation > 55 || locationToRemove > 55) {
      newLocation = newLocation % 56;
      locationToRemove = locationToRemove % 56;
    }
    if (newLocation > players[who].limit) {
      console.log("Winners grid baby");
    }
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[locationToRemove] = 0;
      newBoard[newLocation] = who;
      return newBoard;
    });
  };

  console.log(bringOutMarble);
  //Function to update player's own location on board
  const selfUpdate = (howFar: number, spaceToUpdate: number) => {
    console.log("self is being called");
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
        console.log("this is happening");
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
            const tempSpace = (marble + roll) % 56;
            console.log("this is tempspace");
            console.log(tempSpace);
            selfUpdate(spacesToMove, currentLocation);
            //issue is when you replace someone elses marble, now you have both of them in your array
          } //if marbles next move is not empty then replace
          else {
            console.log("this is the one chosen");
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
