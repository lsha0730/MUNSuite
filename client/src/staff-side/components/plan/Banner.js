import React, { useContext } from "react";
import { appContext } from "../../staffContext";
import "./Banner.scoped.css";
import { MAX_SUBMISSIONS } from "./Plan";

const Banner = ({ totalSubmissions, page }) => {
  const { setPage } = useContext(appContext);

  const messages = [
    <p>
      You are using the Starter tier of MUNSuite.
      {page === "staff" && (
        <>
          &nbsp;
          <span
            className="action-text"
            onClick={() => {
              setPage("plan");
            }}
          >
            Upgrade to Premium
          </span>
        </>
      )}
    </p>,
    <p>
      {`Your account is nearing the ${MAX_SUBMISSIONS} submission limit. At the limit, you will have to clear your directives history or`}
      &nbsp;
      <span
        className="action-text"
        onClick={() => {
          setPage("plan");
        }}
      >
        upgrade to Premium.
      </span>
    </p>,
    <p>
      {`Your account has reached the ${MAX_SUBMISSIONS} submission limit. Make room by clearing your directives history or`}
      &nbsp;
      <span
        className="action-text"
        onClick={() => {
          setPage("plan");
        }}
      >
        upgrade to Premium.
      </span>
    </p>,
  ];

  const colors = [
    {
      bg: "#eeeeee",
      text: "#707070",
    },
    {
      bg: "#FFE49A",
      text: "#DAA11E",
    },
    {
      bg: "#FF5A5A",
      text: "white",
    },
  ];

  const i = (x) => {
    if (x >= MAX_SUBMISSIONS) {
      return 2;
    } else if (x > MAX_SUBMISSIONS * 0.8) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: colors[i(totalSubmissions)].bg,
        color: colors[i(totalSubmissions)].text,
      }}
    >
      <p className="message">{messages[i(totalSubmissions)]}</p>
    </div>
  );
};

export default Banner;
