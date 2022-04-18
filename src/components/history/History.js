import React, { useEffect, useState } from "react";
import "./History.scoped.css";
import MockSubmissions from "../inbox/MockSubmissions.js";
import StandardCard from "../inbox/card/StandardCard.js";
import CustomCard from "../inbox/card/CustomCard.js";
import { GoTriangleDown } from "react-icons/go";
import { FaFilter } from "react-icons/fa";

function History() {
    const [cardArr, setCardArr] = useState(MockSubmissions);
    const [cardTitles, setCardTitles] = useState(cardArr.map(card => {return card.title}));
    const [cardArrRender, setCardArrRender] = useState([]);
    const [selection, setSelection] = useState(0);
    const [selectionRender, setSelectionRender] = useState();

    useEffect(() => {
        setCardTitles(cardArr.map(card => {return card.title}))
        let renderArr = [];

        for (let i=0; i<cardArr.length; i++) {
            let card = cardArr[i];
            if (card.standard) {
                renderArr.push(
                    <div className={selection==i? "cardbar-container selected":"cardbar-container"} onClick={() => setSelection(i)}>
                        <div className="cardbar-indicator" style={card.status=="Passed"? {backgroundColor: "#7AFF69"}:{backgroundColor: "#FF6C6C"}}></div>
                        <p>{card.title}</p>
                    </div>
                )
            } else {
                renderArr.push(
                    <div className={selection==i? "cardbar-container selected":"cardbar-container"} onClick={() => setSelection(i)}>
                        <div className="cardbar-indicator" style={card.status=="Passed"? {backgroundColor: "#7AFF69"}:{backgroundColor: "#FF6C6C"}}></div>
                        <p>Submission {card.submissionID}</p>{/*Better alternativr? !!!*/}
                    </div>
                )
            }
        }

        setCardArrRender(renderArr)
    }, [cardArr])


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
                    <div className="filter-group">
                        <FaFilter size={18} className="filter-icon"/>
                        <Dropdown options={["Passed", "Failed", "Starred"]}/>
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
    const [value, setValue] = useState(); // Stores the index of the item in options
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