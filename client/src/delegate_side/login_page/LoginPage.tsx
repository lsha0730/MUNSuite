import { useContext, useRef } from "react";
import "./LoginPage.scoped.css";
import { delegateContext } from "../../common/Context";
import { IoIosLock } from "react-icons/io";
import Button from "../../common/components/input/Button";
import ShortText from "../../common/components/input/ShortText";

const LoginPage = () => {
  const {
    firebaseData: { delegations, settings },
    delegateAPI: { setUser },
  } = useContext(delegateContext);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="container">
      <div className="content">
        <div className="top">
          <IoIosLock size={64} className="icon" />
          <div className="headers">
            <p className="heading">
              {`${settings.conference} ${settings.committee}`}
            </p>
            <p className="subheading">Digital Directive System</p>
          </div>
        </div>

        <div className="bottom">
          <ShortText
            ref={inputRef}
            placeholder="Enter Keycode"
            onEnter={() => {
                const code = inputRef.current?.value || ""
                login(code)
            }}
            fullWidth
          />
          <Button
            onClick={() => {
              const code = inputRef.current?.value || ""
              login(code)
            }}
            innerText="Log In"
            type="light"
          />
        </div>
      </div>
    </div>
  );

  // TODO: Fix this turbosus auth method
  function login(code: string) {
    delegations.forEach((d) => {
      if (d.code == code) {
        setUser(d);
        sessionStorage.setItem("code", d.code);
      }
    });
  }
}

export default LoginPage;
