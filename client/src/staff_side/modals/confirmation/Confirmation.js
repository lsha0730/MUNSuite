import "../Modals.scoped.css";
import "./Confirmation.scoped.css";

function Confirmation({ description, bttLabel, fn, setModal }) {
  return (
    <div className="modal-background">
      <div className="container">
        <div className="modal-top">
          <p className="modal-header">Are you sure?</p>
          <p className="modal-subheader">{description}</p>
        </div>

        <div className="modal-bottom">
          <div
            className="btt-confirm"
            onClick={() => {
              fn();
              setModal(false);
            }}
          >
            <p>{bttLabel}</p>
          </div>
          <div
            className="btt-cancel"
            onClick={() => {
              setModal(false);
            }}
          >
            <p>Cancel</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
