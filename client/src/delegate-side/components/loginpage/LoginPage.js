import React, { useContext } from "react";
import styles from "./LoginPage.module.css";
import { delContext } from "../../DelegateContext";
import { IoIosLock } from "react-icons/io";

function LoginPage(props) {
  const { settings } = useContext(delContext);

  return (
    <div className={styles.loginpage_container}>
      <div className={styles.UI_container}>
        <div className={styles.UI_top}>
          <IoIosLock size={64} className={styles.icon} />
          <div className={styles.UI_top_right}>
            <p className={styles.heading}>
              {settings.conference} {settings.committee}
            </p>
            <p className={styles.subheading}>Digital Directive System</p>
          </div>
        </div>

        <div className={styles.UI_bottom}>
          <input
            type="text"
            id="keycode-input"
            placeholder="Enter Keycode"
            className={styles.input_field}
            onKeyDown={(e) => {
              if (e.key === "Enter") props.attemptLogin(e.target.value);
            }}
          />
          <div
            className={styles.btt_enter}
            onClick={() =>
              props.attemptLogin(document.getElementById("keycode-input").value)
            }
          >
            Enter
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
