import React, { useEffect, useState } from "react";
import "./PreviewComponents.scoped.css";

function Header(props) {
    return (
        <div className="header-container">
            <div className="header-image-container">
                <img src={props.image} alt="form-banner" className="header-image"/>
            </div>
            <div className="header-text-container">
                <p className="header-heading">{props.heading}</p>
                <p className="header-subheading">{props.subheading}</p>
            </div>
        </div>
    )
}

function Radio(props) {
    const [selected, setSelected] = useState();
    const [renders, setRenders] = useState([]);

    useEffect(() => {
        let i = -1;
        setRenders(props.options.map(option => {
            i++;
            return (
                <div className="radio-single-container">
                    <input type="radio" value={i}
                        checked={selected==i}
                        onChange={e => {setSelected(e.target.value)}}
                        className="radio-button"
                    />
                    <p className="radio-option-label">{option}</p>
                </div>
            )
        }));
    }, [selected, props.options])

    return (
        <div className="block-container">
            <p className="heading">{props.heading}</p>
            <p className="subheading">{props.subheading}</p>
            <p className={props.required? "required-star":"hidden"}>*</p>
            <div className="radio-options-container">
                {renders}
            </div>
        </div>
    )
}

function MultipleChoice(props) {
    return (
        <div className="block-container">
            <p className="heading">{props.heading}</p>
            <p className="subheading">{props.subheading}</p>
            <p className={props.required? "required-star":"hidden"}>*</p>
        </div>
    )
}

function Content(props) {
    return (
        <div className="block-container">
            <p className="heading">{props.heading}</p>
            <p className="subheading">{props.subheading}</p>
            <p className={props.required? "required-star":"hidden"}>*</p>
        </div>
    )
}

function ShortText(props) {
    return (
        <div className="block-container">
            <p className="heading">{props.heading}</p>
            <p className="subheading">{props.subheading}</p>
            <p className={props.required? "required-star":"hidden"}>*</p>
            <input type="text" placeholder="Input here..." className="shorttext-input"></input>
        </div>
    )
}

function LongText(props) {
    return (
        <div className="block-container">
            <p className="heading">{props.heading}</p>
            <p className="subheading">{props.subheading}</p>
            <p className={props.required? "required-star":"hidden"}>*</p>
            <textarea type="text" placeholder="Input here..." className="longtext-input"></textarea>
        </div>
    )
}

function Dropdown(props) {
    const [optionElems, setOptionElems] = useState([]);

    useEffect(() => {
        let i = -1;
        setOptionElems([<option value="default"></option>].concat(props.options.map(option => {
            i++;
            return <option value={i}>{option}</option>
        })))
    }, [props.options])

    return (
        <div className="block-container">
            <p className="heading">{props.heading}</p>
            <p className="subheading">{props.subheading}</p>
            <p className={props.required? "required-star":"hidden"}>*</p>
            <select className="dropdown-box">
                {optionElems}
            </select>
        </div>
    )
}


function DropdownMultiple(props) {
    return (
        <div className="block-container">
            <p className="heading">{props.heading}</p>
            <p className="subheading">{props.subheading}</p>
            <p className={props.required? "required-star":"hidden"}>*</p>
        </div>
    )
}


export { Header, Radio, MultipleChoice, Content, ShortText, LongText, Dropdown, DropdownMultiple };