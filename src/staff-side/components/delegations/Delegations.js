import React, { useEffect, useState, useContext } from "react";
import "./Delegations.scoped.css";
import { AddUNCountries, AddCustomCountry, AddViaSpreadsheet, Confirmation } from "../modal-ui/modal-ui.js";
import Delbar from "./delbar/Delbar.js";
import * as BsIcons from "react-icons/bs";
import { appContext } from "../../staffContext.js";

function Delegations() {
    const {delegations} = useContext(appContext);
    const {notes} = useContext(appContext);
    const {writeToFirebase} = useContext(appContext);
    const {exportToCsv} = useContext(appContext);
    const [selections, setSelections] = useState([]);
    const [modal, setModal] = useState(false);
    const [delegateBars, setDelegateBars] = useState([]);

    useEffect(() => {
        rerenderDels();
    }, [delegations, selections]);

    return (
        <div className="delegations-container">
            {modalUI()}

            <div className="UI-left">
                <div className="UI-topleft">
                    <div className="delcount-container">
                        <div className="delcount-subcont">
                            <p className="delcount-num">{delegations.length}</p>
                            <p className="delcount-desc">Active</p>
                            <p className="delcount-desc">Delegations</p>
                        </div>
                    </div>

                    <div className="btt-add-country" onClick={() => {setModal("add-un-countries")}}>
                        <p>Add UN Countries</p>
                    </div>

                    <div className="btt-add-country" onClick={() => {setModal("add-custom-country")}}>
                        <p>Add Custom Country</p>
                    </div>

                    <div className="btt-add-country" onClick={() => {setModal("add-via-spreadsheet")}}>
                        <p>Spreadsheet Import</p>
                    </div>

                    <div className={!(delegations.length<1) ? "btt-select-all" : "btt-select-all hide"} onClick={selectAll}>
                        <p>Select All</p>
                    </div>

                    <div className={!(selections.length<1) ? "btt-select-all" : "btt-select-all hide"}
                    onClick={deselectAll}>
                        <p>Deselect All</p>
                    </div>

                    <div className={!(selections.length<1) ? "btt-remove-selected" : "btt-remove-selected hide"}
                    onClick={() => {setModal("confirmation")}}>
                        <p>Remove Selected</p>
                    </div>
                </div>

                <div className="btt-export-delegations" onClick={exportCodes}>
                    <div className="btt-export-delegations-inner">
                        <BsIcons.BsDownload size={18}/>
                        <p>Export Codes (.csv)</p>
                    </div>
                </div>
            </div>

            <div className="UI-right">
                {delegateBars}
            </div>
        </div>
    )

    function modalUI() {
        switch (modal) {
            case "add-un-countries":
                return <AddUNCountries setModal={setModal}/>;
            case "add-custom-country":
                return <AddCustomCountry setModal={setModal}/>;
            case "add-via-spreadsheet":
                return <AddViaSpreadsheet setModal={setModal}/>;
            case "confirmation":
                return <Confirmation function={removeSelected} bttLabel="Remove" description="Deleting delegates will revoke their form access and delete any notes you took about them, permanently. Their statistics and directives will remain." setModal={setModal}/>;
            default:
                break;
        }
    }

    function rerenderDels() {
        let delList = delegations;
        delList.sort((a, b) => a.name.localeCompare(b.name));

        for (let i=0; i<delegations.length; i++) {
            let delegate = delegations[i];
            delegate.id = i;
        }

        function handleClick(country) {
            if (selections.includes(country)) {
                setSelections(selections.filter((item) => {
                    return item !== country;
                }));
            } else {
                setSelections(selections.concat(country));
            }
        }

        if (delegations.length !== 0) {
            setDelegateBars(delegations.map(delegate => {
                return <Delbar selected={selections.includes(delegate.name)} delegate={delegate.name} code={delegate.code} handleClick={handleClick}/>
            }));
        } else {
            setDelegateBars(
                <div className="no-del-container">
                    <p className="no-del-message">No delegations yet!</p>
                </div>
            );
        }
    }

    function deselectAll() { setSelections([]); }
    
    function selectAll() {
        let allDels = [];
        delegations.map(delegate => allDels.push(delegate.name));
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
        for (let i=0; i<delegations.length; i++) {
            let newPair = [delegations[i].name, delegations[i].code];
            nameCodePairs.push(newPair);
        }

        const rows = [["JSON Format: ", JSON.stringify(delegations)], [], ["Delegate", "Code"]].concat(nameCodePairs);
        exportToCsv("Delegate Codes", rows);
    }
}


export default Delegations;