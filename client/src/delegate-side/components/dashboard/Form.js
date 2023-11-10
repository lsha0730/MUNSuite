import React from "react";
import "./Form.scoped.css";
import defaultBanner from "./defaultBanner.png";
import {
  Header,
  Radio,
  MultipleChoice,
  Content,
  ShortText,
  LongText,
  Dropdown,
  SelectMultiple,
} from "../../../common/components/form";

const Form = ({
  form,
  delegations,
  disabled,
  warning,
  updateSubmission,
  handleSubmit,
}) => {
  return disabled ? (
    <div className="bricked-container">
      <p className="bricked-header">Form Suspended</p>
      <p className="bricked-subheader">
        The Dais has temporarily suspended the form.
      </p>
    </div>
  ) : (
    <div className="form-container">
      {form.map((item) => {
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
      })}

      <div className="submit-container">
        <p className={warning == "" ? "warning fade" : "warning"}>{warning}</p>
        <div className="btt-submit" onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default Form;
