import React, { useContext } from "react";
import "./Settings.scoped.css";
import { BsGearFill } from "react-icons/bs";
import { FaGitAlt } from "react-icons/fa";
import { appContext } from "../../Context";

function Settings() {
    const {settings, setSettings} = useContext(appContext);

    return (
        <div className="page-container">
            <div className="UI-left">
                <div className="UI-left-top">
                    <div className="header-pair">
                        <BsGearFill size={30} className="header-icon"/>
                        <p className="header-text">Program Settings</p>
                    </div>
                </div>

                <div>
                    <p className="setting-header">Committee Information</p>
                    <div className="inputs-container">
                        <div className="input-container">
                            <p className="input-subheader">Conference Name (Abbreviated)</p>
                            <input id="conference-name" type="text" className="input-field" defaultValue={settings.conference} onChange={updateSettings}></input>
                        </div>
                        <div className="input-container">
                            <p className="input-subheader">Committee (Abbreviated)</p>
                            <input id="committee-name" type="text" className="input-field" defaultValue={settings.committee} onChange={updateSettings}></input>
                        </div>
                    </div>
                </div>
            </div>

            <div className="UI-right">
                <div className="header-pair">
                    <FaGitAlt size={30} className="header-icon"/>
                    <p className="header-text">Release Notes</p>
                </div>

                <div className="release-notes-container">
                    <p className="version-note-heading">v 1.0.0</p>
                    <p className="version-note-subheading">Beta release of the app. Please email any feedback to Lsha0730@gmail.com.</p>
                </div>

                <div className="metadata">
                    <p>Copyright © MUNSuite.com</p>
                    <p>All rights reserved.</p>
                    <p className="signature">Created by Lincoln Lee</p>
                </div>
            </div>
        </div>
    )

    function updateSettings() {
        let confName = document.getElementById("conference-name").value == ""? "MUNSuite":document.getElementById("conference-name").value;
        let commName = document.getElementById("committee-name").value == ""? "Commitee":document.getElementById("committee-name").value;

        let settingsObj = {};
        settingsObj.conference = confName;
        settingsObj.committee = commName;

        setSettings(settingsObj);
    }
}

export default Settings;