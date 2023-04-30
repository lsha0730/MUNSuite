import React, { useEffect, useState } from "react";
import styles from "./PreviewComponents.module.css";
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
        className={styles.block_container}
        id={styles.block_container}
        onClick={() => {
          if (setEditing) setEditing(id);
        }}
      >
        {variant === "staff" && (
          <div
            className={editing == id ? styles.editing_indicator : styles.fade}
          />
        )}
        <div
          className={
            isShowingOptions ? styles.dropdown_defocuser : styles.hidden
          }
          onClick={() => setIsShowingOptions(false)}
        />
        <p className={styles.heading}>{heading}</p>
        <p className={styles.subheading}>{subheading}</p>
        <p className={required ? styles.required_star : styles.hidden}>*</p>
        <div
          className={
            selected.length == 0
              ? styles.hidden
              : styles.selmult_selections_container
          }
        >
          {selected.map((selection) => (
            <div
              onClick={() => {
                deselectOption(selection);
              }}
              className={styles.selmult_selection}
            >
              <p>- {selection}</p>
            </div>
          ))}
        </div>
        <p
          className={`${styles.selmult_max_warning} ${
            maxWarning ? "" : styles.fade
          }`}
        >
          You have selected the maximum number of selections.
        </p>
        <div
          className={`${styles.selmult_searchbar} ${
            isShowingOptions ? styles.super_z : ""
          }`}
        >
          <input
            type="text"
            placeholder="Search"
            className={styles.selmult_subbar}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsShowingOptions(true)}
          />
          <GoSearch size={15} className={styles.selmult_icon} />
          <div
            className={
              !isShowingOptions || choices.length === 0
                ? styles.hidden
                : styles.selmult_drop_field
            }
          >
            <div className={styles.selmult_subdropfield}>
              {isShowingOptions &&
                choices.map((e) =>
                  search === "" ||
                  e.toLowerCase().includes(search.toLowerCase()) ? (
                    <div
                      className={styles.dropdown_option_container}
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
          <div className={styles.locked_icon_container}>
            <IoIosLock className={styles.locked_icon} />
          </div>
        ) : (
          <div id={styles.Qmod_icons}>
            <div onClick={() => updateForm("move-up", id)}>
              <IoIosArrowUp className={styles.btt_moveQ} />
            </div>
            <div onClick={() => updateForm("move-down", id)}>
              <IoIosArrowDown className={styles.btt_moveQ} />
            </div>
            <div onClick={() => updateForm("delete", id)}>
              <FaTrash className={styles.btt_delQ} />
            </div>
          </div>
        ))}
    </div>
  );
}

export default SelectMultiple;
