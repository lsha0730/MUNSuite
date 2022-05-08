import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import "./Inbox.scoped.css";
import MockPendings from "./MockPendings.js";
import StandardCard from "./card/StandardCard.js";
import CustomCard from "./card/CustomCard.js";

function Inbox() {
    const db = getDatabase();
    const [accepting, setAccepting] = useState(true);
    const [toggleRender, setToggleRender] = useState();
    const [cardArr, setCardArr] = useState(JSON.parse(localStorage.getItem("pendings")) || MockPendings);
    const [cardArrRender, setCardArrRender] = useState([]);

    function updateCards(operation, submissionID) {
        let cardIndex;
        for (let i=0; i<cardArr.length; i++) {
            if (cardArr[i].submissionID == submissionID) {
                cardIndex = i;
            }
        }

        let tempArr = cardArr.slice();
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
            let tempProcessedArr = JSON.parse(localStorage.getItem("processed"));
            tempProcessedArr.push(card);
            localStorage.setItem("processed", JSON.stringify(tempProcessedArr));
        }

        setCardArr(tempArr);
    }

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
    }, [accepting])

    useEffect(() => {
        onValue(ref(db, 'test/pendings'), (snapshot) => {
            if (snapshot.val() == null) {
                setCardArr([]);
            } else {
                setCardArr(snapshot.val());
            }
        })
    }, [])

    useEffect(() => {
        setCardArrRender(cardArr.map(directive => {
            if (directive.standard) {
                return <StandardCard key={directive.submissionID} id={directive.submissionID} title={directive.title} type={directive.type} sponsors={directive.sponsors} signatories={directive.signatories} body={directive.body} updateCards={updateCards}/>
            } else {
                return <CustomCard key={directive.submissionID} id={directive.submissionID} author={directive.author} body={directive.body} updateCards={updateCards}/>
            }
        }))

        set(ref(db, 'test/pendings'), cardArr);
        localStorage.setItem("pendings", JSON.stringify(cardArr));
        dispatchEvent(new Event("pendings updated"));
    }, [cardArr])

    return (
        <div className="inbox-container">
            <div className="UI-top">
                {toggleRender}
                <p className="card-count">{cardArr.length} in Queue</p>
            </div>
            <div className="UI-bottom">
                <div className="spacer"></div>
                {cardArrRender}
                <div className="spacer2"></div>
            </div>
        </div>
    )
}


export default Inbox;