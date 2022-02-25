import React from "react";
import "./Delegations.css";
import DelegateBar from "./DelegateBar.js";
import Delegates from "./Delegates.js";
import * as BsIcons from "react-icons/bs";

function Delegations() {
    let countriesSelected = ["Canada"];
    let delegateList = Delegates.map(delegate =>
        <DelegateBar
        key = {delegate.id}
        name = {delegate.name}
        code = {delegate.code}/>);

    return (
        <div className="delegations-container">
            <div className="UI-left">
                <div className="UI-topleft">
                    <div className="delcount-container">
                        <div className="delcount-subcont">
                            <p className="delcount-num">12</p>
                            <p className="px18">Active Delegations</p>
                        </div>
                    </div>

                    <div className="btt-add-country">
                        <p>Add UN Countries</p>
                    </div>

                    <div className="btt-add-country">
                        <p>Add Custom Country</p>
                    </div>

                    <div className={!(countriesSelected.length<1) ? "btt-remove-selected" : "btt-remove-selected hide"}>
                        <p>Remove Selected</p>
                    </div>
                </div>

                <div className="export-delegations">
                    <BsIcons.BsDownload size={25}/>
                    <p className="export-codes">Export Codes (.xlsx)</p>
                </div>
            </div>

            <div className="UI-right">
                {delegateList}
            </div>
        </div>
    )
}

export default Delegations;