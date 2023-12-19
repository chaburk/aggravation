import "./StartPage.css";

interface StartPageProps {
  startGame: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ startGame }) => {
  return (
    <div className="start__container">
      <div className="start__blackMarble">
        <h1 className="start__title">Aggravation</h1>
        <div className="button-container">
          <div className="btn" onClick={startGame}>
            Begin
          </div>
          <div className="btn">Rules</div>
        </div>
      </div>
      <div className="start__green start__marble"></div>
      <div className="start__red start__marble"></div>
      <div className="start__blue start__marble"></div>
      <div className="start__grey start__marble"></div>
    </div>
  );
};

export default StartPage;
