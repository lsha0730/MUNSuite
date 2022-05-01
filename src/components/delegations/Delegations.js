import React, { useEffect, useState } from "react";
import "./Delegations.scoped.css";
import { AddUNCountries, AddCustomCountry, AddViaSpreadsheet } from "./modal-ui/modal-ui.js";
import * as BsIcons from "react-icons/bs";
import { delegationsContext } from "../../Context";

function Delegations() {
    const [selections, setSelections] = useState([]);
    const [modal, setModal] = useState(false);
    const [delegateBars, setDelegateBars] = useState([]);
    const [delegations, setDelegations] = useState([]);

    function modalUI() {
        switch (modal) {
            case "add-un-countries":
                return <AddUNCountries/>;
            case "add-custom-country":
                return <AddCustomCountry/>;
            case "add-via-spreadsheet":
                return <AddViaSpreadsheet/>
            default:
                break;
        }
    }

    useEffect(() => {
        let delHolder = delegations;
        delHolder.sort((a, b) => a.name.localeCompare(b.name));
        setDelegations(delHolder);

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
                return (
                    <div className={selections.includes(delegate.name)? "delegate-container-selected":"delegate-container"} onClick={() => {handleClick(delegate.name)}}>
                        <p className="del-name">{delegate.name}</p>
                        <div className={selections.includes(delegate.name)? "code-container-selected":"code-container"}>
                            <p>{delegate.code}</p>
                        </div>
                    </div>
                )
            }));
        } else {
            setDelegateBars(
                <div className="no-del-container">
                    <p className="no-del-message">No delegations yet!</p>
                </div>
            );
        }

        

    }, [delegations, selections]);

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
        setDelegations(newDelegations);
        setSelections(newSelections);
    }

    function exportCodes() {
        let nameCodePairs = [];
        for (let i=0; i<delegations.length; i++) {
            let newPair = [delegations[i].name, delegations[i].code];
            nameCodePairs.push(newPair);
        }
        console.log(nameCodePairs)

        const rows = [["Delegate", "Code"]].concat(nameCodePairs);
        
        let csvContent = "data:text/csv;charset=utf-8,";
        
        rows.forEach(function(rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "delegate_codes.csv");
        document.body.appendChild(link);
        link.click();
    }

    return (
        <delegationsContext.Provider value={{delegations, setDelegations, modal, setModal}}>
            <div className="delegations-container">
                <div className={!(modal===false)? "modal-background" : "disappear"}>
                    {modalUI()}
                </div>

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
                        onClick={removeSelected}>
                            <p>Remove Selected</p>
                        </div>
                    </div>

                    <div className="export-delegations" onClick={exportCodes}>
                        <BsIcons.BsDownload size={22}/>
                        <p className="export-codes">Export Codes (.csv)</p>
                    </div>
                </div>

                <div className="UI-right">
                    {delegateBars}
                </div>
            </div>
        </delegationsContext.Provider>
    )
}


export default Delegations;