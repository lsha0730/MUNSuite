import React, { useEffect, useState } from "react";
import "./History.scoped.css";
import MockProcessed from "./MockProcessed.js";
import StandardCard from "../inbox/card/StandardCard.js";
import CustomCard from "../inbox/card/CustomCard.js";
import { GoTriangleDown, GoSearch } from "react-icons/go";
import { FaFilter } from "react-icons/fa";

function History() {
    const [cardArr, setCardArr] = useState(JSON.parse(localStorage.getItem("processed")) || MockProcessed);
    const [cardTitles, setCardTitles] = useState(cardArr.map(card => {return card.title}));
    const [cardArrRender, setCardArrRender] = useState([]);
    const [selection, setSelection] = useState(0);
    const [selectionRender, setSelectionRender] = useState();
    const [search, setSearch] = useState('');
    const [dropdownValue, setDropdownValue] = useState("No Filter");

    useEffect(() => {
        localStorage.setItem("processed", JSON.stringify(cardArr));
        dispatchEvent(new Event("processed updated"));
    }, [cardArr])

    useEffect(() => {
        setCardTitles(cardArr.map(card => {return card.title}))
        let renderArr = [];

        for (let i=0; i<cardArr.length; i++) {
            let card = cardArr[i];
            let filterBoolean = card.status == dropdownValue || dropdownValue == "No Filter";
            if (card.standard) {
                if (filterBoolean && (search === "" || card.title.toLowerCase().includes(search.toLowerCase()))) {
                    renderArr.push(
                        <div className={selection==i? "cardbar-container selected":"cardbar-container"} onClick={() => setSelection(i)}>
                            <div className="cardbar-indicator" style={card.status=="Passed"? {backgroundColor: "#7AFF69"}:{backgroundColor: "#FF8080"}}></div>
                            <p>{card.title}</p>
                        </div>
                    )
                }
            } else {
                if (filterBoolean && (search === "" || `Submission ${card.submissionID}`.toLowerCase().includes(search.toLowerCase()))) {
                    renderArr.push(
                        <div className={selection==i? "cardbar-container selected":"cardbar-container"} onClick={() => setSelection(i)}>
                            <div className="cardbar-indicator" style={card.status=="Passed"? {backgroundColor: "#7AFF69"}:{backgroundColor: "#FF8080"}}></div>
                            <p>Submission {card.submissionID}</p>{/*Better alternative? !!!*/}
                        </div>
                    )
                }
            }
        }

        setCardArrRender(renderArr)
    }, [search, cardArr, selection, dropdownValue])


    useEffect(() => {
        let directive = cardArr[selection];
        if (directive.standard) {
            setSelectionRender (
                <StandardCard key={directive.submissionID} id={directive.submissionID} title={directive.title} type={directive.type} sponsors={directive.sponsors} signatories={directive.signatories} body={directive.body} hide={true}/>
            )
        } else {
            setSelectionRender (
                <CustomCard key={directive.submissionID} id={directive.submissionID} author={directive.author} body={directive.body} hide={true}/>
            )
        }
    }, [selection])


    return (
        <div className="history-container">
            <div className="UI-left">
                {selectionRender}
            </div>
            <div className="UI-right">
                <div className="UI-topright">
                    <div className="searchbar">
                        <input type="text" placeholder="Search" className="subbar" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                        <GoSearch size={15} className="search-icon"/>
                    </div>

                    <div className="filter-group">
                        <Dropdown options={["No Filter", "Passed", "Failed", "Starred"]} setSelection={setDropdownValue}/>
                        <FaFilter size={15} className="filter-icon"/>
                    </div>
                </div>
                <div className="cardbar-deck-container">
                    {cardArrRender}
                </div>
            </div>
        </div>
    )
}


function Dropdown(props) {
    const [value, setValue] = useState(0); // Stores the index of the item in options
    const [dropVisible, setDropVisible] = useState(false);
    const [dropRender, setDropRender] = useState();

    let optionRenders = [];
    for (let i=0; i<props.options.length; i++) {
        let option = props.options[i];
        optionRenders.push(
            <div className="dropdown-option-container" onClick={() => {
                setDropVisible(!dropVisible);
                setValue(i);
                }}>
                <div className="dropdown-text-container">
                    <p className="nowrap">{option}</p>
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (dropVisible) {
            setDropRender(
                <div className="dropdown-field">
                    {optionRenders}
                </div>
            );
        } else {
            setDropRender();
        }
    }, [dropVisible])

    useEffect(() => {
        props.setSelection(props.options[value]);
    }, [value])

    return (
        <div>
            <div className={dropVisible? "dropdown-defocuser":"hidden"} onClick={() => setDropVisible(false)}></div>
            <div className={dropVisible? "dropdown-bar super-z":"dropdown-bar"} onClick={() => setDropVisible(!dropVisible)}>
                <div className="dropdown-text-container">
                    <p className="nowrap">{props.options[value]}</p>
                </div>
                <GoTriangleDown size={10} className="dropdown-triangle"/>
                {dropRender}
            </div>
        </div>
    )
}


export default History;