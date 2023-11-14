import "./FeatureList.scoped.css";
import { BsCheck } from "react-icons/bs";

const FeatureList = ({ items }) => {
  return (
    <div className="container">
      {items.map((e) => (
        <div className="item">
          <BsCheck size={16} className="check" />
          <p className="text">{e}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
