import React, { useState, useEffect, useContext } from "react";
import { delContext } from "../../DelegateContext";
import "./Dashboard.scoped.css";
import defaultBanner from "./defaultBanner.png";

import Header from "../../../staff-side/components/editor/preview-components/Header";
import Radio from "../../../staff-side/components/editor/preview-components/Radio";
import MultipleChoice from "../../../staff-side/components/editor/preview-components/MultipleChoice";
import Content from "../../../staff-side/components/editor/preview-components/Content";
import ShortText from "../../../staff-side/components/editor/preview-components/ShortText";
import LongText from "../../../staff-side/components/editor/preview-components/LongText";
import Dropdown from "../../../staff-side/components/editor/preview-components/Dropdown";
import SelectMultiple from "../../../staff-side/components/editor/preview-components/SelectMultiple";

import { MAX_SUBMISSIONS } from "../../../staff-side/components/plan/Plan";
import Banner from "../../../staff-side/components/plan/Banner";

import { HiPaperAirplane } from "react-icons/hi";
import HistorySidebar from "./HistorySidebar";

function Dashboard(props) {
  const {
    delegations,
    form,
    pendings,
    processed,
    settings,
    user,
    setUser,
    setLoggedIn,
    accountInfo,
  } = useContext(delContext);

  const [currForm, setCurrForm] = useState(form);
  const [formRender, setFormRender] = useState();
  const [submission, setSubmission] = useState(
    currForm.map((item) => {
      return { type: item.type, heading: item.heading };
    })
  );
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [notImpostor, setNotImpostor] = useState(false);
  const [warning, setWarning] = useState("");
  const [showingConfirmation, setShowingConfirmation] = useState(false);

  const totalSubmissions = pendings.length + processed.length;

  useEffect(() => {
    // Keeps submission array in line with any form changes
    matchSubmissionToForm(currForm, form); // Runs first so that functions triggered by setCurrForm have updated arrays
    setCurrForm(form);
  }, [form]);

  useEffect(() => {
    rerenderForm();
  }, [currForm, settings, delegations]);

  useEffect(() => {
    setSubmissionComplete(
      submission.every((item, index) => {
        let valid = true;
        if (currForm[index].required) {
          if (item.value == undefined || item.value == null) return false;
          if (item.type == "select-multiple" || item.type == "multiplechoice") {
            valid = item.value.length != 0;
          } else if (
            item.type == "radio" ||
            item.type == "shorttext" ||
            item.type == "longtext" ||
            item.type == "dropdown"
          ) {
            valid = item.value != "";
            valid = item.value != "No Selection";
          }
        }
        return valid;
      })
    );

    setNotImpostor(() => {
      if (
        submission.length > 3 &&
        submission[3].value &&
        checkStandardized(currForm)
      ) {
        return submission[3].value.includes(user);
      } else {
        return true; // Author does not need to be sponsor to submit to a non-standard form
      }
    });
  }, [submission]);

  return (
    <div className="dashboard-container">
      {accountInfo.type === "Starter" && (
        <Banner totalSubmissions={0} page={"delegate"} />
      )}

      <div className="content-container">
        <div className="UI-left">
          {showingConfirmation ? (
            <div className="submission-confirmation">
              <div className="submission-confirmation-top">
                <HiPaperAirplane size={72} className="confirmation-icon" />
                <p className="submission-confirmation-heading">
                  Submission Sent!
                </p>
              </div>
              <div
                className="btt-new-directive"
                onClick={() => {
                  setShowingConfirmation(false);
                }}
              >
                Submit New Directive
              </div>
            </div>
          ) : (
            <div className="form-container">
              <div className="form-top">
                <div className="preview-hat">
                  <p className="preview-hat-heading">{user}</p>
                  <p className="preview-hat-subheading">{settings.committee}</p>
                </div>
                <div
                  className="btt-signout"
                  onClick={() => {
                    sessionStorage.removeItem("code");
                    setUser(null);
                    setLoggedIn(false);
                  }}
                >
                  Sign Out
                </div>
              </div>

              {formRender}

              <div
                className={
                  settings.formOpen == undefined
                    ? "submit-container"
                    : `${settings.formOpen ? "submit-container" : "hide"}`
                }
              >
                <p className={warning == "" ? "warning fade" : "warning"}>
                  {warning}
                </p>
                <div className="btt-submit" onClick={handleSubmit}>
                  Submit
                </div>
              </div>
            </div>
          )}
        </div>

        <HistorySidebar />
      </div>
    </div>
  );

  function matchSubmissionToForm(prevArr, currArr) {
    let tempPrev = prevArr.slice();
    let tempCurr = currArr.slice();

    if (tempCurr.length > tempPrev.length) {
      // Question(s) were added (to the end of the form)
      let toConcat = [];
      for (let i = 0; i < tempCurr.length - tempPrev.length; i++) {
        toConcat.push({
          type: tempCurr[tempCurr.length - 1 - i].type,
          heading: tempCurr[tempCurr.length - 1 - i].heading,
        });
      }
      setSubmission(submission.concat(toConcat));
    } else if (tempCurr.length < tempPrev.length) {
      // A question was deleted
      let delIndex = -1;
      for (let i = 0; i < tempPrev.length; i++) {
        if (JSON.stringify(tempCurr[i]) !== JSON.stringify(tempPrev[i])) {
          delIndex = i;
        }
      }
      if (delIndex == -1) delIndex = tempCurr.length;

      let tempResult = submission.slice();
      tempResult.splice(delIndex, 1);
      setSubmission(tempResult);
    }
  }

  function rerenderForm() {
    if (settings.formOpen == undefined || settings.formOpen) {
      setFormRender(
        currForm.map((item) => {
          switch (item.type) {
            case "header":
              return (
                <Header
                  variant="delegate"
                  key={`${item.id}`}
                  id={item.id}
                  imgLink={item.imgLink || defaultBanner}
                  heading={item.heading}
                  subheading={item.subheading}
                />
              );
            case "radio":
              return (
                <Radio
                  variant="delegate"
                  key={`${item.id}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  options={item.options || []}
                  updateSubmission={updateSubmission}
                />
              );
            case "multiplechoice":
              return (
                <MultipleChoice
                  variant="delegate"
                  key={`${item.id}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  options={item.options || []}
                  updateSubmission={updateSubmission}
                />
              );
            case "content":
              return (
                <Content
                  variant="delegate"
                  key={`${item.id}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  content={item.content}
                />
              );
            case "shorttext":
              return (
                <ShortText
                  variant="delegate"
                  key={`${item.id}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  updateSubmission={updateSubmission}
                />
              );
            case "longtext":
              return (
                <LongText
                  variant="delegate"
                  key={`${item.id}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  maxchars={item.maxchars || false}
                  updateSubmission={updateSubmission}
                />
              );
            case "dropdown":
              return (
                <Dropdown
                  variant="delegate"
                  key={`${item.id} ${delegations.length}`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  options={
                    item.options === "all-delegations"
                      ? delegations.map((del) => del.name)
                      : item.options || []
                  }
                  updateSubmission={updateSubmission}
                />
              );
            case "select-multiple":
              return (
                <SelectMultiple
                  variant="delegate"
                  key={`${item.id} ${item.options ? item.options.length : 0} ${
                    delegations.length
                  }`}
                  id={item.id}
                  required={item.required}
                  heading={item.heading}
                  subheading={item.subheading}
                  max={item.max}
                  options={
                    item.options === "all-delegations"
                      ? delegations.map((del) => del.name)
                      : item.options || []
                  }
                  updateSubmission={updateSubmission}
                />
              );
            default:
              console.log("Could not render form block.");
          }
        })
      );
    } else {
      setFormRender(
        <div className="bricked-form-container">
          <p className="bricked-form-header">Form Suspended</p>
          <p className="bricked-form-subheader">
            The Dais has temporarily suspended the form.
          </p>
        </div>
      );
    }
  }

  function updateSubmission(id, data) {
    let tempArr = submission.slice();
    tempArr[id].value = data;
    setSubmission(tempArr);
  }

  function handleSubmit() {
    if (accountInfo.type === "Starter" && totalSubmissions >= MAX_SUBMISSIONS) {
      setWarning("Submission limit reached");
      setTimeout(() => setWarning(""), 2000);
      return;
    }

    if (submissionComplete && notImpostor) {
      let submissionObj = {
        submissionID: (pendings || []).concat(processed || []).length,
        status: "Pending",
        author: user,
        standard: checkStandardized(currForm),
      };

      if (submissionObj.standard) {
        submissionObj.title = submission[1].value;
        submissionObj.type = submission[2].value;
        submissionObj.sponsors = submission[3].value;
        submissionObj.signatories =
          submission[4].value.length != 0 ? submission[4].value : false;
        submissionObj.body = submission.slice(5).filter((item) => {
          return item.type != "header" && item.type != "content";
        });
      } else {
        submissionObj.body = submission.filter((item) => {
          return item.type != "header" && item.type != "content";
        });
      }

      props.submit(submissionObj);
      setShowingConfirmation(true);

      // Clear for new form
      rerenderForm();
      setSubmission(
        currForm.map((item) => {
          return { type: item.type, heading: item.heading };
        })
      );
    } else if (!submissionComplete) {
      setWarning("Required fields incomplete");
      setTimeout(() => setWarning(""), 2000);
    } else if (!notImpostor) {
      setWarning("You must be a sponsor");
      setTimeout(() => setWarning(""), 2000);
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
      formArr[3].options == "all-delegations" &&
      formArr[4].type == "select-multiple" &&
      formArr[4].heading == "Signatories" &&
      !formArr[4].required &&
      formArr[4].options == "all-delegations"
    );
  }
}

export default Dashboard;
