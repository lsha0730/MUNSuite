import "../Modals.scoped.css";
import "./AddCustomCountry.scoped.css";

function AddCustomCountry(props) {
  const addCustom = () => {
    props.setModal(false);
    props.addDelegates([document.getElementById("custom-country-input").value]);
  };

  return (
    <div className="modal-background">
      <div className="container">
        <div className="modal-top">
          <p className="modal-header">Add Custom Country</p>
          <p className="modal-subheader">Add your own country.</p>
        </div>

        <div className="modal-body">
          <div className="input-container">
            <p style={{ fontWeight: 500, marginBottom: 10 }}>Country Name</p>
            <input
              className="input"
              id="custom-country-input"
              onKeyDown={(e) => {
                if (e.key === "Enter") addCustom();
              }}
            />
          </div>
        </div>

        <div className="modal-bottom">
          <div className="btt-add" onClick={addCustom}>
            <p>Add Country</p>
          </div>
          <div
            className="btt-cancel"
            onClick={() => {
              props.setModal(false);
            }}
          >
            <p>Cancel</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCustomCountry;
