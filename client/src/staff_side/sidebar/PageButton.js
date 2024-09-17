import React, { useContext } from "react";
import { appContext, staffContext } from "../../common/Context";
import "./Sidebar.scoped.css";
import Hoverable from "../../common/components/hover/Hoverable.js";
import { StaffPageKey } from "../../common/types/types";

const INACTIVE_COLOR = "#3C8CC9";
const ACTIVE_COLOR = "#BCBCBC";

function PageButton({ destination, label, icon: Tag, iconSize }) {
  const { auth } = useContext(appContext);
  const {
    firebaseData: { pendings },
    staffAPI: { page, setPage },
  } = useContext(staffContext);

  return (
    <Hoverable
      message={label}
      pos={{ top: 17.5, left: 70 }}
      className="container"
    >
      <div
        className="button"
        onClick={() => {
          if (destination === StaffPageKey.Signout) {
            auth.signOut();
          } else {
            setPage(destination);
          }
        }}
      >
        <Tag
          size={iconSize || 22}
          style={{
            transition: "200ms",
            fill: page === destination ? INACTIVE_COLOR : ACTIVE_COLOR,
            transform:
              destination === StaffPageKey.Signout ? "rotate(180deg)" : "none",
          }}
        />
        {destination === "inbox" && pendings.length > 0 && (
          <p className="notification-indicator">
            {pendings.length > 99 ? "99+" : pendings.length}
          </p>
        )}
      </div>
    </Hoverable>
  );
}

export default PageButton;
