import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { delegateContext } from "../../common/Context";
import "./Dashboard.scoped.css";

import { MAX_SUBMISSIONS } from "../../staff_side/plan/Plan";
import Banner from "../../staff_side/plan/banner/Banner";

import { FaPaperPlane } from "react-icons/fa";
import Sidebar from "./sidebar/Sidebar";
import Form from "./form/Form";
import { AccountType } from "../../common/types/types";

function Dashboard(props) {
  const {
    firebaseData: { delegations, form, pendings, processed, settings },
    delegateAPI: { user, setUser, hostAccountInfo },
  } = useContext(delegateContext);

  const [currForm, setCurrForm] = useState(form);
  const [submission, setSubmission] = useState(
    currForm.map((item) => ({ type: item.type, heading: item.heading }))
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
      {hostAccountInfo.type === AccountType.Starter && (
        <Banner totalSubmissions={0} page={"delegate"} />
      )}

      <div className="content-container">
        <div className="UI-left">
          {showingConfirmation ? (
            <div className="submission-confirmation">
              <div className="submission-confirmation-top">
                <FaPaperPlane size={48} className="confirmation-icon" />
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
                  <p className="preview-hat-heading">{user.name}</p>
                  <p className="preview-hat-subheading">{settings.committee}</p>
                </div>
                <div
                  className="btt-signout"
                  onClick={() => {
                    sessionStorage.removeItem("code");
                    setUser(null);
                  }}
                >
                  Sign Out
                </div>
              </div>

              <Form
                form={currForm}
                delegations={delegations}
                disabled={
                  !(settings.formOpen == undefined || settings.formOpen)
                }
                warning={warning}
                updateSubmission={updateSubmission}
                handleSubmit={handleSubmit}
              />
            </div>
          )}
        </div>

        <Sidebar draft={getDraftCard()} />
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

  function updateSubmission(id, data) {
    let tempArr = submission.slice();
    tempArr[id].value = data;
    setSubmission(tempArr);
  }

  function handleSubmit() {
    if (
      hostAccountInfo.type === AccountType.Starter &&
      totalSubmissions >= MAX_SUBMISSIONS
    ) {
      setWarning("Submission limit reached");
      setTimeout(() => setWarning(""), 2000);
      return;
    }

    if (!submissionComplete) {
      setWarning("Required fields incomplete");
      setTimeout(() => setWarning(""), 2000);
      return;
    }

    if (!notImpostor) {
      setWarning("You must be a sponsor");
      setTimeout(() => setWarning(""), 2000);
      return;
    }

    const submissionObj = getDraftCard();
    props.submit(submissionObj);
    setShowingConfirmation(true);

    // Clear for new form
    setSubmission(
      currForm.map((item) => ({ type: item.type, heading: item.heading }))
    );

    // Add analytics
    axios.post("https://munsuite-backend.onrender.com/analytics", {
      type: "submit_directive",
    });
    gtag("event", "submit_directive");
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

  function getDraftCard() {
    const draftCard = {
      submissionID: (pendings || []).concat(processed || []).length,
      status: "Pending",
      author: user,
      standard: checkStandardized(currForm),
    };

    if (draftCard.standard) {
      draftCard.title = submission[1].value;
      draftCard.type = submission[2].value;
      draftCard.sponsors = submission[3].value;
      draftCard.signatories =
        submission[4]?.value?.length != 0 ? submission[4].value : false;
      draftCard.body = submission.slice(5).filter((item) => {
        return item.type != "header" && item.type != "content";
      });
    } else {
      draftCard.body = submission.filter((item) => {
        return item.type != "header" && item.type != "content";
      });
    }

    return draftCard;
  }
}

export default Dashboard;
