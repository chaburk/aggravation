import "./Player.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface PlayerProps {
  playerColor: string;
  playerName: string;
}

const Player: React.FC<PlayerProps> = ({ playerColor, playerName }) => {
  return (
    <div className="player-container">
      <div className="player-inner" style={{ backgroundColor: playerColor }}>
        <FontAwesomeIcon
          icon={faUser}
          style={{ color: "#fff" }}
          className="player-icon"
        />
      </div>
      <h1 className="player-name">{playerName}</h1>
    </div>
  );
};

export default Player;
