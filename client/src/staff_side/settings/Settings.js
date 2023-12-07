import React, { useState, useContext, useRef } from "react";
import "./Settings.scoped.css";
import { BsGearFill } from "react-icons/bs";
import { FaGitAlt } from "react-icons/fa";
import { appContext, staffContext } from "../../common/Context";
import CHANGELOG from "../../common/assets/json/CHANGELOG.json";
import blankAccount from "../../common/assets/json/blank_account.json";
import { Confirmation } from "../modals";
import { firebaseWrite } from "../../common/utils/firebase";
import { FirebaseDataTarget } from "../../common/types/types";

function Settings() {
  const { database, user } = useContext(appContext);
  const {
    firebaseData: { settings },
  } = useContext(staffContext);
  const isMounted = useRef(false);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const clearAccount = () => {
    firebaseWrite(database, user, FirebaseDataTarget.Delegations, []);
    firebaseWrite(database, user, FirebaseDataTarget.Form, blankAccount.form);
    firebaseWrite(database, user, FirebaseDataTarget.Pendings, []);
    firebaseWrite(database, user, FirebaseDataTarget.Processed, []);
    firebaseWrite(database, user, FirebaseDataTarget.Notes, {});
    firebaseWrite(database, user, FirebaseDataTarget.Settings, {
      ...blankAccount.settings,
      conference: settings.conference,
      committee: settings.committee,
    });
  };

  return (
    <div className="page-container">
      <div className="UI-left">
        <div className="UI-left-top">
          <div className="header-pair">
            <BsGearFill size={30} className="header-icon" />
            <p className="header-text">Program Settings</p>
          </div>
        </div>

        <div>
          <p className="setting-header">Committee Information</p>
          <div className="inputs-container">
            <div className="input-container">
              <p className="input-subheader">Conference Name (Abbreviated)</p>
              <input
                id="conference-name"
                type="text"
                className="input-field"
                defaultValue={settings.conference}
                onChange={updateSettings}
              />
            </div>
            <div className="input-container">
              <p className="input-subheader">Committee (Abbreviated)</p>
              <input
                id="committee-name"
                type="text"
                className="input-field"
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
          <p className="setting-header">Danger Zone</p>
          <div className="danger-container">
            <div className="flex-col">
              <p className="input-subheader" style={{ marginBottom: 5 }}>
                Reset account data
              </p>
              <p>
                Delete all delegations, form, directives, statistics and notes
              </p>
            </div>
            <div
              className="btt-clear"
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

      <div className="UI-right">
        <div className="header-pair">
          <FaGitAlt size={30} className="header-icon" />
          <p className="header-text">Release Notes</p>
        </div>

        <div className="release-notes-container">
          {CHANGELOG.map((log) => (
            <div>
              <p className="version-note-heading">v {log.version}</p>
              <p className="version-note-subheading">{log.description}</p>
            </div>
          ))}
        </div>

        <div className="metadata">
          <p>Copyright © MUNSuite.com</p>
          <p>All rights reserved.</p>
          <p className="signature">Created by Lincoln Lee</p>
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

      firebaseWrite(
        database,
        user.uid,
        FirebaseDataTarget.Settings,
        settingsObj
      );
    } else {
      isMounted.current = true;
    }
  }
}

export default Settings;
