import React, { useState, useEffect, useContext } from "react";
import "./Sidebar.scoped.css";
import { appContext } from "../../staffContext.js";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io";
import { HiBadgeCheck } from "react-icons/hi";

const INACTIVE_COLOR = "#3C8CC9";
const ACTIVE_COLOR = "#BCBCBC";

function Sidebar() {
  const { pendings } = useContext(appContext);
  const { page, setPage } = useContext(appContext);
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
          <div
            className="Sidebar-option"
            onClick={() => {
              setPage("delegations");
            }}
          >
            <BsIcons.BsPeopleFill
              size={22}
              style={{
                transition: "200ms",
                fill: page === "delegations" ? INACTIVE_COLOR : ACTIVE_COLOR,
              }}
            />
          </div>

          <div
            className="Sidebar-option"
            onClick={() => {
              setPage("editor");
            }}
          >
            <BsIcons.BsPencilFill
              size={22}
              style={{
                transition: "200ms",
                fill: page === "editor" ? INACTIVE_COLOR : ACTIVE_COLOR,
              }}
            />
          </div>

          <div
            className="Sidebar-option"
            onClick={() => {
              setPage("inbox");
            }}
          >
            <BsIcons.BsInboxFill
              size={22}
              style={{
                transition: "200ms",
                fill: page === "inbox" ? INACTIVE_COLOR : ACTIVE_COLOR,
              }}
            />
            {pendings.length > 0 && (
              <p className="notification-indicator">
                {pendings.length > 99 ? "99+" : pendings.length}
              </p>
            )}
          </div>

          <div
            className="Sidebar-option"
            onClick={() => {
              setPage("history");
            }}
          >
            <BsIcons.BsClockFill
              size={20}
              style={{
                transition: "200ms",
                fill: page === "history" ? INACTIVE_COLOR : ACTIVE_COLOR,
              }}
            />
          </div>

          <div
            className="Sidebar-option"
            onClick={() => {
              setPage("statistics");
            }}
          >
            <BsIcons.BsBarChartFill
              size={22}
              style={{
                transition: "200ms",
                fill: page === "statistics" ? INACTIVE_COLOR : ACTIVE_COLOR,
              }}
            />
          </div>

          <div
            className="Sidebar-option"
            onClick={() => {
              setPage("notes");
            }}
          >
            <IoIcons.IoIosJournal
              size={25}
              style={{
                transition: "200ms",
                fill: page === "notes" ? INACTIVE_COLOR : ACTIVE_COLOR,
              }}
            />
          </div>
        </div>

        <div className="Sidebar-boticons">
          <div
            className="Sidebar-option"
            onClick={() => {
              setPage("plan");
            }}
          >
            <HiBadgeCheck
              size={25}
              style={{
                transition: "200ms",
                fill: page === "plan" ? INACTIVE_COLOR : ACTIVE_COLOR,
              }}
            />
          </div>
          <div
            className="Sidebar-option"
            onClick={() => {
              setPage("settings");
            }}
          >
            <BsIcons.BsGearFill
              size={22}
              style={{
                transition: "200ms",
                fill: page === "settings" ? INACTIVE_COLOR : ACTIVE_COLOR,
              }}
            />
          </div>
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
      return window.innerHeight - 95 - diff;
    case "settings":
      return window.innerHeight - 95;
    default:
      return base;
  }
};

export default Sidebar;
