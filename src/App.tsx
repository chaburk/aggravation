import StartPage from "./StartPage";
import "./App.css";
import Board from "./Board";
import { useState, useEffect } from "react";
import Die from "./Die";

//need to have an onclick on marble that when it's clicked it updates something
/*
If marbles = [], then must roll a 1 or 6. if 1 or 6 then check if anything is in the spot, then put marble out. 
if marbles is not empty, calculate possible moves
check if a marble position is 112, if it is and then roll is a one can do that move. 
can't pass your own marbles
*/

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
  const startGame = () => {
    setStart((prevStart) => !prevStart);
  };

  const numOfPlayers = Object.keys(players).length;

  //function to remove marble on board.
  const removeMarble = (whoToRemove: number, marbleToRemove: number) => {
    //need to change to update player state rathen then directly access
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
    updateBoardBasedOnRoll();
  };

  const updateBoard = (location, who: number) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[location.start] = who;
      return newBoard;
    });
  };

  //Primary game logic function
  const updateBoardBasedOnRoll = () => {
    const currentPlayer: Player = players[turn];
    console.log("This is the players turn");
    console.log(currentPlayer.name);
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
      //updateBoard(currentPlayer.start, turn);
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[currentPlayer.start] = turn;
        return newBoard;
      });
      //need to change to update player state rather than directly
      currentPlayer.marbles.push(currentPlayer.start);
    }
    //If the player has marbles on the board
    else if (currentPlayer.marbles.length != 0) {
      //need to add if 1 or 6 again

      //need to update this with state rather than this
      currentPlayer.marbles.push(currentPlayer.start + roll);
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[currentPlayer.start] = 0;
        newBoard[currentPlayer.start + roll] = turn;
        return newBoard;
      });
    }
  };

  //useEffect that updates board after each roll
  useEffect(() => {
    updateBoardBasedOnRoll();
  }, [roll]);

  //useEffect that updates player active state after each turn
  useEffect(() => {
    setPlayers((prevPlayers) => {
      console.log(turn);
      const newPlayers = { ...prevPlayers };
      newPlayers[turn].active = true;
      return newPlayers;
    });
  }, [turn]);

  return (
    <>
      <div>
        {start ? (
          <StartPage startGame={startGame} />
        ) : (
          <>
            <Die getRoll={getRoll} />
            <Board players={players} board={board} />
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
          </>
        )}
      </div>
    </>
  );
}

export default App;
