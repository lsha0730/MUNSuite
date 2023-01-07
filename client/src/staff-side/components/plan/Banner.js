import React, { useContext } from "react";
import { appContext } from "../../staffContext";
import "./Banner.scoped.css";
import { MAX_SUBMISSIONS } from "./Plan";

const Banner = () => {
  const { pendings, processed, setPage } = useContext(appContext);
  const totalSubmissions = pendings.length + processed.length;

  const messages = [
    <p>You are using the Starter tier of MUNSuite.</p>,
    <p>
      {`Your account is nearing the ${MAX_SUBMISSIONS} submission limit. At the limit, you will have to clear your data in settings or`}
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
      {`Your account has reached the ${MAX_SUBMISSIONS} submission limit. Clear account data in settings or`}
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
    } else if (x > 50) {
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
