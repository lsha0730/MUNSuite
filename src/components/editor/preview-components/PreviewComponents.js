import React from "react";
import "./PreviewComponents.scoped.css";

function Header(props) {
    return (
        <div className="header-container">
            <div className="header-image-container">
                <img src={props.image} className="header-image"/>
            </div>
            <div className="header-text-container">
                <p className="header-heading">{props.heading}</p>
                <p className="header-subheading">{props.subheading}</p>
            </div>
        </div>
    )
}

function Radio(props) {
    return (
        <div className="radio-container">
            <p>Radio</p>
        </div>
    )
}

function MultipleChoice(props) {
    return (
        <div className="multiplechoice-container">
            <p>Multiple Choice</p>
        </div>
    )
}

function Content(props) {
    return (
        <div className="content-container">
            <p>Content</p>
        </div>
    )
}

function ShortText(props) {
    return (
        <div className="shorttext-container">
            <div className="shorttext-subcontainer">
                <p className="shorttext-heading">{props.heading}</p>
                <p className="shorttext-subheading">{props.subheading}</p>
                <input type="text" placeholder="Input here..." className="shorttext-input"></input>
            </div>
        </div>
    )
}

function LongText(props) {
    return (
        <div className="longtext-container">
            <div className="longtext-subcontainer">
                <p className="longtext-heading">{props.heading}</p>
                <p className="longtext-subheading">{props.subheading}</p>
                <input type="text" placeholder="Input here..." className="longtext-input"></input>
            </div>
        </div>
    )
}

function Dropdown(props) {
    return (
        <div className="dropdown-container">
            <p>Dropdown</p>
        </div>
    )
}


function DropdownMultiple(props) {
    return (
        <div className="dropdown-multiple-container">
            <p>Dropdown Multiple</p>
        </div>
    )
}


export { Header, Radio, MultipleChoice, Content, ShortText, LongText, Dropdown, DropdownMultiple };