import React, { useState, useEffect, useContext, useRef } from "react";
import { appContext } from "../../Context";
import './Dashboard.scoped.css';
import defaultBanner from "./defaultBanner.png";

import Header from "./form-components/Header.js";
import Radio from "./form-components/Radio.js";
import MultipleChoice from "./form-components/MultipleChoice.js";
import Content from "./form-components/Content.js";
import ShortText from "./form-components/ShortText.js";
import LongText from "./form-components/LongText.js";
import Dropdown from "./form-components/Dropdown.js";
import SelectMultiple from "./form-components/SelectMultiple.js";
import CustomCard from "./history-components/CustomCard";
import StandardCard from "./history-components/StandardCard";

import { HiPaperAirplane } from "react-icons/hi";
import { FaHistory } from "react-icons/fa";

function Dashboard(props) {
    const {delegations} = useContext(appContext);
    const {form} = useContext(appContext);
    const {pendings} = useContext(appContext);
    const {processed} = useContext(appContext);
    const {settings} = useContext(appContext);
    const {user} = useContext(appContext);

    const [formRender, setFormRender] = useState();
    const [submission, setSubmission] = useState(form.map(item => {return { type: item.type, heading: item.heading }}));
    const [submissionComplete, setSubmissionComplete] = useState(false);
    const [showingIncompleteWarning, setShowingIncompleteWarning] = useState(false);
    const [notImpostor, setNotImpostor] = useState(false);
    const [showingImpostorWarning, setShowingImpostorWarning] = useState(false);
    const [showingConfirmation, setShowingConfirmation] = useState(false);

    const [relevantDirectives, setRelevantDirectives] = useState([]);
    const [historyRender, setHistoryRender] = useState();

    useEffect(() => {
        rerenderForm();
    }, [form, settings, delegations])

    useEffect(() => {
        setRelevantDirectives((pendings || []).concat(getReversed(processed || [])).filter(item => {
            if (item == undefined) return false;
            if (item.standard) {
                return item.sponsors.includes(user) || item.author == user;
            } else {
                return item.author == user;
            }
        }))
    }, [pendings, processed])

    useEffect(() => {
        rerenderHistory();
    }, [relevantDirectives])

    // useEffect(() => { // Debugging
    //     console.log(form)
    //     console.log(prevForm.current)
    // }, [prevForm.current])

    useEffect(() => {
        setSubmissionComplete(
            submission.every((item, index) => {
                let valid = true;
                if (form[index].required) {
                    if (item.value == undefined || item.value == null) return false;
                    if (item.type == "select-multiple" || item.type == "multiplechoice") {
                        valid = item.value.length != 0;
                    } else if (item.type == "radio" || item.type == "shorttext" || item.type == "longtext" || item.type == "dropdown") {
                        valid = item.value != "";
                    }
                }
                return valid;
            })
        )

        setNotImpostor(() => {
            if ((submission.length > 3) && submission[3].value && checkStandardized(form)) {
                return submission[3].value.includes(user);
            } else {
                return true; // Author does not need to be sponsor to submit to a non-standard form
            }
        })
    }, [submission])

    return (
        <div className="dashboard-container">
            <div className="UI-left">
                {showingConfirmation?
                    <div className="submission-confirmation">
                        <div className="submission-confirmation-top">
                            <HiPaperAirplane size={72} className="confirmation-icon"/>
                            <p>Submission Sent!</p>
                        </div>
                        <div className="btt-new-directive" onClick={() => {setShowingConfirmation(false)}}>Submit New Directive</div>
                    </div>
                    :
                    <div className="form-container">
                        <div className="preview-hat">
                            <p className="preview-hat-heading">{user}</p>
                            <p className="preview-hat-subheading">{settings.committee}</p>
                        </div>

                        {formRender}

                        <div className={settings.formOpen==undefined? "submit-container":`${settings.formOpen? "submit-container":"hide"}`}>
                            <p className={showingIncompleteWarning? "warning":"warning fade"}>Required fields incomplete</p>
                            <p className={showingImpostorWarning && !showingIncompleteWarning? "warning":"warning fade"}>You must be a sponsor</p>
                            <div className="btt-submit" onClick={handleSubmit}>Submit</div>
                        </div>
                    </div>
                }
            </div>

            <div className="history-container">
                <div className="history-top">
                    <div className="history-top-contents">
                        <FaHistory size={35} className="history-icon"/>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p style={{fontSize: 20, fontWeight:600, color:"#B0B0B0"}}>Relevant Submissions</p>
                            <p style={{fontSize: 14, fontWeight:600, color:"#B0B0B0"}}>Click cards to expand</p>
                        </div>
                    </div>
                </div>

                {(!historyRender || historyRender.length > 0)?
                    <div className="history-cards-container" key={JSON.stringify(historyRender)}>{historyRender}</div>
                    :<div className="history-no-submissions-block">No Submissions</div>}
            </div>
        </div>
    );

    function getReversed(array) {
        let tempArr = array.slice();
        tempArr.reverse();
        return tempArr
    }

    function rerenderHistory() {
        console.log("Hist render set!")
        setHistoryRender(relevantDirectives.map(directive => {
            if (directive.standard) {
                return <StandardCard key={JSON.stringify(relevantDirectives)} id={directive.submissionID} title={directive.title} type={directive.type} sponsors={directive.sponsors || []} signatories={directive.signatories || []} body={directive.body || []} status={directive.status}/>
            } else {
                return <CustomCard key={JSON.stringify(relevantDirectives)} id={directive.submissionID} author={directive.author} body={directive.body || []} status={directive.status}/>
            }
        }))
    }

    function rerenderForm() {
        if (settings.formOpen == undefined || settings.formOpen) {
            setFormRender(form.map(item => {
                switch (item.type) {
                    case "header":
                        return <Header key={`preview${item.id}`} id={item.id} image={item.image || defaultBanner} heading={item.heading} subheading={item.subheading}/>
                    case "radio":
                        return <Radio key={`preview${item.id}`} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options || []} updateSubmission={updateSubmission}/>
                    case "multiplechoice":
                        return <MultipleChoice key={`preview${item.id}`} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options || []} updateSubmission={updateSubmission}/>
                    case "content":
                        return <Content key={`preview${item.id}`} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} content={item.content}/>
                    case "shorttext":
                        return <ShortText key={`preview${item.id}`} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} updateSubmission={updateSubmission}/>
                    case "longtext":
                        return <LongText key={`preview${item.id}`} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} updateSubmission={updateSubmission}/>
                    case "dropdown":
                        return <Dropdown key={`preview${item.id}`} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} options={item.options || []} updateSubmission={updateSubmission}/>
                    case "select-multiple":
                        return <SelectMultiple key={item.options? item.options.length:0} id={item.id} required={item.required} heading={item.heading} subheading={item.subheading} max={item.max} options={item.options || []} updateSubmission={updateSubmission}/>
                    default:
                        console.log("Could not render form block.")
                }
            }))
        } else {
            setFormRender(
                <div className="bricked-form-container">
                    <p className="bricked-form-header">Form Suspended</p>
                    <p className="bricked-form-subheader">The Dias has temporarily suspended the form.</p>
                </div>
            )
        }
    }

    function updateSubmission(id, data) {
        let tempArr = submission.slice();
        tempArr[id].value = data;
        setSubmission(tempArr);
    }

    function handleSubmit() {
        if (submissionComplete && notImpostor) {
            let submissionObj = {
                submissionID: (pendings || []).concat(processed || []).length,
                status: "Pending",
                author: user,
                standard: checkStandardized(form)
            };
    
            if (submissionObj.standard) {
                submissionObj.title = submission[1].value;
                submissionObj.type = submission[2].value;
                submissionObj.sponsors = submission[3].value;
                submissionObj.signatories = (submission[4].value.length != 0)? submission[4].value:false;
                submissionObj.body = submission.slice(5).filter(item => {
                    return item.type != "header" && item.type != "content"});
            } else {
                submissionObj.body = submission.filter(item => {return item.type != "header" && item.type != "content"});
            }
    
            props.submit(submissionObj);
            setShowingConfirmation(true);
        } else if (!submissionComplete) {
            setShowingIncompleteWarning(true);
            setTimeout(() => setShowingIncompleteWarning(false), 2000);
        } else if (!notImpostor) {
            setShowingImpostorWarning(true);
            setTimeout(() => setShowingImpostorWarning(false), 2000);
        }

        // Clear for new form
        rerenderForm();
        setSubmission(form.map(item => {return { type: item.type, heading: item.heading }}));
    }

    function checkStandardized(formArr) {
        return (
            formArr.length >= 5 &&
            formArr[0].type == "header" &&
            formArr[1].type == "shorttext" &&
            formArr[1].heading == "Directive Title" &&
            formArr[1].required &&
            formArr[2].type == "radio" &&
            formArr[2].heading == "Directive Type" &&
            formArr[2].required &&
            formArr[3].type == "select-multiple" &&
            formArr[3].heading == "Sponsors" &&
            formArr[3].required &&
            formArr[3].options == "all-delegations" &&
            formArr[4].type == "select-multiple" &&
            formArr[4].heading == "Signatories" &&
            !formArr[4].required &&
            formArr[4].options == "all-delegations"
        )
    }
}

export default Dashboard;
