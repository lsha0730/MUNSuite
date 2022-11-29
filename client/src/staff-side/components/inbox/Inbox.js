import React, { useEffect, useState, useContext } from "react";
import "./Inbox.scoped.css";
import StandardCard from "./card/StandardCard.js";
import CustomCard from "./card/CustomCard.js";
import { appContext } from "../../staffContext";
import Dropdown from "../history/Dropdown";
import { FaFilter } from "react-icons/fa";

function Inbox() {
    const {processed} = useContext(appContext);
    const {pendings} = useContext(appContext);
    const {settings} = useContext(appContext);
    const {writeToFirebase} = useContext(appContext);
    const [accepting, setAccepting] = useState(settings.formOpen !== undefined? settings.formOpen:true);
    const [toggleRender, setToggleRender] = useState();
    const [cardArrRender, setCardArrRender] = useState([]);
    const {form} = useContext(appContext);
    const [dropdownValue, setDropdownValue] = useState("No Filter");

    useEffect(() => {
        let toggleOffset = accepting? 0:25;

        setToggleRender(
            <div className="toggle-set" onClick={() => setAccepting(!accepting)}>
                <p className={accepting? "toggle-text-green":"toggle-text-red"}>{accepting? "Accepting Responses":"Form Suspended"}</p>
                <div className={accepting? "toggle-bar toggle-greenbg":"toggle-bar toggle-redbg"}>
                    <div className={accepting? "toggle-circle toggle-greenbtt":"toggle-circle toggle-redbtt"} style={{left: toggleOffset}}></div>
                </div>
            </div>
        )
        
        let tempSettings = settings;
        tempSettings.formOpen = accepting;
        writeToFirebase("settings", JSON.parse(JSON.stringify(tempSettings)));
    }, [accepting])

    useEffect(() => {
        setCardArrRender(pendings.filter(includeInFilter).map(directive => {
            if (directive.standard) {
                return <StandardCard key={directive.submissionID} id={directive.submissionID} title={directive.title} type={directive.type} sponsors={directive.sponsors || []} signatories={directive.signatories || []} body={directive.body || []} updateCards={updateCards} variant="inbox"/>
            } else {
                return <CustomCard key={directive.submissionID} id={directive.submissionID} author={directive.author} body={directive.body || []} updateCards={updateCards} variant="inbox"/>
            }
        }))
    }, [pendings, dropdownValue])

    function includeInFilter(directive) {
        if (dropdownValue == "No Filter") return true;
        return directive && directive?.standard && directive?.type == dropdownValue;
    }

    return (
        <div className="inbox-container">
            <div className="UI-top">
                <div className="filter-container">
                    <FaFilter size={20} style={{marginRight: 10, fill: "#BCBCBC"}}/>
                    <Dropdown options={["No Filter"].concat(settings.standardForm? form[2].options : ["Public", "Private"])} setSelection={setDropdownValue}/>
                </div>
                <p className="card-count">{pendings.length} in Queue</p>
                {toggleRender}
            </div>
            <div className="UI-bottom">
                <div className="spacer"></div>
                {cardArrRender.length != 0? cardArrRender:<div className="no-cards-box">No pending submissions</div>}
                <div className="spacer2"></div>
            </div>
        </div>
    )

    function updateCards(operation, submissionID) {
        let cardIndex;
        for (let i=0; i<pendings.length; i++) {
            if (pendings[i].submissionID == submissionID) {
                cardIndex = i;
            }
        }

        let tempArr = pendings.slice();
        switch (operation) {
            case "pass":
                let passedCard = tempArr.splice(cardIndex, 1)[0];
                passedCard.status = "Passed";
                pushToProcessed(passedCard);
                break;
            case "fail":
                let failedCard = tempArr.splice(cardIndex, 1)[0];
                failedCard.status = "Failed";
                pushToProcessed(failedCard);
                break;
            case "table":
                let tempObj = tempArr[cardIndex];
                tempArr.splice(cardIndex, 1);
                tempArr.push(tempObj);
        }

        function pushToProcessed(card) {
            let tempProcessedArr = processed.slice();
            tempProcessedArr.push(card);
            writeToFirebase("processed", tempProcessedArr);
        }

        writeToFirebase("pendings", tempArr);
    }
}


export default Inbox;