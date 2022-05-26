import React, { useEffect, useState } from "react";
import "./StandardCard.scoped.css"
import { BsPeopleFill, BsEyeglasses } from "react-icons/bs";

function StandardCard(props) {
    const [bodyRenders, setBodyRenders] = useState();
    const [extended, setExtended] = useState(false);
    let headerColor;
    let indicatorColor;
    switch (props.status) {
        case "Passed":
            indicatorColor = "#7AFF69";
            headerColor = "#85a2b7";
            break;
        case "Failed":
            indicatorColor = "#FF8080";
            headerColor = "#85a2b7";
            break;
        case "Pending":
            indicatorColor = "#BCBCBC";
            headerColor = "#3C8CC9";
            break;
        default:
            indicatorColor = "#BCBCBC";
            headerColor = "#3C8CC9";
            break;
    }

    useEffect(() => {
        setBodyRenders(props.body.map(block => {
            switch (block.type) {
                case "select-multiple":
                    return (
                        <div>
                            <p className="block-heading">{block.heading}</p>
                            <p className="block-text">{block.value? block.value.join(", "):"None"}</p>
                        </div>
                    )
                case "multiplechoice":
                    return (
                        <div>
                            <p className="block-heading">{block.heading}</p>
                            <p className="block-text">{block.value? block.value.join(", "):"None"}</p>
                        </div>
                    )
                default:
                    return (
                        <div>
                            <p className="block-heading">{block.heading}</p>
                            <p className="block-text">{block.value}</p>
                        </div>
                    )
            }
        }))
    }, [])

    return (
        <div className="card-container">
            <div className={extended? "card-top":"card-top rounded"} style={{backgroundColor: headerColor, transition: "300ms"}} onClick={() => {setExtended(!extended)}}>
                <div className="card-top-top">
                    <p className="title">{props.title}</p>
                    <div className="status-indicator" style={{backgroundColor: indicatorColor}}></div>
                </div>

                <div className="card-top-bottom">
                    <p className="type">{props.type}</p>
                    <p className="id-tag">ID: {props.id}</p>
                </div>
            </div>

            <div className={extended? "collapsable":"collapsable collapsed"}>
                <div className="card-tie">
                    <div className="tie-set">
                        <BsPeopleFill size={15} className="card-icon"/>
                        <p>{props.sponsors.join(", ")}</p>
                    </div>
                    {props.signatories && props.signatories.length > 0?
                        <div className="tie-set">
                            <BsEyeglasses size={18} className="card-icon"/>
                            <p className="signatories-list">{props.signatories.join(", ")}</p>
                        </div>
                        : <div></div>}
                </div>

                <div className="card-body">
                    {bodyRenders}
                </div>
            </div>
        </div>
    )
}

export default StandardCard