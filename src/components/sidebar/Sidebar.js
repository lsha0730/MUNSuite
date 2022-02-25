import React, { useState } from "react";
import "./Sidebar.css";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io"
import {IconContext} from "react-icons";

function Sidebar() {
    //const [page, setPage] = useState("delegations");
    function setPage() {}
    
    return (
        <div className="Sidebar-container">
            <div className="Sidebar-topicons">
                <div className="Sidebar-option" onClick={setPage("delegations")}>
                    <IconContext.Provider value={{color: "BCBCBC"}}>
                        <BsIcons.BsPeopleFill size={25}/>
                    </IconContext.Provider>
                </div>

                <div className="Sidebar-option" onClick={setPage("editor")}>
                    <IconContext.Provider value={{color: "BCBCBC"}}>
                        <BsIcons.BsPencilFill size={25}/>
                    </IconContext.Provider>
                </div>
                
                <div className="Sidebar-option" onClick={setPage("inbox")}>
                    <IconContext.Provider value={{color: "BCBCBC"}}>
                        <BsIcons.BsInboxFill size={25}/>
                    </IconContext.Provider>
                </div>

                <div className="Sidebar-option" onClick={setPage("history")}>
                    <IconContext.Provider value={{color: "BCBCBC"}}>
                        <BsIcons.BsClockFill size={23}/>
                    </IconContext.Provider>
                </div>

                <div className="Sidebar-option" onClick={setPage("statistics")}>
                    <IconContext.Provider value={{color: "BCBCBC"}}>
                        <BsIcons.BsBarChartFill size={25}/>
                    </IconContext.Provider>
                </div>

                <div className="Sidebar-option" onClick={setPage("notes")}>
                    <IconContext.Provider value={{color: "BCBCBC"}}>
                        <IoIcons.IoIosJournal size={28}/>
                    </IconContext.Provider>
                </div>
            </div>
            
            <div className="Sidebar-boticons">
                <div className="Sidebar-option" onClick={setPage("settings")}>
                    <IconContext.Provider value={{color: "BCBCBC"}}>
                        <BsIcons.BsGearFill size={25}/>
                    </IconContext.Provider>
                </div>
            </div>

        </div>
    )
}

export default Sidebar;