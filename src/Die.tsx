import "./Die.css";
import { useState } from "react";

type DotPatterns = {
  [key in "1" | "2" | "3" | "4" | "5" | "6"]: string;
};

const randomNum = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const Die = (props) => {
  const [dots, setDots] = useState([
    <div className={`dice-dot dice-one`} key={0}></div>,
  ]);

  const dotPatterns: DotPatterns = {
    "1": "dice-one",
    "2": "dice-two",
    "3": "dice-three",
    "4": "dice-four",
    "5": "dice-five",
    "6": "dice-six",
  };

  //could pass down a roll state that is updated after the click
  const diceRoll = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const ranNum = randomNum();
        const tempDot = [];
        for (let i = 0; i < ranNum; i++) {
          tempDot.push(
            <div
              className={`dice-dot ${
                dotPatterns[ranNum.toString() as keyof DotPatterns]
              }`}
              key={i}
            ></div>
          );
        }
        setDots(tempDot);
        if (i === 9) {
          props.getRoll(ranNum);
        }
      }, i * 100);
    }
  };
  return (
    <div className={`die-container`} onClick={diceRoll}>
      {dots}
    </div>
  );
};

export default Die;
