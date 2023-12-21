import "./InvalidLink.scoped.css";
import { BiCompass } from "react-icons/bi";

const InvalidLink = () => {
  return (
    <div className="container">
      <BiCompass size={90} className="icon" />
      <p className="heading">Invalid Form Link</p>
      <p className="subheading">Contact your staff member</p>
    </div>
  );
};

export default InvalidLink;
