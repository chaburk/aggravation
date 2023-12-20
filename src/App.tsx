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

const board = Array(56).fill(0);

function App() {
  //limit is the index that they can't go pass
  //change state to an array
  //problem with active person need useEffect
  const [players, setPlayers] = useState({
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
  });

  const [start, setStart] = useState(true);
  const [game, setGame] = useState();
  const [turn, setTurn] = useState(1);
  const [roll, setRoll] = useState(0);
  const startGame = () => {
    setStart((prevStart) => !prevStart);
  };

  const numOfPlayers = Object.keys(players).length;
  console.log(board);

  const nextTurn = () => {
    console.log(turn);
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      newPlayers[turn].active = false;
      return newPlayers;
    });
    setTurn((prevTurn) => (prevTurn % numOfPlayers) + 1);
  };

  const getRoll = (roll) => {
    setRoll(roll);
  };

  // console.log(players[turn]);
  // if (players[turn].marbles === 0 && (roll === 1 || roll === 6)) {
  //   board[players[turn].start] = turn;
  // }

  useEffect(() => {
    if (players[turn].marbles.length === 0 && (roll === 1 || roll === 6)) {
      console.log("happening");
      console.log(players[turn].marbles);
      board[players[turn].start] = turn;
      players[turn].marbles.push(players[turn].start);
    } else if (players[turn].marbles.length != 0) {
      console.log(players[turn].marbles);
      console.log("can move piece");
      board[players[turn].start] = 0;
      board[players[turn].start + roll] = turn;
    }
  }, [roll]);

  useEffect(() => {
    setPlayers((prevPlayers) => {
      console.log(turn);
      const newPlayers = { ...prevPlayers };
      newPlayers[turn].active = true;
      return newPlayers;
    });
  }, [turn]);

  //need to have game state that contains the player information and gets updated.
  //can contain location of marbles, how many marbles they have out, how many in the win area
  //update a board
  //board that is 56 space and contains 0's for empty spaces and then player number?
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
