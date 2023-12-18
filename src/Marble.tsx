import "./Marble.css";

interface MarbleProps {
  marbleColor: string;
}

const Marble: React.FC<MarbleProps> = ({ marbleColor }) => {
  return (
    <div
      className="marble-container"
      style={{ backgroundColor: marbleColor }}
    ></div>
  );
};

export default Marble;
