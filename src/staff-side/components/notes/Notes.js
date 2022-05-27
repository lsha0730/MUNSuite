import React, { useEffect, useState, useContext } from "react";
import "./Notes.scoped.css";
import { BsPersonFill } from "react-icons/bs";
import { IoClipboard } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { appContext } from "../../staffContext";

function Notes() {
    const {delegations} = useContext(appContext);
    const {notes} = useContext(appContext);
    const {writeToFirebase} = useContext(appContext);
    const [notesIndvRenders, setNotesIndvRenders] = useState([]);
    const [options, setOptions] = useState(notes.individual.map(item => item.delegate));
    const [search, setSearch] = useState('');
    const [renderOptions, setRenderOptions] = useState([]);
    const [isShowingOptions, setIsShowingOptions] = useState(false);
    const [selected, setSelected] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [renderSelected, setRenderSelected] = useState([]);

    // Keeps notes in sync with delegations list
    useEffect(() => {
        // Updating list of notes
        let newDels = delegations.slice().map(item => item.name);
        let oldNotes = notes.individual.slice();
        let oldDels = oldNotes.map(item => item.delegate);
        let newNotes = newDels.map(delegate => {return {name: delegate}});

        newNotes = newNotes.map(note => {
            if (oldDels.includes(note.name)) {
                return oldNotes[oldDels.indexOf(note.name)];
            } else {
                return {
                    delegate: note.name,
                    text: ""
                }
            }
        })

        writeToFirebase("notes", {
            individual: newNotes,
            quick: notes.quick
        });

        // Updating queue options & selecteds
        let finalDels = newNotes.map(note => note.delegate);
        setOptions(finalDels.filter(item => !selected.includes(item)));
        setSelected(selected.filter(item => finalDels.includes(item)));
    }, [delegations])

    // for rendering options
    useEffect(() => {
        let renderArray = [];
        for(let i = 0; i < options.length; i++) {
            if(search === "" || options[i].toLowerCase().includes(search.toLowerCase())) {
                renderArray.push(
                    <div className="dropdown-option-container" onClick={() => {
                        selectOption(options[i])
                        setIsShowingOptions(false)}}>
                        <div className="dropdown-text-container">
                            {options[i]}
                        </div>
                    </div>
                )
            }
        }
        setRenderOptions(renderArray);

        
        let returnRenderSelected = [];
        for (let j = 0; j < selected.length; j++) {
            returnRenderSelected.push(
                <div onClick={()=>deselectOption(selected[j])} className="selection">
                    <p>-  {selected[j]}</p>
                </div>
            );
        }
        setRenderSelected(returnRenderSelected);
    }, [options, search, isShowingOptions, selected, trigger])

    useEffect(() => {
        let tempArr = [];
        for (let i=0; i<notes.individual.length; i++) {
            let note = notes.individual[i];
            if (selected.length == 0 || selected.includes(note.delegate)) {
                tempArr.push(
                    <div className="noteblock-container">
                        <p className="noteblock-title">{note.delegate}</p>
                        <textarea id={`textfield ${note.id}`} type="text" defaultValue={note.text} placeholder="Input here..." className="noteblock-textfield" onChange={() => updateNotes(note.id, document.getElementById(`textfield ${note.id}`).value)}></textarea>
                    </div>
                )
            }
        }
        setNotesIndvRenders(tempArr);
    }, [selected.length, notes.individual])

    return (
        <div className="page-container">
            <div className="UI-left">
                <div className="UI-left-top">
                    <div className="header-pair">
                        <BsPersonFill className="header-icon"/>
                        <p className="header-text">Individual Notes</p>
                    </div>

                    <div className={isShowingOptions? "dropdown-defocuser":"hidden"} onClick={() => setIsShowingOptions(false)}></div>
                    <div className={isShowingOptions? "searchbar super-z":"searchbar"}>
                        <input type="text" placeholder="Search" className="subbar" value={search} onChange={(e)=>setSearch(e.target.value)} onFocus={() => setIsShowingOptions(true)}/>
                        <GoSearch size={15} className="icon"/>
                        <div className={!isShowingOptions||(options.length === 0)? "hidden":"drop-field"}>
                            <div className="subdropfield">
                                {isShowingOptions && renderOptions}
                            </div>
                        </div>
                    </div>
                    <div className={renderSelected.length==0? "hidden":"selections-container"}>
                        {renderSelected}
                    </div>

                </div>

                <div className="notes-container">
                    {notesIndvRenders.length != 0? notesIndvRenders:<div className="no-notes-box">No delegates in committee</div>}
                </div>
            </div>

            <div className="UI-right">
                <div className="header-pair">
                    <IoClipboard className="header-icon"/>
                    <p className="header-text">Quick Notes</p>
                </div>

                <textarea id="quicknotes-input" type="text" placeholder="Input here..." defaultValue={notes.quick} onChange={e => writeToFirebase("notes", {individual: notes.individual, quick: (e.target.value)})} className="UI-right-input"></textarea>
            </div>
        </div>
    )

    function updateNotes(index, newText) {
        let tempArr = notes.individual.slice();
        tempArr[index].text = newText;
        writeToFirebase("notes",
        {
            individual: tempArr,
            quick: notes.quick
        });
    }

    function selectOption (option) {
        let currentSelected = selected;
        let currentOptions = options;
        
        currentOptions.splice(currentOptions.indexOf(option), 1);
        currentSelected.push(option);
        
        setSelected(currentSelected);
        setOptions(currentOptions)

        setIsShowingOptions(false)
        setTrigger(!trigger);
    }

    function deselectOption (option) {
        let currentSelected = selected;
        let currentOptions = options;

        currentSelected.splice(currentSelected.indexOf(option), 1);
        currentOptions.push(option);

        setSelected(currentSelected);
        setOptions(currentOptions);

        setTrigger(!trigger);
    }
}


export default Notes;