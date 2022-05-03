import React, { useEffect, useState } from "react";
import "./Notes.scoped.css";
import { BsPersonFill } from "react-icons/bs";
import { IoClipboard } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import MockNotes from "./MockNotes.js";

function Notes() {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || MockNotes);
    const [notesRenders, setNotesRenders] = useState();
    const [search, setSearch] = useState('');

    useEffect(() => {
        let tempArr = [];
        for (let i=0; i<notes.length; i++) {
            let note = notes[i];
            tempArr.push(
                <div className="noteblock-container">
                    <p className="noteblock-title">{note.delegate}</p>
                    <textarea type="text" placeholder="Input here..." className="noteblock-textfield"></textarea>
                </div>
            )
        }

        setNotesRenders(tempArr);
    }, [notes])

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
        dispatchEvent(new Event("notes updated"));
    }, [notes])

    return (
        <div className="page-container">
            <div className="UI-left">
                <div className="UI-left-top">
                    <div className="header-pair">
                        <BsPersonFill className="person-icon"/>
                        <p className="header-text">Individual Notes</p>
                    </div>

                    <div className="searchbar">
                        <input type="text" placeholder="Search" className="subbar" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                        <GoSearch size={15} className="search-icon"/>
                    </div>
                </div>

                <div className="notes-container">
                    {notesRenders}
                </div>
            </div>

            <div className="UI-right">
                <div className="header-pair">
                    <IoClipboard className="person-icon"/>
                    <p className="header-text">Quick Notes</p>
                </div>

                <textarea type="text" placeholder="Input here..." className="UI-right-input"></textarea>
            </div>
        </div>
    )
}


export default Notes;