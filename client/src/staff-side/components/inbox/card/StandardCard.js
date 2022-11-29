import React, { useEffect, useState } from "react";
import "./StandardCard.scoped.css"
import { BsPeopleFill, BsEyeglasses, BsCheckLg, BsXLg } from "react-icons/bs";
import { IoIosFastforward } from "react-icons/io";
import { BiUndo } from "react-icons/bi";

function StandardCard(props) {
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
                <div className="card-top-top">
                    <p className="title">{props.title}</p>
                </div>

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
    )
}

export default StandardCard