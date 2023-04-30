import React, { useState, useContext, useRef } from "react";
import styles from "./Settings.module.css";
import { BsGearFill } from "react-icons/bs";
import { FaGitAlt } from "react-icons/fa";
import { appContext } from "../../staffContext";
import CHANGELOG from "./CHANGELOG.json";
import blankAccount from "./blankAccount.json";
import { Confirmation } from "../modal-ui/modal-ui";

function Settings() {
  const { settings } = useContext(appContext);
  const { writeToFirebase } = useContext(appContext);
  const isMounted = useRef(false);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const clearAccount = () => {
    writeToFirebase("delegations", []);
    writeToFirebase("form", blankAccount.form);
    writeToFirebase("pendings", []);
    writeToFirebase("processed", []);
    writeToFirebase("notes", {});
    writeToFirebase("settings", {
      ...blankAccount.settings,
      conference: settings.conference,
      committee: settings.committee,
    });
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.UI_left}>
        <div className={styles.UI_left_top}>
          <div className={styles.header_pair}>
            <BsGearFill size={30} className={styles.header_icon} />
            <p className={styles.header_text}>Program Settings</p>
          </div>
        </div>

        <div>
          <p className={styles.setting_header}>Committee Information</p>
          <div className={styles.inputs_container}>
            <div className={styles.input_container}>
              <p className={styles.input_subheader}>
                Conference Name (Abbreviated)
              </p>
              <input
                id="conference-name"
                type="text"
                className={styles.input_field}
                defaultValue={settings.conference}
                onChange={updateSettings}
              />
            </div>
            <div className={styles.input_container}>
              <p className={styles.input_subheader}>Committee (Abbreviated)</p>
              <input
                id="committee-name"
                type="text"
                className={styles.input_field}
                defaultValue={settings.committee}
                onChange={updateSettings}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 30,
          }}
        >
          <p className={styles.setting_header}>Danger Zone</p>
          <div className={styles.danger_container}>
            <div className={styles.flex_col}>
              <p className={styles.input_subheader} style={{ marginBottom: 5 }}>
                Reset account data
              </p>
              <p>
                Delete all delegations, form, directives, statistics and notes
              </p>
            </div>
            <div
              className={styles.btt_clear}
              onClick={() => {
                setConfirmingReset(true);
              }}
            >
              Clear all
            </div>
          </div>

          {confirmingReset && (
            <Confirmation
              fn={clearAccount}
              bttLabel="Reset Account"
              description="Clearing your account data will permanently reset your account and delete all your data. This action is irreversible."
              setModal={setConfirmingReset}
            />
          )}
        </div>
      </div>

      <div className={styles.UI_right}>
        <div className={styles.header_pair}>
          <FaGitAlt size={30} className={styles.header_icon} />
          <p className={styles.header_text}>Release Notes</p>
        </div>

        <div className={styles.release_notes_container}>
          {CHANGELOG.map((log) => (
            <div>
              <p className={styles.version_note_heading}>v {log.version}</p>
              <p className={styles.version_note_subheading}>
                {log.description}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.metadata}>
          <p>Copyright © MUNSuite.com</p>
          <p>All rights reserved.</p>
          <p className={styles.signature}>Created by Lincoln Lee</p>
        </div>
      </div>
    </div>
  );

  function updateSettings() {
    if (isMounted.current) {
      let confName =
        document.getElementById("conference-name").value == ""
          ? "MUNSuite"
          : document.getElementById("conference-name").value;
      let commName =
        document.getElementById("committee-name").value == ""
          ? "Commitee"
          : document.getElementById("committee-name").value;

      let settingsObj = {};
      settingsObj.conference = confName;
      settingsObj.committee = commName;

      writeToFirebase("settings", settingsObj);
    } else {
      isMounted.current = true;
    }
  }
}

export default Settings;
