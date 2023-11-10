import React, { useState, useEffect, useContext } from "react";
import "./Sidebar.scoped.css";
import { appContext } from "../../staffContext.js";
import SidebarOption from "./SidebarOption";
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

const TOP_OPTIONS = [
  {
    destination: "delegations",
    label: "Delegations",
    icon: BsPeopleFill,
    iconSize: 22,
  },
  {
    destination: "editor",
    label: "Form Editor",
    icon: BsPencilFill,
    iconSize: 22,
  },
  {
    destination: "inbox",
    label: "Inbox",
    icon: BsInboxFill,
    iconSize: 22,
  },
  {
    destination: "history",
    label: "History",
    icon: BsClockFill,
    iconSize: 20,
  },
  {
    destination: "statistics",
    label: "Statistics",
    icon: BsBarChartFill,
    iconSize: 22,
  },
  {
    destination: "notes",
    label: "Notes",
    icon: IoIosJournal,
    iconSize: 25,
  },
];

const BOTTOM_OPTIONS = [
  {
    destination: "plan",
    label: "Plan",
    icon: HiBadgeCheck,
    iconSize: 25,
  },
  {
    destination: "settings",
    label: "Settings",
    icon: BsGearFill,
    iconSize: 22,
  },
  {
    destination: "signout",
    label: "Sign Out",
    icon: RxExit,
    iconSize: 22,
  },
];

function Sidebar() {
  const { page } = useContext(appContext);
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
            <SidebarOption {...obj} />
          ))}
        </div>

        <div className="Sidebar-boticons">
          {BOTTOM_OPTIONS.map((obj) => (
            <SidebarOption {...obj} />
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

  switch (page) {
    case "delegations":
      return base;
    case "editor":
      return base + diff;
    case "inbox":
      return base + diff * 2;
    case "history":
      return base + diff * 3;
    case "statistics":
      return base + diff * 4;
    case "notes":
      return base + diff * 5;
    case "plan":
      return window.innerHeight - 95 - diff * 2;
    case "settings":
      return window.innerHeight - 95 - diff;
    default:
      return base;
  }
};

export default Sidebar;
