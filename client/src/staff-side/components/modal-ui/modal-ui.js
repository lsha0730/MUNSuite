import React, { useContext, useEffect, useState } from "react";
import "./modal-ui.scoped.css";
import UNCountriesData from "./UNCountriesData.js";
import { appContext } from "../../staffContext.js";
import FlyingDark from "../../../common/assets/icons/flying_dark.svg";

const ConfirmRedeemModal = ({ setShowingConfirmation, expiration }) => {
  return (
    <div className="modal-background">
      <div className="modal-container-redeem">
        <h1 style={{ color: "#378DCC", fontSize: 28 }}>Success!</h1>
        <p>You are now on the Premium Plan.</p>

        <div className="modal-bottom-redeem">
          <img src={FlyingDark} className="modal-icon" />
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

function Confirmation({ description, bttLabel, fn, setModal }) {
  return (
    <div className="modal-background">
      <div className="modal-container-confirmation">
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

function AddUNCountries(props) {
  const { delegations } = useContext(appContext);
  const [modalSelections, setModalSelections] = useState([]);
  const [delNames] = useState(
    delegations.map((delegateObj) => {
      return delegateObj.name;
    })
  );
  const [countriesNotInList] = useState(
    UNCountriesData.filter((country) => {
      return !delNames.includes(country);
    })
  );

  const [countriesNotInListRenders, setCountriesNotInListRenders] = useState(
    []
  );

  useEffect(() => {
    function handleClick(country) {
      if (!modalSelections.includes(country)) {
        setModalSelections(modalSelections.concat(country));
      } else {
        setModalSelections(
          modalSelections.filter((item) => {
            return item !== country;
          })
        );
      }
    }

    let renders = countriesNotInList.map((country) => {
      return (
        <div
          className={
            modalSelections.includes(country)
              ? "modal-delbar-container selected"
              : "modal-delbar-container"
          }
          onClick={() => {
            handleClick(country);
          }}
        >
          <p className="modal-country-name">{country}</p>
        </div>
      );
    });
    setCountriesNotInListRenders(renders);
  }, [modalSelections]);

  return (
    <div className="modal-background">
      <div className="modal-container-un">
        <div className="modal-top">
          <p className="modal-header">Add UN Countries</p>
          <p className="modal-subheader">
            Select countries, then click "Add Countries" to add them.
          </p>
        </div>

        <div className="modal-body">
          <div className="countries-list-container">
            {countriesNotInListRenders}
          </div>
        </div>

        <div className="modal-bottom">
          <div
            className="btt-add-countries"
            onClick={() => {
              props.setModal(false);
              props.addDelegates(modalSelections);
              setModalSelections([]);
            }}
          >
            <p>Add Countries</p>
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

function AddCustomCountry(props) {
  const addCustom = () => {
    props.setModal(false);
    props.addDelegates([document.getElementById("custom-country-input").value]);
  };

  return (
    <div className="modal-background">
      <div className="modal-container-custom">
        <div className="modal-top">
          <p className="modal-header">Add Custom Country</p>
          <p className="modal-subheader">Add your own country.</p>
        </div>

        <div className="modal-body">
          <div className="modal-input-container">
            <p style={{ fontWeight: 500, marginBottom: 10 }}>Country Name</p>
            <input
              className="modal-custom-input"
              id="custom-country-input"
              onKeyDown={(e) => {
                if (e.key === "Enter") addCustom();
              }}
            />
          </div>
        </div>

        <div className="modal-bottom">
          <div className="btt-custom-add-countries" onClick={addCustom}>
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

function AddViaSpreadsheet(props) {
  function importSpreadsheet() {
    props.setModal(false);
    let fullString = document.getElementById("pastebin").value;

    if (fullString !== "") {
      props?.addDelegates(fullString.split("\n"));
    }
  }

  return (
    <div className="modal-background">
      <div className="modal-container-spreadsheet">
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

export {
  AddUNCountries,
  AddCustomCountry,
  AddViaSpreadsheet,
  Confirmation,
  ConfirmRedeemModal,
};
