import React, { useState, useEffect } from "react";
import "./CustomCard.scoped.css";
import { BsPersonFill, BsCheckLg, BsXLg } from "react-icons/bs";
import { IoIosFastforward } from "react-icons/io";
import { BiUndo } from "react-icons/bi";

function CustomCard(props) {
    const [bodyRenders, setBodyRenders] = useState();

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

    function passDirective() {
        props.updateCards("pass", props.id);
    }

    function tableDirective() {
        props.updateCards("table", props.id);
    }

    function failDirective() {
        props.updateCards("fail", props.id);
    }

    return (
        <div className="card-container" style={{ marginRight: props.variant == "history"? 0 : 20 }}>
            {props.variant == "inbox" && 
                <div className="card-operations">
                    <div className="btt-pass" onClick={passDirective}>
                        <BsCheckLg size={20}/>
                    </div>
                    <div className="btt-fail" onClick={failDirective}>
                        <BsXLg size={20}/>
                    </div>
                    <div className="btt-table" onClick={tableDirective}>
                        <IoIosFastforward size={25}/>
                    </div>
                </div>
            }

            {props.variant == "history" &&
                <div className="card-operations">
                    <div className="btt-revert" onClick={() => {props.revertDirective(props.index)}}>
                        <p className="btt-revert-text">Revert to Inbox</p>
                        <BiUndo size={20}/>
                    </div>
                </div>
            }

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