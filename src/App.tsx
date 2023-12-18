import StartPage from "./StartPage";
import "./App.css";
import Board from "./Board";
import { useState } from "react";
import Player from "./Player";

function App() {
  const [start, setStart] = useState(true);

  const startGame = () => {
    setStart((prevStart) => !prevStart);
  };

  return (
    <>
      <div>
        {start ? (
          <StartPage startGame={startGame} />
        ) : (
          <>
            <Board />
          </>
        )}
      </div>
    </>
  );
}

export default App;
