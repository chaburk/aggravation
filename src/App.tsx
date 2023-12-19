import StartPage from "./StartPage";
import "./App.css";
import Board from "./Board";
import { useState } from "react";
import Die from "./Die";

function App() {
  const [start, setStart] = useState(true);

  const startGame = () => {
    setStart((prevStart) => !prevStart);
  };

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
            {/* <Board /> */}
          </>
        )}
      </div>
    </>
  );
}

export default App;
