import React, { useState, useEffect, useContext } from "react";
import "./Sidebar.css";
import { pageContext } from "../../Context.js";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io"
import { IconContext } from "react-icons";

function Sidebar() {
    const {page, setPage} = useContext(pageContext);
    const [indOffset, setIndOffset] = useState(100);

    var resizeTimeout;
    window.onresize = () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            if (page === "settings") {
                setIndOffset(window.innerHeight - 95);
            } else {
                setIndOffset(indOffset);
            }
        }, 100);
    }

    useEffect(() => {
        const base = 55;
        const diff = 68;

        switch(page) {
            case "delegations": setIndOffset(base); break;
            case "editor": setIndOffset(base + diff); break;
            case "inbox": setIndOffset(base + diff*2); break;
            case "history": setIndOffset(base + diff*3); break;
            case "statistics": setIndOffset(base + diff*4); break;
            case "notes": setIndOffset(base + diff*5); break;
            case "settings": setIndOffset(window.innerHeight - 95); break;
            default: return setIndOffset(base);
        }
    }, [page])
    
    return (
        <div className="Sidebar-container">
            <div className="Sidebar-subcontainer">
                <div className="Sidebar-topicons">
                    <div className="Sidebar-option" onClick={() => {setPage("delegations")}}>
                        <IconContext.Provider value={{color: "BCBCBC"}}>
                            <BsIcons.BsPeopleFill size={25} className={page==="delegations"? "active":"inactive"}/>
                        </IconContext.Provider>
                    </div>

                    <div className="Sidebar-option" onClick={() => {setPage("editor")}}>
                        <IconContext.Provider value={{color: "BCBCBC"}}>
                            <BsIcons.BsPencilFill size={25} className={page==="editor"? "active":"inactive"}/>
                        </IconContext.Provider>
                    </div>
                    
                    <div className="Sidebar-option" onClick={() => {setPage("inbox")}}>
                        <IconContext.Provider value={{color: "BCBCBC"}}>
                            <BsIcons.BsInboxFill size={25} className={page==="inbox"? "active":"inactive"}/>
                        </IconContext.Provider>
                    </div>

                    <div className="Sidebar-option" onClick={() => {setPage("history")}}>
                        <IconContext.Provider value={{color: "BCBCBC"}}>
                            <BsIcons.BsClockFill size={23} className={page==="history"? "active":"inactive"}/>
                        </IconContext.Provider>
                    </div>

                    <div className="Sidebar-option" onClick={() => {setPage("statistics")}}>
                        <IconContext.Provider value={{color: "BCBCBC"}}>
                            <BsIcons.BsBarChartFill size={25} className={page==="statistics"? "active":"inactive"}/>
                        </IconContext.Provider>
                    </div>

                    <div className="Sidebar-option" onClick={() => {setPage("notes")}}>
                        <IconContext.Provider value={{color: "BCBCBC"}}>
                            <IoIcons.IoIosJournal size={28} className={page==="notes"? "active":"inactive"}/>
                        </IconContext.Provider>
                    </div>
                </div>
                
                <div className="Sidebar-boticons">
                    <div className="Sidebar-option" onClick={() => {setPage("settings")}}>
                        <IconContext.Provider value={page==="settings"? {color: "3C8CC9"} : {color: "BCBCBC"}}>
                            <BsIcons.BsGearFill size={25}/>
                        </IconContext.Provider>
                    </div>
                </div>
            </div>

            <div className="Sidebar-indicator" style={{top: indOffset}}></div>
        </div>
    )
}

export default Sidebar;