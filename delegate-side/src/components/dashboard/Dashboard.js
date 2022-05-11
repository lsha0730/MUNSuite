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

function Dashboard(props) {
    const {form} = useContext(appContext);
    const {settings} = useContext(appContext);
    const {user} = useContext(appContext);

    const prevForm = useRef();
    const [formRender, setFormRender] = useState();
    const [submission, setSubmission] = useState(form.map(item => {return { type: item.type, heading: item.heading }}));
    const [canSubmit, setCanSubmit] = useState();
    const [showingWarning, setShowingWarning] = useState(false);

    useEffect(() => {
        rerenderForm();
        prevForm.current = form;
    }, [form])

    useEffect(() => {
        console.log(form)
        console.log(prevForm.current)
    }, [prevForm.current])

    useEffect(() => {
        setCanSubmit(
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
    }, [submission])

    return (
        <div className="dashboard-container">
            <div className="form-container">

                <div className="preview-hat">
                    <p className="preview-hat-heading">{settings.committee}</p>
                    <p className="preview-hat-subheading">{user}</p>
                </div>

                {formRender}

                <div className="submit-container">
                    <p className={showingWarning? "warning":"warning fade"}>Required fields incomplete</p>
                    <div className="btt-submit" onClick={handleSubmit}>Submit</div>
                </div>

            </div>
        </div>
    );

    function rerenderForm() {
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
    }

    function updateSubmission(id, data) {
        let tempArr = submission.slice();
        tempArr[id].value = data;
        setSubmission(tempArr);
    }

    function handleSubmit() {
        if (canSubmit) {
            let submissionObj = {
                submissionID: props.submissionID,
                status: "Pending",
                author: user,
                standard: checkStandardized(form)
            };
    
            if (submissionObj.standard) {
                submissionObj.title = submission[1].value;
                submissionObj.type = submission[2].value;
                submissionObj.sponsors = submission[3].value;
                submissionObj.signatories = (submission[4].value.length != 0)? submission[4].value:false;
                submissionObj.body = submission.filter(item => {return item.type != "header" && item.type != "content"}).slice(4);
            } else {
                submissionObj.body = submission.filter(item => {return item.type != "header" && item.type != "content"});
            }
    
            props.submit(submissionObj);
            console.log(submissionObj)
        } else {
            setShowingWarning(true);
            setTimeout(() => setShowingWarning(false), 2000);
        }
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
            formArr[4].type == "select-multiple" &&
            formArr[4].heading == "Signatories" &&
            !formArr[4].required
        )
    }
}

export default Dashboard;
