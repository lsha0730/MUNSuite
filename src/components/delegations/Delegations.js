import React, { useContext } from "react";
import "./Delegations.css";
import DelegateBar from "./DelBar.js";
import Delegates from "./DelData.js";
import * as BsIcons from "react-icons/bs";
import { delContext } from './DelContext.js';

function Delegations() {
    const {selections, setSelections} = useContext(delContext);
    let delegateBars = Delegates.map(delegate =>
        <DelegateBar
        key = {delegate.id}
        name = {delegate.name}
        code = {delegate.code}
        />);

    function deselectAll() { setSelections([]); }
    function selectAll() {
        var allDels = [];
        Delegates.map(delegate => allDels.push(delegate.name));
        setSelections(allDels);
    }

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

                    <div className="btt-deselect-all" onClick={selectAll}>
                        <p>Select All</p>
                    </div>

                    <div className={!(selections.length<1) ? "btt-deselect-all" : "btt-deselect-all hide"}
                    onClick={deselectAll}>
                        <p>Deselect All</p>
                    </div>

                    <div className={!(selections.length<1) ? "btt-remove-selected" : "btt-remove-selected hide"}>
                        <p>Remove Selected</p>
                    </div>
                </div>

                <div className="export-delegations">
                    <BsIcons.BsDownload size={22}/>
                    <p className="export-codes">Export Codes (.xlsx)</p>
                </div>
            </div>

            <div className="UI-right">
                {delegateBars}
            </div>
        </div>
    )
}

export default Delegations;