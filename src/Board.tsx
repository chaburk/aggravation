import "./Board.css";

interface Space {
  id: number;
  type: "board" | "marble";
}
//15 x 15 grid only put spots on some of them

const spaces: React.ReactNode[] = [];

function createSpaces() {
  for (let i = 0; i < 225; i++) {
    spaces.push(<div className={`space grid-item`} key={i}></div>);
  }
}

createSpaces();

const Board = () => {
  //Logic of the game will be in this file?
  return (
    <div className="board__container">
      <div className="board">
        <div className="inner-board">
          <div className="inner-board-container">{spaces}</div>
        </div>
      </div>
    </div>
  );
};

export default Board;
