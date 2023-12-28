import "./Player.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface PlayerProps {
  playerColor: string;
  playerName: string;
  active: boolean;
}

const Player: React.FC<PlayerProps> = ({ playerColor, playerName, active }) => {
  return (
    <div className="player-container">
      <div
        className={`player-inner ${active ? "active" : ""}`}
        style={{ backgroundColor: playerColor }}
      >
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
