import React, { useEffect, useState, useContext } from "react";
import styles from "./Notes.module.css";
import { BsDownload, BsPersonFill } from "react-icons/bs";
import { IoClipboard } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { appContext } from "../../staffContext";
import IndividualNote from "./IndividualNote";
import { IoIosLock } from "react-icons/io";
import { exportToCsv } from "../../utils";

function Notes() {
  const { delegations, notes, writeToFirebase, accountInfo } = useContext(
    appContext
  );
  const [options, setOptions] = useState(
    notes.individual.map((item) => item.delegate)
  );
  const [search, setSearch] = useState("");
  const [renderOptions, setRenderOptions] = useState([]);
  const [isShowingOptions, setIsShowingOptions] = useState(false);
  const [selected, setSelected] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [renderSelected, setRenderSelected] = useState([]);

  // Keeps notes in sync with delegations list
  useEffect(() => {
    // Updating list of notes
    let newDels = delegations.slice().map((item) => item.name);
    let oldNotes = notes.individual.slice();
    let oldDels = oldNotes.map((item) => item.delegate);
    let newNotes = newDels.map((delegate) => {
      return { name: delegate };
    });

    newNotes = newNotes.map((note) => {
      if (oldDels.includes(note.name)) {
        return oldNotes[oldDels.indexOf(note.name)];
      } else {
        return {
          delegate: note.name,
          text: "",
        };
      }
    });

    writeToFirebase("notes", {
      individual: newNotes,
      quick: notes.quick,
    });

    // Updating queue options & selecteds
    let finalDels = newNotes.map((note) => note.delegate);
    setOptions(finalDels.filter((item) => !selected.includes(item)));
    setSelected(selected.filter((item) => finalDels.includes(item)));
  }, [delegations]);

  // for rendering options
  useEffect(() => {
    let renderArray = [];
    for (let i = 0; i < options.length; i++) {
      if (
        search === "" ||
        options[i].toLowerCase().includes(search.toLowerCase())
      ) {
        renderArray.push(
          <div
            className={styles.dropdown_option_container}
            onClick={() => {
              selectOption(options[i]);
              setIsShowingOptions(false);
            }}
          >
            <div className={styles.dropdown_text_container}>{options[i]}</div>
          </div>
        );
      }
    }
    setRenderOptions(renderArray);

    let returnRenderSelected = [];
    for (let j = 0; j < selected.length; j++) {
      returnRenderSelected.push(
        <div
          onClick={() => deselectOption(selected[j])}
          className={styles.selection}
        >
          <p>- {selected[j]}</p>
        </div>
      );
    }
    setRenderSelected(returnRenderSelected);
  }, [options, search, isShowingOptions, selected, trigger]);

  return (
    <div className={styles.page_container}>
      <div className={styles.UI_left}>
        <div className={styles.UI_left_top}>
          <div className={styles.header_pair}>
            <BsPersonFill className={styles.header_icon} />
            <p className={styles.header_text}>Individual Notes</p>
          </div>

          <div
            className={
              isShowingOptions ? styles.dropdown_defocuser : styles.hidden
            }
            onClick={() => setIsShowingOptions(false)}
          />
          <div
            className={
              isShowingOptions
                ? `${styles.searchbar} ${styles.super_z}`
                : styles.searchbar
            }
          >
            <input
              type="text"
              placeholder="Search"
              className={styles.subbar}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsShowingOptions(true)}
            />
            <GoSearch size={15} className={styles.icon} />
            <div
              className={
                !isShowingOptions || options.length === 0
                  ? "hidden"
                  : "drop-field"
              }
            >
              <div className={styles.subdropfield}>
                {isShowingOptions && renderOptions}
              </div>
            </div>
          </div>
          <div
            className={
              renderSelected.length == 0
                ? styles.hidden
                : styles.selections_container
            }
          >
            {renderSelected}
          </div>
        </div>

        <div className={styles.notes_container}>
          {delegations.length > 0 ? (
            selected.length > 0 ? (
              selected.map((del) => {
                const note = notes.individual.find(
                  (note) => note.delegate == del
                );
                return (
                  <IndividualNote
                    delegate={note.delegate}
                    text={note.text}
                    updateNotes={updateNotes}
                  />
                );
              })
            ) : (
              notes.individual.map((note) => (
                <IndividualNote
                  delegate={note.delegate}
                  text={note.text}
                  updateNotes={updateNotes}
                />
              ))
            )
          ) : (
            <div className={styles.no_notes_box}>No delegates in committee</div>
          )}
        </div>
      </div>

      <div className={styles.UI_right}>
        <div className={styles.header_pair}>
          <IoClipboard className={styles.header_icon} />
          <p className={styles.header_text}>Quick Notes</p>
        </div>

        <textarea
          id="quicknotes-input"
          type="text"
          placeholder="Input here..."
          defaultValue={notes.quick}
          onChange={(e) =>
            writeToFirebase("notes", {
              individual: notes.individual,
              quick: e.target.value,
            })
          }
          className={styles.UI_right_input}
        />

        {accountInfo.type === "Premium" ? (
          <div className={styles.btt_export_notes} onClick={exportNotes}>
            <div className={styles.btt_export_notes_inner}>
              <BsDownload size={18} />
              <p>Export Notes (.csv)</p>
            </div>
          </div>
        ) : (
          <div className={styles.btt_bricked}>
            <div className={styles.btt_export_notes_inner}>
              <IoIosLock size={18} />
              <p>Export Notes (.csv)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function exportNotes() {
    let dataRows = [];

    for (let i = 0; i < notes.individual.length; i++) {
      let note = notes.individual[i];
      let row = [note.delegate, note.text];
      dataRows.push(row);
    }

    const rows = [
      ["JSON Format: ", JSON.stringify(notes)],
      [],
      ["Quick Notes"],
      [notes.quick],
      [],
      ["Individual Notes"],
    ].concat(dataRows);
    exportToCsv("Committee Notes", rows);
  }

  function updateNotes(delegate, newText) {
    let tempArr = notes.individual.slice();
    const index = tempArr.findIndex((elem) => elem.delegate == delegate);
    tempArr[index].text = newText;
    writeToFirebase("notes", {
      individual: tempArr,
      quick: notes.quick,
    });
  }

  function selectOption(option) {
    let currentSelected = selected;
    let currentOptions = options;

    currentOptions.splice(currentOptions.indexOf(option), 1);
    currentSelected.push(option);

    setSelected(currentSelected);
    setOptions(currentOptions);

    setIsShowingOptions(false);
    setTrigger(!trigger);
  }

  function deselectOption(option) {
    let currentSelected = selected;
    let currentOptions = options;

    currentSelected.splice(currentSelected.indexOf(option), 1);
    currentOptions.push(option);

    setSelected(currentSelected);
    setOptions(currentOptions);

    setTrigger(!trigger);
  }
}

export default Notes;
