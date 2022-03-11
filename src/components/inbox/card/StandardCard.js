import React, { useEffect, useState } from "react";
import "./StandardCard.scoped.css"
import { BsPeopleFill, BsEyeglasses, BsCheckLg, BsXLg } from "react-icons/bs";


function StandardCard(props) {
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
        console.log("Passed: " + props.title)
    }

    function failDirective() {
        //!!!
        console.log("Failed: " + props.title)
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
                <p className="title">{props.title}</p>
                <div className="card-top-bottom">
                    <p className="type">{props.type}</p>
                    <p className="id-tag">ID: {props.id}</p>
                </div>
            </div>

            <div className="card-tie">
                <div className="tie-set">
                    <BsPeopleFill size={15} className="card-icon"/>
                    <p>{props.sponsors.join(", ")}</p>
                </div>
                {props.signatories?
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
    )
}

export default StandardCard