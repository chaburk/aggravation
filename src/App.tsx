import StartPage from "./StartPage";
import "./App.css";
import Board from "./Board";
import { useState } from "react";
import Die from "./Die";

//create turn thing first?
//get players

const players = {
  1: { name: "Chase", color: "red", marbles: [0, 33, 22, 46] },
  2: { name: "Jordan", color: "blue", marbles: [0, 33, 22, 46] },
  3: { name: "Taylor", color: "green", marbles: [0, 33, 22, 46] },
  4: { name: "Karen", color: "purple", marbles: [0, 33, 22, 46] },
};

function App() {
  const [start, setStart] = useState(true);
  const [game, setGame] = useState();
  const [turn, setTurn] = useState(1);
  const startGame = () => {
    setStart((prevStart) => !prevStart);
  };

  const numOfPlayers = Object.keys(players).length;

  const nextTurn = () => {
    setTurn((prevTurn) => (prevTurn % numOfPlayers) + 1);
  };

  console.log(players[turn]);
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
            <Die />
            <Board players={players} />
            <button onClick={nextTurn}>Next turn</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
