import React, { useContext, useEffect, useState } from "react";
import "./modal-ui.css";
import UNCountriesData from "./UNCountriesData.js";
import { delegationsContext } from "../../../Context.js";

function makeUniqueCode(size, existingDels) {
    function makeCode(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    let codes = existingDels.map((delegate) => {return delegate.name});
    let code = makeCode(size);
    while (codes.includes(code)) {
        code = makeCode(size);
    }
    return code;
}

function AddUNCountries() {
    const {setModal} = useContext(delegationsContext);
    const {delegations, setDelegations} = useContext(delegationsContext);
    const [modalSelections, setModalSelections] = useState([]);
    const [delNames] = useState(delegations.map((delegateObj) => {return delegateObj.name}));
    const [countriesNotInList] = useState(UNCountriesData.filter((country) => {
        return !delNames.includes(country);
    }));

    const [countriesNotInListRenders, setCountriesNotInListRenders] = useState([]);

    useEffect(() => {
        function handleClick(country) {
            if (!modalSelections.includes(country)) {
                setModalSelections(modalSelections.concat(country));
            } else {
                setModalSelections(modalSelections.filter((item) => {return item!==country}))
            }
        }

        let renders = countriesNotInList.map((country) => {
            return (
                <div className={modalSelections.includes(country)? "modal-delbar-container selected":"modal-delbar-container"}
                onClick={() => {handleClick(country)}}>
                    <p className="modal-country-name">{country}</p>
                </div>
            )
        })
        setCountriesNotInListRenders(renders);
    }, [modalSelections])

    function addCountries() {
        setModal(false);
        let totalDels = delegations;
        setDelegations(
            totalDels.concat(modalSelections.map((selection) => {
                let newObject = {};
                newObject.id = delegations.length;
                newObject.name = selection;
                newObject.code = makeUniqueCode(5, delegations);
                return newObject;
        })));
        setModalSelections([]);
    }

    return (
        <div className="modal-container-un">
            <div className="modal-top">
                <p className="modal-header">Add UN Countries</p>
                <p className="modal-subheader">Select countries, then click "Add Countries" to add them.</p>
            </div>

            <div className="modal-body">
                {countriesNotInListRenders}
            </div>

            <div className="modal-bottom">
                <div className="btt-add-countries" onClick={addCountries}>
                    <p>Add Countries</p>
                </div>
                <div className="btt-cancel" onClick={() => {setModal(false)}}>
                    <p>Cancel</p>
                </div>
            </div>
        </div>
    )
}



function AddCustomCountry() {
    const {setModal} = useContext(delegationsContext);
    const {delegations, setDelegations} = useContext(delegationsContext);

    function addCustom() {
        setModal(false);

        let newObject = {};
        newObject.id = delegations.length;
        newObject.name = document.getElementById("custom-country-input").value;
        newObject.code = makeUniqueCode(5, delegations);

        setDelegations(delegations.concat(newObject));
    }

    return (
        <div className="modal-container-custom">
            <div className="modal-top">
                <p className="modal-header">Add Custom Country</p>
                <p className="modal-subheader">Add your own country.</p>
            </div>

            <div className="modal-body">
                <div className="modal-input-container">
                    <p style={{fontWeight: 500, marginBottom: 10}}>Country Name</p>
                    <input className="modal-custom-input" id="custom-country-input"></input>
                </div>
            </div>

            <div className="modal-bottom">
                <div className="btt-custom-add-countries" onClick={addCustom}>
                    <p>Add Country</p>
                </div>
                <div className="btt-cancel" onClick={() => {setModal(false)}}>
                    <p>Cancel</p>
                </div>
            </div>
        </div>
    )
}

export { AddUNCountries, AddCustomCountry };