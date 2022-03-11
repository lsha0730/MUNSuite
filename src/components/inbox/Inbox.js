import React, { useEffect, useState } from "react";
import "./Inbox.scoped.css";
import MockSubmissions from "./MockSubmissions.js";
import StandardCard from "./card/StandardCard.js";
import CustomCard from "./card/CustomCard.js";

function Inbox() {
    const [accepting, setAccepting] = useState(true);
    const [toggleRender, setToggleRender] = useState();
    const [cardArr, setCardArr] = useState(MockSubmissions);
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
    }, [accepting])

    useEffect(() => {
        setCardArrRender(cardArr.map(directive => {
            if (directive.standard) {
                return <StandardCard key={directive.submissionID} id={directive.submissionID} title={directive.title} type={directive.type} sponsors={directive.sponsors} signatories={directive.signatories} body={directive.body}/>
            } else {
                return <CustomCard key={directive.submissionID} id={directive.submissionID} author={directive.author} body={directive.body}/>
            }
        }))
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
            </div>
        </div>
    )
}


export default Inbox;