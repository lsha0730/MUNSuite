import React from "react";
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

function Home() {
    return (
        <div className="home-container">
            {/*Top Section*/}
            <div className="home-top">
                <div className="home-top-container">
                    <div className="top-left">
                        <img src={inboxTab} alt="Inbox Page Preview" className="mockup-inbox"/>
                        <img src={formTab} alt="Form Page Preview" className="mockup-form"/>
                    </div>
                    <div className="top-right">
                        <p className="top-heading">MUN<br/>Directives,<br/><p style={{color: "#47667D"}}>Simplified.</p></p>
                        <p className="top-subheading">The 21st century solution to directive chaos</p>
                    </div>
                </div>
            </div>

            {/*Features Section*/}
            <div className="home-features">
                <div className="home-feature-group-imgText">
                    <img src={delside} alt="Delegate Side UI Image" className="features-image"/>
                    <div className="feature-text-group">
                        <p className="feature-text-heading">Personalized Delegate Dashboards.</p>
                        <p className="feature-text-subheading">Directive status communication, submission history tab, and password gating.</p>
                    </div>
                </div>

                <div className="home-feature-group-textImg">
                    <div className="feature-text-group">
                        <p className="feature-text-heading">Directives You Can Actually Read.</p>
                        <p className="feature-text-subheading">And a form shutoff for when things get a little crazy.</p>
                    </div>
                    <img src={inbox} alt="Inbox UI Image" className="features-image"/>
                </div>

                <div className="home-feature-group-imgText">
                    <img src={statistics} alt="Statistics UI Image" className="features-image"/>
                    <div className="feature-text-group">
                        <p className="feature-text-heading">Auto-collected Delegate Statistics.</p>
                        <p className="feature-text-subheading">Automatically curated, to show who is putting money where their mouth is.</p>
                    </div>
                </div>

                <div className="home-feature-group-textImg">
                    <div className="feature-text-group">
                        <p className="feature-text-heading">Searchable Notes for Every Delegate.</p>
                        <p className="feature-text-subheading">Take notes on every delegate and filter to compare specific delegates.</p>
                    </div>
                    <img src={notes} alt="Notes UI Image" className="features-image"/>
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