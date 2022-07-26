import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scoped.css";

import formTab from "./images/form-tab.png";
import inboxTab from "./images/inbox-tab.png";

import delside from "./images/delside.png";
import delegations from "./images/delegations.png";
import form from "./images/form.png";
import inbox from "./images/inbox.png";
import history from "./images/history.png";
import statistics from "./images/statistics.png";
import notes from "./images/notes.png";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { ImFontSize, ImSearch } from "react-icons/im";
import { FaHistory } from "react-icons/fa";
import { GoGraph } from "react-icons/go";

function Home() {
    const adwords = ["Simplified", "Modernized", "Streamlined", "Innovated", "Reimagined"]
    const [adwordIndex, setAdwordIndex] = useState(0);
    const bruh = useRef(false);

    useEffect(() => {
        setTimeout(() => {bruh.current = true}, 1000);
    }, [])

    useEffect(() => {
        if (bruh.current) {
            setTimeout(
                () => {setAdwordIndex(null)},
                4000
            )
        }
        setTimeout(
            () => {setAdwordIndex(adwordIndex == adwords.length - 1 ? 0 : adwordIndex + 1)},
            4000
        )
    }, [adwordIndex])

    return (
        <div className="home-container">
            {/*Top Section*/}
            <div className="home-top">
                <div className="top-gradient"></div>
                <div className="home-top-container">
                    <div className="top-left">
                        <img src={inboxTab} alt="Inbox Page Preview" className="mockup-inbox"/>
                        <img src={formTab} alt="Form Page Preview" className="mockup-form"/>
                    </div>
                    <div className="top-right">
                        <p className="top-heading">MUN<br/>Directives,<br/><p className="adword">{adwords[adwordIndex]}.</p></p>
                        <p className="top-subheading">The 21st century solution to directive chaos</p>
                        <Link to="/options" className="btt-get-started">Get started</Link>
                    </div>
                </div>
            </div>

            {/*Features Section*/}
            <div className="home-features">
                <div className="home-feature-group-imgText">
                    <img src={delside} alt="Delegate Side UI Image" className="features-image"/>
                    <div className="feature-text-group">
                        <div className="features-icon-heading-group">
                            <BsFillPersonLinesFill size={50} className="features-icon"/>
                            <p className="feature-text-heading">Personalized Delegate Dashboards.</p>
                        </div>
                        <p className="feature-text-subheading">Directive status communication, a submission history, and password gating.</p>
                    </div>
                </div>

                <div className="home-feature-group-textImg">
                    <div className="feature-text-group">
                        <div className="features-icon-heading-group">
                            <ImFontSize size={50} className="features-icon"/>
                            <p className="feature-text-heading">Directives You Can Actually Read.</p>
                        </div>
                        <p className="feature-text-subheading">And a form shutoff for when things get a little <br/> too crazy.</p>
                    </div>
                    <img src={inbox} alt="Inbox UI Image" className="features-image"/>
                </div>

                <div className="home-feature-group-imgText">
                    <img src={history} alt="History UI Image" className="features-image"/>
                    <div className="feature-text-group">
                        <div className="features-icon-heading-group">
                            <FaHistory size={50} className="features-icon"/>
                            <p className="feature-text-heading">A Directives History Page.</p>
                        </div>
                        <p className="feature-text-subheading">This time when you leave your desk, the whole pile won't just disappear.</p>
                    </div>
                </div>

                <div className="home-feature-group-textImg">
                    <div className="feature-text-group">
                        <div className="features-icon-heading-group">
                            <GoGraph size={50} className="features-icon"/>
                            <p className="feature-text-heading">Auto-collected Delegate Statistics.</p>
                        </div>
                        <p className="feature-text-subheading">Automatically curated, to show who's putting money where their mouth is.</p>
                    </div>
                    <img src={statistics} alt="Inbox UI Image" className="features-image"/>
                </div>

                <div className="home-feature-group-imgText">
                    <img src={notes} alt="Statistics UI Image" className="features-image"/>
                    <div className="feature-text-group">
                        <div className="features-icon-heading-group">
                            <ImSearch size={50} className="features-icon"/>
                            <p className="feature-text-heading">Searchable Notes for Every Delegate.</p>
                        </div>
                        <p className="feature-text-subheading">Evaluate and compare delegates with a dedicated UI. No more scribbled papers.</p>
                    </div>
                </div>
            </div>

            {/*Let's Modernize Model UN.*/}
            <div className="home-modernize">
                <img src={delegations} alt="Delegations UI Image" className="modernize-image" style={{position: "absolute", top: "-70px", left: "200px"}}/>
                <img src={form} alt="Form UI Image" className="modernize-image" style={{position: "absolute", bottom: "-50px", left: "0px"}}/>
                <img src={history} alt="History UI Image" className="modernize-image" style={{position: "absolute", bottom: "-100px", right: "200px"}}/>
                <img src={statistics} alt="Statistics UI Image" className="modernize-image" style={{position: "absolute", top: "-120px", left: "-20px"}}/>
                <img src={notes} alt="Notes UI Image" className="modernize-image" style={{position: "absolute", bottom: "0px", right: "-100px"}}/>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <p className="modernize-header">Let's Modernize Model UN.</p>
                    <Link to="/options" className="btt-see-options">See Options</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;