import React, { useContext, useRef } from "react";
import "./Settings.scoped.css";
import { BsGearFill } from "react-icons/bs";
import { FaGitAlt } from "react-icons/fa";
import { appContext } from "../../staffContext";
import CHANGELOG from "./CHANGELOG.json"

function Settings() {
    const {settings} = useContext(appContext);
    const {writeToFirebase} = useContext(appContext);
    const isMounted = useRef(false);

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
                    {CHANGELOG.map(log => (
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
    )

    function updateSettings() {
        if (isMounted.current) {
            let confName = document.getElementById("conference-name").value == ""? "MUNSuite":document.getElementById("conference-name").value;
            let commName = document.getElementById("committee-name").value == ""? "Commitee":document.getElementById("committee-name").value;

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