import "./Player.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Player = ({ color }) => {
  return (
    <>
      <div className="player-container">
        <FontAwesomeIcon
          icon={faUser}
          style={{ color: "#fff" }}
          className="player-icon"
        />
      </div>
      <h1>Chase</h1>
    </>
  );
};

export default Player;
