import React, { useState, useEffect, useContext } from "react";
import "./Sidebar.scoped.css";
import { staffContext } from "../../common/Context";
import PageButton from "./PageButton";
import {
  BsPeopleFill,
  BsPencilFill,
  BsInboxFill,
  BsClockFill,
  BsBarChartFill,
  BsGearFill,
} from "react-icons/bs";
import { IoIosJournal } from "react-icons/io";
import { HiBadgeCheck } from "react-icons/hi";
import { RxExit } from "react-icons/rx";
import { StaffPageKey } from "../../common/types/types";

const TOP_OPTIONS = [
  {
    destination: StaffPageKey.Delegations,
    label: "Delegations",
    icon: BsPeopleFill,
    iconSize: 22,
  },
  {
    destination: StaffPageKey.Editor,
    label: "Form Editor",
    icon: BsPencilFill,
    iconSize: 22,
  },
  {
    destination: StaffPageKey.Inbox,
    label: "Inbox",
    icon: BsInboxFill,
    iconSize: 22,
  },
  {
    destination: StaffPageKey.History,
    label: "History",
    icon: BsClockFill,
    iconSize: 20,
  },
  {
    destination: StaffPageKey.Statistics,
    label: "Statistics",
    icon: BsBarChartFill,
    iconSize: 22,
  },
  {
    destination: StaffPageKey.Notes,
    label: "Notes",
    icon: IoIosJournal,
    iconSize: 25,
  },
];

const BOTTOM_OPTIONS = [
  {
    destination: StaffPageKey.Plan,
    label: "Plan",
    icon: HiBadgeCheck,
    iconSize: 25,
  },
  {
    destination: StaffPageKey.Settings,
    label: "Settings",
    icon: BsGearFill,
    iconSize: 22,
  },
  {
    destination: StaffPageKey.Signout,
    label: "Sign Out",
    icon: RxExit,
    iconSize: 22,
  },
];

function Sidebar() {
  const {
    staffAPI: { page },
  } = useContext(staffContext);
  const [indOffset, setIndOffset] = useState(100);

  var resizeTimeout;
  window.onresize = () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
      setIndOffset(getIndicatorOffset(page));
    }, 100);
  };

  useEffect(() => {
    setIndOffset(getIndicatorOffset(page));
  }, [page]);

  return (
    <div className="Sidebar-container">
      <div className="Sidebar-subcontainer">
        <div className="Sidebar-topicons">
          {TOP_OPTIONS.map((obj) => (
            <PageButton {...obj} />
          ))}
        </div>

        <div className="Sidebar-boticons">
          {BOTTOM_OPTIONS.map((obj) => (
            <PageButton {...obj} />
          ))}
        </div>
      </div>

      <div className="Sidebar-indicator" style={{ top: indOffset }} />
    </div>
  );
}

const getIndicatorOffset = (page) => {
  const base = 55;
  const diff = 59;
  const offsets = {
    delegations: base,
    editor: base + diff,
    inbox: base + diff * 2,
    history: base + diff * 3,
    statistics: base + diff * 4,
    notes: base + diff * 5,
    plan: window.innerHeight - 95 - diff * 2,
    settings: window.innerHeight - 95 - diff,
  };

  return offsets[page];
};

export default Sidebar;
