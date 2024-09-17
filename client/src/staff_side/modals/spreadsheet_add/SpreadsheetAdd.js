import "../Modals.scoped.css";
import "./SpreadsheetAdd.scoped.css";

function SpreadsheetAdd(props) {
  function importSpreadsheet() {
    props.setModal(false);
    let fullString = document.getElementById("pastebin").value;

    if (fullString !== "") {
      props?.addDelegates(fullString.split("\n"));
    }
  }

  return (
    <div className="modal-background">
      <div className="container">
        <div className="modal-top">
          <p className="modal-header">Import from Spreadsheet</p>
          <p className="modal-subheader">
            Copy and paste in a single column from a spreadsheet below such that
            each country is on its own line.
          </p>
        </div>

        <div className="modal-body">
          <textarea id="pastebin" className="pastebin" />
        </div>

        <div className="modal-bottom">
          <div className="btt-import" onClick={importSpreadsheet}>
            <p>Import</p>
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

export default SpreadsheetAdd;
