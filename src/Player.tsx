import "./Player.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface PlayerProps {
  colorBg: string;
}

const Player: React.FC<PlayerProps> = ({ colorBg }) => {
  return (
    <div className="player-outer">
      <div className="player-container" style={{ backgroundColor: colorBg }}>
        <FontAwesomeIcon
          icon={faUser}
          style={{ color: "#fff" }}
          className="player-icon"
        />
      </div>
      <h1>Chase</h1>
    </div>
  );
};

export default Player;
