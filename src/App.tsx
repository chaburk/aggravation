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
