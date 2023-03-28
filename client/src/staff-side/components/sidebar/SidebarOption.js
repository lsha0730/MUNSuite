import React, { useState, useContext } from "react";
import { appContext } from "../../staffContext.js";
import { siteContext } from "../../../Context";
import "./Sidebar.scoped.css";
import Hover from "../misc/Hover.js";

const INACTIVE_COLOR = "#3C8CC9";
const ACTIVE_COLOR = "#BCBCBC";

function SidebarOption({ destination, label, icon: Tag, iconSize }) {
  const { pendings, page, setPage } = useContext(appContext);
  const { handleSignout } = useContext(siteContext);
  const [hovering, setHovering] = useState(false);

  return (
    <div className="container">
      <div
        className="button"
        onClick={
          destination === "signout"
            ? handleSignout
            : () => {
                setPage(destination);
              }
        }
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
      >
        <Tag
          size={iconSize || 22}
          style={{
            transition: "200ms",
            fill: page === destination ? INACTIVE_COLOR : ACTIVE_COLOR,
            transform: destination === "signout" ? "rotate(180deg)" : "none",
          }}
        />
        {destination === "inbox" && pendings.length > 0 && (
          <p className="notification-indicator">
            {pendings.length > 99 ? "99+" : pendings.length}
          </p>
        )}
        {/* <Hover message={label} show={hovering} pos={{ left: 70 }} /> */}
      </div>

      <Hover message={label} show={hovering} pos={{ top: 17.5, left: 70 }} />
    </div>
  );
}

export default SidebarOption;
