import React, { useEffect, useState, useContext } from "react";
import "./Inbox.scoped.css";
import StandardCard from "./card/StandardCard.js";
import CustomCard from "./card/CustomCard.js";
import { appContext } from "../../staffContext";

function Inbox() {
    const {processed, setProcessed} = useContext(appContext);
    const {pendings, setPendings} = useContext(appContext);
    const {settings, setSettings} = useContext(appContext);
    const [accepting, setAccepting] = useState(settings.formOpen !== undefined? settings.formOpen:true);
    const [toggleRender, setToggleRender] = useState();
    const [cardArrRender, setCardArrRender] = useState([]);

    useEffect(() => {
        let toggleOffset = accepting? 0:25;

        setToggleRender(
            <div className="toggle-set" onClick={() => setAccepting(!accepting)}>
                <div className={accepting? "toggle-bar toggle-greenbg":"toggle-bar toggle-redbg"}>
                    <div className={accepting? "toggle-circle toggle-greenbtt":"toggle-circle toggle-redbtt"} style={{left: toggleOffset}}></div>
                </div>
                <p className={accepting? "toggle-text-green":"toggle-text-red"}>{accepting? "Accepting Responses":"Form Suspended"}</p>
            </div>
        )
        
        let tempSettings = settings;
        tempSettings.formOpen = accepting;
        setSettings(JSON.parse(JSON.stringify(tempSettings)));
    }, [accepting])

    useEffect(() => {
        setCardArrRender(pendings.map(directive => {
            if (directive.standard) {
                return <StandardCard key={directive.submissionID} id={directive.submissionID} title={directive.title} type={directive.type} sponsors={directive.sponsors || []} signatories={directive.signatories || []} body={directive.body || []} updateCards={updateCards}/>
            } else {
                return <CustomCard key={directive.submissionID} id={directive.submissionID} author={directive.author} body={directive.body || []} updateCards={updateCards}/>
            }
        }))
    }, [pendings])

    return (
        <div className="inbox-container">
            <div className="UI-top">
                {toggleRender}
                <p className="card-count">{pendings.length} in Queue</p>
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
            setProcessed(tempProcessedArr);
        }

        setPendings(tempArr);
    }
}


export default Inbox;