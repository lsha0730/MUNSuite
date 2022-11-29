import React, { useState, useEffect } from "react";
import "./Popout.scoped.css";
import { BsEyeglasses, BsPeopleFill, BsPersonFill } from "react-icons/bs";
import NewWindow from "react-new-window";

function Popout({ variant, body, id, signatories, title, type, sponsors, author }) {
    const [bodyRenders, setBodyRenders] = useState();

    useEffect(() => {
        setBodyRenders(body.map(block => {
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
        <NewWindow>
            {variant == "custom" &&
                <div className="custom-top">
                    <BsPersonFill size={30} className="custom-icon"/>
                    <p className="author">{author}</p>
                    <p className="custom-id-tag">ID: {id}</p>
                </div>
            }

            {variant == "standard" &&
                <div className="standard-top">
                    <div className="card-top-top">
                        <p className="title">{title}</p>
                    </div>
    
                    <div className="card-top-bottom">
                        <p className="type">{type}</p>
                        <p className="id-tag">ID: {id}</p>
                    </div>
                </div>
            }

            {variant == "standard" &&
                <div className="card-tie">
                    <div className="tie-set">
                        <BsPeopleFill size={25} className="tie-icon"/>
                        <p>{sponsors.join(", ")}</p>
                    </div>
                    {signatories && signatories.length > 0?
                        <div className="tie-set">
                            <BsEyeglasses size={30} className="tie-icon"/>
                            <p className="signatories-list">{signatories.join(", ")}</p>
                        </div>
                        : <div></div>
                    }
                </div>
            }

            <div className="card-body">
                {bodyRenders}
            </div>
        </NewWindow>
    )
}

export default Popout;