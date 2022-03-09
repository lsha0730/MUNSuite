import React, { useEffect, useState } from "react";
import "./PreviewComponents.scoped.css";
import { GoTriangleDown, GoSearch } from "react-icons/go";

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
    const [selected, setSelected] = useState(); // Stores the index of selected in props.options
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
                        className="clickable"
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
    const [selected, setSelected] = useState([]); // Stores the indices of selected in props.options
    const [renders, setRenders] = useState([]);

    function handleClick(e) {
        let optionVal = parseInt(e.target.value);
        if (selected.includes(optionVal)) {
            setSelected(selected.filter(item => {
                return item !== optionVal;
            }))
        } else {
            setSelected(selected.concat(optionVal));
        }
    }

    useEffect(() => {
        let i = -1;
        setRenders(props.options.map(option => {
            i++;
            return (
                <div className="mc-single-container">
                    <input type="checkbox" value={i}
                        checked={selected.includes(i)}
                        onChange={e => handleClick(e)}
                        className="clickable"
                    />
                    <p className="mc-option-label">{option}</p>
                </div>
            )
        }));
    }, [selected, props.options])

    return (
        <div className="block-container">
            <p className="heading">{props.heading}</p>
            <p className="subheading">{props.subheading}</p>
            <p className={props.required? "required-star":"hidden"}>*</p>
            <div className="mc-options-container">
                {renders}
            </div>
        </div>
    )
}

function Content(props) {
    let contentRenders = [];
    for (let i=0; i<props.content.length; i++) {
        let itemObj = props.content[i];
        switch (itemObj.type) {
            case "text":
                contentRenders.push(
                    <div className="content-item-container">
                        <p className="content-heading">{itemObj.heading}</p>
                        <p>{itemObj.value}</p>
                    </div>);
                break;
            case "image":
                contentRenders.push(
                    <div className="content-item-container">
                        <p className="content-heading">{itemObj.heading}</p>
                        <div>
                            <img src={itemObj.value} alt="Content Image" className="content-image"/>
                        </div>
                    </div>);
        }
    }

    return (
        <div className="block-container">
            <p className="heading">{props.heading}</p>
            <p className="subheading">{props.subheading}</p>
            <p className={props.required? "required-star":"hidden"}>*</p>
            {contentRenders}
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
    const [value, setValue] = useState(); // Stores the index of the item in props.options
    const [dropVisible, setDropVisible] = useState(false);
    const [dropRender, setDropRender] = useState();

    let optionRenders = [];
    for (let i=0; i<props.options.length; i++) {
        let option = props.options[i];
        optionRenders.push(
            <div className="dropdown-option-container" onClick={() => {
                setDropVisible(!dropVisible);
                setValue(i);
                }}>
                <div className="dropdown-text-container">
                    <p className="nowrap">{option}</p>
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (dropVisible) {
            setDropRender(
                <div className="dropdown-field">
                    {optionRenders}
                </div>
            );
        } else {
            setDropRender();
        }
    }, [dropVisible])

    return (
        <div className="block-container">
            <div className={dropVisible? "dropdown-defocuser":"hidden"} onClick={() => setDropVisible(false)}></div>
            <p className="heading">{props.heading}</p>
            <p className="subheading">{props.subheading}</p>
            <p className={props.required? "required-star":"hidden"}>*</p>
            <div className={dropVisible? "dropdown-bar super-z":"dropdown-bar"} onClick={() => setDropVisible(!dropVisible)}>
                <div className="dropdown-text-container">
                    <p className="nowrap">{props.options[value]}</p>
                </div>
                <GoTriangleDown size={10} className="dropdown-triangle"/>
                {dropRender}
            </div>
        </div>
    )
}


function SelectMultiple(props) {
    const [options, setOptions] = useState(props.options);
    const [search, setSearch] = useState('');
    const [renderOptions, setRenderOptions] = useState([]);
    const [isShowingOptions, setIsShowingOptions] = useState(false);
    const [selected, setSelected] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [renderSelected, setRenderSelected] = useState([]);
    const [maxWarning, setMaxWarning] = useState(false);

    const selectOption = (option) => {
        if (selected.length < props.max || !props.max) {
            let currentSelected = selected;
            let currentOptions = options;
            
            currentOptions.splice(currentOptions.indexOf(option), 1);
            currentSelected.push(option);
            
            setSelected(currentSelected);
            setOptions(currentOptions)
    
            setIsShowingOptions(false)
            setTrigger(!trigger);
        } else {
            setMaxWarning(true);
            setTimeout(() => setMaxWarning(false), 3000);
        }
    }

    const deselectOption = (option) => {
        let currentSelected = selected;
        let currentOptions = options;

        currentSelected.splice(currentSelected.indexOf(option), 1);
        currentOptions.push(option);

        setSelected(currentSelected);
        setOptions(currentOptions);

        setTrigger(!trigger);
    }

    // for rendering options
    useEffect(() => {
        setOptions(options.sort((a, b) => a.localeCompare(b)));
        let renderArray = [];

        for(let i = 0; i < options.length; i++) {
            if(search === "" || options[i].toLowerCase().includes(search.toLowerCase())) {
                renderArray.push(
                    <div className="dropdown-option-container" onClick={()=>{
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

        for(let j = 0; j < selected.length; j++) {
            returnRenderSelected.push(
                <div onClick={()=>deselectOption(selected[j])} className="selmult-selection">
                    <p>-  {selected[j]}</p>
                </div>
            );
        }

        setRenderSelected(returnRenderSelected)

    }, [search, isShowingOptions, selected, trigger])

    return (
        <div className="block-container">
            <div className={isShowingOptions? "dropdown-defocuser":"hidden"} onClick={() => setIsShowingOptions(false)}></div>
            <p className="heading">{props.heading}</p>
            <p className="subheading">{props.subheading}</p>
            <p className={props.required? "required-star":"hidden"}>*</p>
            <div className={renderSelected.length==0? "hidden":"selmult-selections-container"}>
                {renderSelected}
            </div>
            <p className={maxWarning? "selmult-max-warning":"selmult-max-warning fade"}>You have selected the maximum number of selections.</p>
            <div className={isShowingOptions? "selmult-searchbar super-z":"selmult-searchbar"}>
                <input    
                  type="text" 
                  placeholder="Search" 
                  className="selmult-subbar"
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                  onFocus={() => setIsShowingOptions(true)} />
                <GoSearch size={15} className="selmult-icon"/>
                <div className={!isShowingOptions||(options.length === 0)? "hidden":"selmult-drop-field"}>
                    {isShowingOptions && renderOptions}
                </div>
            </div>
        </div>
    )
}


export { Header, Radio, MultipleChoice, Content, ShortText, LongText, Dropdown, SelectMultiple };