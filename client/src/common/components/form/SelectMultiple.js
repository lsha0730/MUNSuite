import React, { useEffect, useState } from "react";
import "./PreviewComponents.scoped.css";
import { GoSearch } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosLock } from "react-icons/io";

function SelectMultiple({
  variant,
  id,
  required,
  heading,
  subheading,
  max,
  options,
  editing,
  setEditing,
  updateForm,
  updateSubmission,
  locked,
}) {
  const [choices, setChoices] = useState(options);
  const [search, setSearch] = useState("");
  const [isShowingOptions, setIsShowingOptions] = useState(false);
  const [selected, setSelected] = useState([]); // Stores the string value of all selected items
  const [trigger, setTrigger] = useState(false);
  const [maxWarning, setMaxWarning] = useState(false);

  useEffect(() => {
    if (variant === "delegate" && updateSubmission) {
      updateSubmission(id, selected.length > 0 ? selected : ["No Selection"]);
    }
  }, [selected.length]);

  const selectOption = (option) => {
    if (selected.length < max || !max) {
      let currentSelected = selected;
      let currentOptions = choices;

      currentOptions.splice(currentOptions.indexOf(option), 1);
      currentSelected.push(option);

      setSelected(currentSelected);
      setChoices(currentOptions);

      setIsShowingOptions(false);
      setTrigger(!trigger);
    } else {
      setMaxWarning(true);
      setTimeout(() => setMaxWarning(false), 3000);
    }
  };

  const deselectOption = (option) => {
    setSelected(selected.filter((item) => item !== option));
    setChoices(choices.concat(option));
  };

  useEffect(() => {
    setChoices(choices.sort((a, b) => a.localeCompare(b)));
  }, [selected.length]);

  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <div
        className="block-container"
        id="block-container"
        onClick={() => {
          if (setEditing) setEditing(id);
        }}
      >
        {variant === "staff" && (
          <div className={editing == id ? "editing-indicator" : "fade"} />
        )}
        <div
          className={isShowingOptions ? "dropdown-defocuser" : "hidden"}
          onClick={() => setIsShowingOptions(false)}
        />
        <p className="heading">{heading}</p>
        <p className="subheading">{subheading}</p>
        <p className={required ? "required-star" : "hidden"}>*</p>
        <div
          className={
            selected.length == 0 ? "hidden" : "selmult-selections-container"
          }
        >
          {selected.map((selection) => (
            <div
              onClick={() => {
                deselectOption(selection);
              }}
              className="selmult-selection"
            >
              <p>- {selection}</p>
            </div>
          ))}
        </div>
        <p
          className={
            maxWarning ? "selmult-max-warning" : "selmult-max-warning fade"
          }
        >
          You have selected the maximum number of selections.
        </p>
        <div
          className={
            isShowingOptions ? "selmult-searchbar super-z" : "selmult-searchbar"
          }
        >
          <input
            type="text"
            placeholder="Search"
            className="selmult-subbar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsShowingOptions(true)}
          />
          <GoSearch size={15} className="selmult-icon" />
          <div
            className={
              !isShowingOptions || choices.length === 0
                ? "hidden"
                : "selmult-drop-field"
            }
          >
            <div className="selmult-subdropfield">
              {isShowingOptions &&
                choices.map((e) =>
                  search === "" ||
                  e.toLowerCase().includes(search.toLowerCase()) ? (
                    <div
                      className="dropdown-option-container"
                      onClick={() => {
                        selectOption(e);
                        setIsShowingOptions(false);
                        setSearch("");
                      }}
                    >
                      {e}
                    </div>
                  ) : (
                    <></>
                  )
                )}
            </div>
          </div>
        </div>
      </div>

      {variant === "staff" &&
        (locked ? (
          <div className="locked-icon-container">
            <IoIosLock className="locked-icon" />
          </div>
        ) : (
          <div id="Qmod-icons">
            <div onClick={() => updateForm("move-up", id)}>
              <IoIosArrowUp className="btt-moveQ" />
            </div>
            <div onClick={() => updateForm("move-down", id)}>
              <IoIosArrowDown className="btt-moveQ" />
            </div>
            <div onClick={() => updateForm("delete", id)}>
              <FaTrash className="btt-delQ" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default SelectMultiple;
