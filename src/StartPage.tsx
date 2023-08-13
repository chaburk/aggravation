import "./StartPage.css";
//use sass???
//after today will change
const StartPage = () => {
  return (
    <div className="start__container">
      <div className="start__blackMarble">
        <h1 className="start__title">Aggravation</h1>
      </div>
      <div className="start__green start__marble"></div>
      <div className="start__red start__marble"></div>
      <div className="start__blue start__marble"></div>
      <div className="start__grey start__marble"></div>
    </div>
  );
};

export default StartPage;
