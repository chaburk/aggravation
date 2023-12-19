import "./Die.css";
import { useState } from "react";

const randomNum = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const Die = () => {
  const [roll, setRoll] = useState(0);
  const diceRoll = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        setRoll(randomNum());
      }, i * 100);
    }
  };
  return (
    <div className="die-container" onClick={diceRoll}>
      <div className="number">{roll}</div>
    </div>
  );
};

export default Die;
