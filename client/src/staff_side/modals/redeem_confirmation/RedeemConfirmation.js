import "../Modals.scoped.css";
import "./RedeemConfirmation.scoped.css";
import FlyingDark from "../../../common/assets/icons/flying_dark.svg";

const RedeemConfirmation = ({ setShowingConfirmation, expiration }) => {
  return (
    <div className="modal-background">
      <div className="container">
        <h1 style={{ color: "#378DCC", fontSize: 28 }}>Success!</h1>
        <p>You are now on the Premium Plan.</p>

        <div className="bottom">
          <img src={FlyingDark} className="icon" />
          <p className="expiration">
            Premium until:&nbsp;
            <p style={{ fontWeight: 600 }}>{expiration}</p>
          </p>
          <div
            className="btt-ok"
            onClick={() => {
              setShowingConfirmation(false);
            }}
          >
            Got it
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedeemConfirmation;
