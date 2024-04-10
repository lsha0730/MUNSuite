import { useState, useContext } from "react";
import "./Delegations.scoped.css";
import {
  AddUNCountries,
  AddCustomCountry,
  SpreadsheetAdd,
  Confirmation,
} from "../modals/index.js";
import {
  BsDownload,
  BsFillFileEarmarkSpreadsheetFill,
  BsFillPeopleFill,
  BsTrash3Fill,
} from "react-icons/bs";
import { BiSolidPen, BiSolidSelectMultiple } from "react-icons/bi";
import { SiUnitednations } from "react-icons/si";
import { PiSelection } from "react-icons/pi";
import { appContext, staffContext } from "../../common/Context";
import axios from "axios";
import { IoIosLock } from "react-icons/io";
import {
  classNames,
  exportToCsv,
  generateUniqueDelCode,
} from "../../common/utils/utils";
import { firebaseWrite } from "../../common/utils/firebase";
import {
  AccountType,
  Delegate,
  DelegateID,
  FirebaseDataTarget,
} from "../../common/types/types";
import Delbar from "./delbar/Delbar";
import { v4 as uuid } from "uuid";
import { Button } from "../../common/components/input";

type ModalKey =
  | "add_un_countries"
  | "add_custom_country"
  | "spreadsheet_add"
  | "confirmation";

const DELETE_DELS_WARNING_MSG =
  "Deleting delegates will revoke their form access and delete any notes you took about them, permanently. Their statistics and directives will remain.";

