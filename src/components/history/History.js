import React, { useEffect, useState } from "react";
import "./History.scoped.css";
import MockSubmissions from "../inbox/MockSubmissions.js";
import StandardCard from "../inbox/card/StandardCard.js";
import CustomCard from "../inbox/card/CustomCard.js";

function History() {
    const [cardArr, setCardArr] = useState(MockSubmissions);
    const [cardArrRender, setCardArrRender] = useState([]);
    const [selection, setSelection] = useState(0);
    const [selectionRender, setSelectionRender] = useState();

    useEffect(() => {
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
                <div className="cardbar-deck-container">
                    {cardArrRender}
                </div>
            </div>
        </div>
    )
}


export default History;