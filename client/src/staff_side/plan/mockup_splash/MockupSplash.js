import delegations from "../../../common/assets/images/mockups/delegations.png";
import form from "../../../common/assets/images/mockups/form.png";
import history from "../../../common/assets/images/mockups/history.png";
import statistics from "../../../common/assets/images/mockups/statistics.png";
import notes from "../../../common/assets/images/mockups/notes.png";

import "./MockupSplash.scoped.css";

const MockupSplash = () => {
  return (
    <div className="container">
      <img
        src={delegations}
        alt="Delegations UI Image"
        className="mockup"
        style={{ position: "absolute", top: "100px", left: "800px" }}
      />
      <img
        src={form}
        alt="Form UI Image"
        className="mockup"
        style={{
          position: "absolute",
          top: "50px",
          left: "400px",
          zIndex: "1",
        }}
      />
      <img
        src={history}
        alt="History UI Image"
        className="mockup"
        style={{ position: "absolute", top: "250px", left: "350px" }}
      />
      <img
        src={statistics}
        alt="Statistics UI Image"
        className="mockup"
        style={{ position: "absolute", top: "120px", left: "200px" }}
      />
      <img
        src={notes}
        alt="Notes UI Image"
        className="mockup"
        style={{ position: "absolute", top: "250px", left: "700px" }}
      />
    </div>
  );
};

export default MockupSplash;