function Delegations() {
  const { database, user } = useContext(appContext);
  const {
    staffAPI: { accountInfo },
    firebaseData: { delegations, notes, settings },
  } = useContext(staffContext);

  const [selections, setSelections] = useState<DelegateID[]>([]);
  const [modalKey, setModal] = useState<ModalKey | null>(null);
  const [bigWelcome, setBigWelcome] = useState<boolean>(true);
  const sortedDels = delegations.sort((a, b) => a.name.localeCompare(b.name));

  const modals: Record<string, JSX.Element> = {
    add_un_countries: (
      <AddUNCountries setModal={setModal} addDelegates={addDelegates} />
    ),
    add_custom_country: (
      <AddCustomCountry setModal={setModal} addDelegates={addDelegates} />
    ),
    spreadsheet_add: (
      <SpreadsheetAdd setModal={setModal} addDelegates={addDelegates} />
    ),
    confirmation: (
      <Confirmation
        fn={deleteSelected}
        bttLabel="Remove Selected"
        description={DELETE_DELS_WARNING_MSG}
        setModal={setModal}
      />
    ),
    none: <></>,
  };
  const modal = modals[modalKey || "none"];

  window.onresize = () => {
    const marginProportion = 0.07;
    const whitespace = window.innerHeight * marginProportion;
    setBigWelcome(whitespace > 60);
  };

  function addDelegates(names: string[]) {
    const toAdd: Delegate[] = [];
    const existing = delegations.map((d) => d.code);
    for (const name of names) {
      const newDel = {
        id: uuid(),
        name: name,
        code: generateUniqueDelCode(
          existing.concat(toAdd.map((e: any) => e.code))
        ),
      };
      toAdd.push(newDel);
    }
    const newDelegations = delegations
      .concat(toAdd)
      .toSorted((a, b) => a.name.localeCompare(b.name));

    if (database && user)
      firebaseWrite(
        database,
        user.uid,
        FirebaseDataTarget.Delegations,
        newDelegations
      );
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/analytics`, {
      type: "add_dels",
      count: toAdd.length,
    });
  }

  function handleClick({ id }: Delegate) {
    const selectionsSet = new Set<DelegateID>(selections);
    if (selectionsSet.has(id)) {
      selectionsSet.delete(id);
      setSelections(Array.from(selectionsSet));
    } else {
      setSelections(selections.concat(id));
    }
  }

  function deselectAll() {
    setSelections([]);
  }

  function selectAll() {
    const allIDs = delegations.map((e) => e.id);
    setSelections(allIDs);
  }

  function deleteDelegates(deleteIDs: DelegateID[]) {
    const exclusions = new Set(deleteIDs);
    const newDelegations = delegations.filter((d) => !exclusions.has(d.id));
    if (database && user)
      firebaseWrite(
        database,
        user.uid,
        FirebaseDataTarget.Delegations,
        newDelegations
      );
  }

  function deleteNotes(deleteIDs: DelegateID[]) {
    const exclusions = new Set(deleteIDs);
    const newNotesIndv = notes.individual.filter(
      (note) => !exclusions.has(note.delegate)
    );
    if (database && user)
      firebaseWrite(database, user.uid, FirebaseDataTarget.Notes, {
        quick: notes.quick,
        individual: newNotesIndv,
      });
  }

  function deleteSelected() {
    deleteDelegates(selections);
    deleteNotes(selections);
    const newSelections = selections.filter((country) =>
      selections.includes(country)
    );
    setSelections(newSelections);
  }

  function exportCodes() {
    const nameCodePairs = delegations.map((del) => [del.name, del.code]);
    const rows = [
      ["JSON Format: ", JSON.stringify(delegations)],
      [],
      ["Delegate", "Code"],
    ].concat(nameCodePairs);
    exportToCsv("Delegate Codes", rows);
  }

  return (
    <div className="delegations-container">
      {modal}
      <div className="welcome">
        <p className="welcome-subheading">
          Signed in as
          {!bigWelcome && (
            <span>
              &nbsp;
              {accountInfo.email ||
                `${settings.conference} ${settings.committee}`}
            </span>
          )}
        </p>
        {bigWelcome && (
          <h1 className="welcome-heading">
            {accountInfo.email ||
              `${settings.conference} ${settings.committee}`}
          </h1>
        )}
      </div>

      <div className="UI-left">
        <div className="UI-topleft">
          <div className="delcount">
            <p className="delcount-num">{delegations.length}</p>
            <p className="delcount-desc">
              Active
              <br />
              Delegations
            </p>
          </div>

          <div className="buttons">
            <Button
              onClick={() => {
                setModal("add_un_countries");
              }}
              type="light"
              fullWidth
              align="left"
              padding="md"
            >
              <SiUnitednations size={18} style={{ marginRight: 10 }} />
              Add UN Countries
            </Button>

            <Button
              onClick={() => {
                setModal("add_custom_country");
              }}
              type="light"
              fullWidth
              align="left"
              padding="md"
            >
              <BiSolidPen size={18} style={{ marginRight: 10 }} />
              Add Custom Country
            </Button>

            <Button
              onClick={() => {
                if (accountInfo.type === AccountType.Premium)
                  setModal("spreadsheet_add");
              }}
              type={
                accountInfo.type === AccountType.Premium ? "light" : "bricked"
              }
              fullWidth
              align="left"
              padding="md"
            >
              {accountInfo.type === AccountType.Starter ? (
                <IoIosLock size={18} style={{ marginRight: 10 }} />
              ) : (
                <BsFillFileEarmarkSpreadsheetFill
                  size={18}
                  style={{ marginRight: 10 }}
                />
              )}
              Spreadsheet Import
            </Button>

            <div className={delegations.length < 1 ? "hide" : "visible"}>
              <Button onClick={selectAll} type="yellow" fullWidth align="left">
                <BiSolidSelectMultiple size={18} style={{ marginRight: 10 }} />
                Select All
              </Button>
            </div>

            <div
              className={classNames(
                "buttons",
                selections.length === 0 ? "hide" : "visible"
              )}
            >
              <Button
                onClick={deselectAll}
                type="yellow"
                fullWidth
                align="left"
                padding="md"
              >
                <PiSelection size={18} style={{ marginRight: 10 }} />
                Deselect All
              </Button>

              <Button
                onClick={() => {
                  setModal("confirmation");
                }}
                type="red"
                fullWidth
                align="left"
                padding="md"
              >
                <BsTrash3Fill size={18} style={{ marginRight: 10 }} />
                Remove Selected
              </Button>
            </div>
          </div>
        </div>

        <Button
          onClick={exportCodes}
          type="gray"
          fullWidth
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.8rem",
            justifyContent: "center",
          }}
        >
          <BsDownload size={18} />
          Export Codes (.csv)
        </Button>
      </div>

      <div className="UI-right">
        {delegations.length > 0 ? (
          <div className="delbars">
            {sortedDels.map((delegate) => (
              <Delbar
                delegate={delegate}
                onClick={handleClick}
                selected={selections.includes(delegate.id)}
              />
            ))}
          </div>
        ) : (
          <div className="no-dels">
            <BsFillPeopleFill color="#BCBCBC" size={36} />
            <p className="no-dels-message">No delegations yet!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Delegations;
