import React, { useContext, useEffect, useState } from "react";
import styles from "./modal-ui.module.css";
import UNCountriesData from "./UNCountriesData.js";
import { appContext } from "../../staffContext.js";
import FlyingDark from "../../../product-site/plans/icons/FlyingDark.svg";

const ConfirmRedeemModal = ({ setShowingConfirmation, expiration }) => {
  return (
    <div className={styles.modal_background}>
      <div className={styles.modal_container_redeem}>
        <h1 style={{ color: "#378DCC", fontSize: 28 }}>Success!</h1>
        <p>You are now on the Premium Plan.</p>

        <div className={styles.modal_bottom_redeem}>
          <img src={FlyingDark} className={styles.modal_icon} />
          <p className={styles.expiration}>
            Premium until:&nbsp;
            <p style={{ fontWeight: 600 }}>{expiration}</p>
          </p>
          <div
            className={styles.btt_ok}
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
    <div className={styles.modal_background}>
      <div className={styles.modal_container_confirmation}>
        <div className={styles.modal_top}>
          <p className={styles.modal_header}>Are you sure?</p>
          <p className={styles.modal_subheader}>{description}</p>
        </div>

        <div className={styles.modal_bottom}>
          <div
            className={styles.btt_confirm}
            onClick={() => {
              fn();
              setModal(false);
            }}
          >
            <p>{bttLabel}</p>
          </div>
          <div
            className={styles.btt_cancel}
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
          className={`${styles.modal_delbar_container} ${
            modalSelections.includes(country) ? styles.selected : ""
          }`}
          onClick={() => {
            handleClick(country);
          }}
        >
          <p className={styles.modal_country_name}>{country}</p>
        </div>
      );
    });
    setCountriesNotInListRenders(renders);
  }, [modalSelections]);

  return (
    <div className={styles.modal_background}>
      <div className={styles.modal_container_un}>
        <div className={styles.modal_top}>
          <p className={styles.modal_header}>Add UN Countries</p>
          <p className={styles.modal_subheader}>
            Select countries, then click "Add Countries" to add them.
          </p>
        </div>

        <div className={styles.modal_body}>
          <div className={styles.countries_list_container}>
            {countriesNotInListRenders}
          </div>
        </div>

        <div className={styles.modal_bottom}>
          <div
            className={styles.btt_add_countries}
            onClick={() => {
              props.setModal(false);
              props.addDelegates(modalSelections);
              setModalSelections([]);
            }}
          >
            <p>Add Countries</p>
          </div>
          <div
            className={styles.btt_cancel}
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
    <div className={styles.modal_background}>
      <div className={styles.modal_container_custom}>
        <div className={styles.modal_top}>
          <p className={styles.modal_header}>Add Custom Country</p>
          <p className={styles.modal_subheader}>Add your own country.</p>
        </div>

        <div className={styles.modal_body}>
          <div className={styles.modal_input_container}>
            <p style={{ fontWeight: 500, marginBottom: 10 }}>Country Name</p>
            <input
              className={styles.modal_custom_input}
              id="custom-country-input"
              onKeyDown={(e) => {
                if (e.key === "Enter") addCustom();
              }}
            />
          </div>
        </div>

        <div className={styles.modal_bottom}>
          <div className={styles.btt_custom_add_countries} onClick={addCustom}>
            <p>Add Country</p>
          </div>
          <div
            className={styles.btt_cancel}
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
    <div className={styles.modal_background}>
      <div className={styles.modal_container_spreadsheet}>
        <div className={styles.modal_top}>
          <p className={styles.modal_header}>Import from Spreadsheet</p>
          <p className={styles.modal_subheader}>
            Copy and paste in a single column from a spreadsheet below such that
            each country is on its own line.
          </p>
        </div>

        <div className={styles.modal_body}>
          <textarea id="pastebin" className={styles.pastebin} />
        </div>

        <div className={styles.modal_bottom}>
          <div className={styles.btt_import} onClick={importSpreadsheet}>
            <p>Import</p>
          </div>
          <div
            className={styles.btt_cancel}
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
