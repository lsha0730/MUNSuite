import React, { useState, useEffect } from "react";
import "./CustomCard.scoped.css";
import { BsPersonFill, BsCheckLg, BsXLg } from "react-icons/bs";

function CustomCard(props) {
    const [bodyRenders, setBodyRenders] = useState();

    useEffect(() => {
        setBodyRenders(props.body.map(block => {
            switch (block.type) {
                case "select-multiple":
                    return (
                        <div>
                            <p className="block-heading">{block.heading}</p>
                            <p className="block-text">{block.value.join(", ")}</p>
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

    function passDirective() {
        //!!!
        console.log("Passed: " + props.author)
    }

    function failDirective() {
        //!!!
        console.log("Failed: " + props.author)
    }

    return (
        <div className="card-container">
            <div className="card-operations" style={props.hide? {display: "none"}:{}}>
                <div className="btt-pass" onClick={passDirective}>
                    <BsCheckLg size={20} style={{fill: "#3CDC27"}}/>
                </div>
                <div className="btt-fail" onClick={failDirective}>
                    <BsXLg size={20} style={{fill: "#FF7070"}}/>
                </div>
            </div>

            <div className="card-top">
                <BsPersonFill size={30} className="card-icon"/>
                <p className="author">{props.author}</p>
                <p className="id-tag">ID: {props.id}</p>
            </div>

            <div className="card-body">
                {bodyRenders}
            </div>
        </div>
    )
}

export default CustomCard