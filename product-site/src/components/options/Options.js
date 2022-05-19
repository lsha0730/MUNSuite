import React from "react";
import "./Options.scoped.css";

function Options() {
    return (
        <div className="options-container">
            <div className="top">
                <div className="top-container">
                    <p className="header">Almost there!</p>

                    <div className="cards-container">
                        <div className="card">
                            <div className="card-tie" style={{backgroundColor: "#EAEAEA"}}>
                                <div className="card-tie-left">
                                    <p className="card-heading" style={{color:"#707070"}}>Demo</p>
                                    <p className="card-subheading" style={{color:"#707070"}}>Try it out</p>
                                </div>
                                <p className="price-tag" style={{color:"#707070"}}>$0</p>
                            </div>

                            <div className="card-body">
                                <ul className="items-list">
                                    <li>50 submissions</li>
                                    <li>Email support</li>
                                </ul>

                                <div className="btt-demo">Try the Demo</div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-tie" style={{backgroundColor: "#4A687F"}}>
                                <div className="card-tie-left">
                                    <p className="card-heading" style={{color:"#FFFFFF"}}>Full Access</p>
                                    <p className="card-subheading" style={{color:"#FFFFFF"}}>Goodbye headaches</p>
                                </div>

                                <div>
                                    <p className="price-tag" style={{color:"#FFFFFF"}}>$5</p>
                                    <p className="price-subtag" style={{color:"#FFFFFF"}}>/2 mo</p>
                                </div>
                            </div>

                            <div className="card-body">
                                <ul className="items-list">
                                    <li>Infinite submissions</li>
                                    <li>See previous directives</li>
                                    <li>Auto-collected statistics</li>
                                    <li>Searchable notepad</li>
                                    <li>Spreadsheet import delegates</li>
                                    <li>CSV export delegate codes</li>
                                    <li>Messaging support</li>
                                </ul>

                                <div className="btt-full">Get Started</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottom">
                <div className="bottom-container">
                    <p className="bottom-header">Payment Details</p>
                    <ul className="items-list">
                        <div className="nowrap"><li>This is</li><p style={{fontWeight: "600"}}>&nbsp;not a subscription&nbsp;</p><p>and you will not be billed more than once.</p></div>
                        <li>Upon payment, you will receive an email receipt and your redeemable code(s).</li>
                        <li>Codes do not expire and are valid for 2 months after they are redeemed.</li>
                        <li>All sales are final.</li>
                    </ul>
                    <p className="bottom-disclaimer">All payments are handled securely using&nbsp;<p className="red-highlight">Stripe.</p></p>
                </div>
            </div>
        </div>
    )
}

export default Options;