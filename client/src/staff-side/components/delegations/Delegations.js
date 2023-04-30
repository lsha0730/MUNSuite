import React, { useEffect, useState, useContext } from "react";
import styles from "./Delegations.module.css";
import {
  AddUNCountries,
  AddCustomCountry,
  AddViaSpreadsheet,
  Confirmation,
} from "../modal-ui/modal-ui.js";
import Delbar from "./delbar/Delbar.js";
import * as BsIcons from "react-icons/bs";
import { appContext } from "../../staffContext.js";
import axios from "axios";
import { IoIosLock } from "react-icons/io";
import { exportToCsv } from "../../utils";

function Delegations() {
  const {
    delegations,
    notes,
    settings,
    writeToFirebase,
    accountInfo,
  } = useContext(appContext);
  const [selections, setSelections] = useState([]);
  const [modal, setModal] = useState(false);
  const [delegateBars, setDelegateBars] = useState([]);
  const [showingWelcome, setShowingWelcome] = useState(true);

  useEffect(() => {
    rerenderDels();
  }, [delegations, selections]);

  let resizeTimeout;
  window.onresize = () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
      setShowingWelcome(window.innerHeight > 1000);
    }, 100);
  };

  function makeUniqueCode(size, existingDels) {
    function makeCode(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    let codes = existingDels.map((delegate) => {
      return delegate.name;
    });
    let code = makeCode(size);
    while (codes.includes(code)) {
      code = makeCode(size);
    }
    return code;
  }

  const addDelegates = (newDels) => {
    const objectArr = [];
    newDels.forEach((name) => {
      objectArr.push({
        id: delegations.length + objectArr.length,
        name: name,
        code: makeUniqueCode(5, delegations.concat(objectArr)),
      });
    });

    writeToFirebase("delegations", delegations.concat(objectArr));
    axios.post("https://munsuite-backend.onrender.com/analytics", {
      type: "add_dels",
      count: newDels.length,
    });
  };

  return (
    <div className={styles.delegations_container}>
      {modalUI()}
      {showingWelcome ? (
        <div className={styles.welcome}>
          <p className={styles.welcome_subheading}>Signed in as</p>
          <h1 className={styles.welcome_heading}>
            {accountInfo.email ||
              `${settings.conference || ""} ${settings.committee || ""}`}
          </h1>
        </div>
      ) : (
        <div className={styles.welcome}>
          <h1 className={styles.welcome_subheading}>
            Signed in as&nbsp;
            <span>
              {accountInfo.email ||
                `${settings.conference} ${settings.committee}`}
            </span>
          </h1>
        </div>
      )}

      <div className={`${styles.flex_row} ${styles.full_size}`}>
        <div className={styles.UI_left}>
          <div className={styles.UI_topleft}>
            <div className={styles.delcount_container}>
              <div className={styles.delcount_subcont}>
                <p className={styles.delcount_num}>{delegations.length}</p>
                <p className={styles.delcount_desc}>Active</p>
                <p className={styles.delcount_desc}>Delegations</p>
              </div>
            </div>

            <div
              className={`${styles.btt_add_country} ${styles.noselect}`}
              onClick={() => {
                setModal("add-un-countries");
              }}
            >
              <p>Add UN Countries</p>
            </div>

            <div
              className={`${styles.btt_add_country} ${styles.noselect}`}
              onClick={() => {
                setModal("add-custom-country");
              }}
            >
              <p>Add Custom Country</p>
            </div>

            <div
              className={
                accountInfo.type === "Premium"
                  ? `${styles.btt_add_country} ${styles.noselect}`
                  : `${styles.btt_bricked} ${styles.noselect}`
              }
              onClick={() => {
                if (accountInfo.type === "Premium")
                  setModal("add-via-spreadsheet");
              }}
            >
              {accountInfo.type !== "Premium" && (
                <IoIosLock size={20} style={{ marginRight: 10 }} />
              )}
              <p>Spreadsheet Import</p>
            </div>

            <div
              className={
                !(delegations.length < 1)
                  ? `${styles.btt_select_all} ${styles.noselect}`
                  : `${styles.btt_select_all} ${styles.noselect} ${styles.hide}`
              }
              onClick={selectAll}
            >
              <p>Select All</p>
            </div>

            <div
              className={
                !(selections.length < 1)
                  ? `${styles.btt_select_all} ${styles.noselect}`
                  : `${styles.btt_select_all} ${styles.noselect} ${styles.hide}`
              }
              onClick={deselectAll}
            >
              <p>Deselect All</p>
            </div>

            <div
              className={
                !(selections.length < 1)
                  ? `${styles.btt_remove_selected} ${styles.noselect}`
                  : `${styles.btt_remove_selected} ${styles.noselect} ${
                      styles.hide
                    }`
              }
              onClick={() => {
                setModal("confirmation");
              }}
            >
              <p>Remove Selected</p>
            </div>
          </div>

          <div
            className={`${styles.btt_export_delegations} ${styles.noselect}`}
            onClick={exportCodes}
          >
            <div className={styles.btt_export_delegations_inner}>
              <BsIcons.BsDownload size={18} />
              <p>Export Codes (.csv)</p>
            </div>
          </div>
        </div>

        <div className={styles.UI_right}>{delegateBars}</div>
      </div>
    </div>
  );

  function modalUI() {
    switch (modal) {
      case "add-un-countries":
        return (
          <AddUNCountries setModal={setModal} addDelegates={addDelegates} />
        );
      case "add-custom-country":
        return (
          <AddCustomCountry setModal={setModal} addDelegates={addDelegates} />
        );
      case "add-via-spreadsheet":
        return (
          <AddViaSpreadsheet setModal={setModal} addDelegates={addDelegates} />
        );
      case "confirmation":
        return (
          <Confirmation
            fn={removeSelected}
            bttLabel="Remove Selected"
            description="Deleting delegates will revoke their form access and delete any notes you took about them, permanently. Their statistics and directives will remain."
            setModal={setModal}
          />
        );
      default:
        break;
    }
  }

  function rerenderDels() {
    let delList = delegations;
    delList.sort((a, b) => a.name.localeCompare(b.name));

    for (let i = 0; i < delegations.length; i++) {
      let delegate = delegations[i];
      delegate.id = i;
    }

    function handleClick(country) {
      if (selections.includes(country)) {
        setSelections(
          selections.filter((item) => {
            return item !== country;
          })
        );
      } else {
        setSelections(selections.concat(country));
      }
    }

    if (delegations.length !== 0) {
      setDelegateBars(
        delegations.map((delegate) => {
          return (
            <Delbar
              selected={selections.includes(delegate.name)}
              delegate={delegate.name}
              code={delegate.code}
              handleClick={handleClick}
            />
          );
        })
      );
    } else {
      setDelegateBars(
        <div className={styles.no_del_container}>
          <p className={styles.no_del_message}>No delegations yet!</p>
        </div>
      );
    }
  }

  function deselectAll() {
    setSelections([]);
  }

  function selectAll() {
    let allDels = [];
    delegations.map((delegate) => allDels.push(delegate.name));
    setSelections(allDels);
  }
  function removeSelected() {
    let newDelegations = delegations.filter((country) => {
      return !selections.includes(country.name);
    });
    let newSelections = selections.filter((country) => {
      return selections.includes(country.name);
    });
    writeToFirebase("delegations", newDelegations);
    setSelections(newSelections);

    let newNotesIndv = notes.individual.filter((note) => {
      return !selections.includes(note.delegate);
    });
    writeToFirebase("notes", { quick: notes.quick, individual: newNotesIndv });
  }

  function exportCodes() {
    let nameCodePairs = [];
    for (let i = 0; i < delegations.length; i++) {
      let newPair = [delegations[i].name, delegations[i].code];
      nameCodePairs.push(newPair);
    }

    const rows = [
      ["JSON Format: ", JSON.stringify(delegations)],
      [],
      ["Delegate", "Code"],
    ].concat(nameCodePairs);
    exportToCsv("Delegate Codes", rows);
  }
}

export default Delegations;
