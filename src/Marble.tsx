import "./Marble.css";

const Marble = (props) => {
  return <div className="marble-container" style={props.color}></div>;
};

export default Marble;
