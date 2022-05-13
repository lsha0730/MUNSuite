import React, { useState, useEffect } from "react";
import "./CustomCard.scoped.css";
import { BsPersonFill, BsCheckLg, BsXLg } from "react-icons/bs";
import { IoIosFastforward } from "react-icons/io";

function CustomCard(props) {
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
                <div className="card-top-left">
                    <BsPersonFill size={30} className="card-icon"/>
                    <p className="author">{props.author}</p>
                </div>

                <div className="card-top-right">
                    <div className="status-indicator" style={{backgroundColor: indicatorColor}}></div>
                    <p className="id-tag">ID: {props.id}</p>
                </div>
            </div>

            <div className={extended? "card-body":"card-body-collapsed"}>
                {bodyRenders}
            </div>
        </div>
    )
}

export default CustomCard