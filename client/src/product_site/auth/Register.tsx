import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.scoped.css";
import { appContext } from "../../common/Context";
import { registerAccount } from "../../common/utils/http";
import { Button, TextInput, Checkbox } from "../../common/components/input";
import Notice from "../../common/components/notice/Notice";

const MESSAGE_DURATION_MS = 3000

const Register = () => {
  const navigate = useNavigate();
  const { auth, user } = useContext(appContext);
  const [error, setError] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);
  const confNameRef = useRef<HTMLInputElement>(null);
  const commNameRef = useRef<HTMLInputElement>(null);
  const eulaRef = useRef<HTMLInputElement>(null);

  return (
    <div className="container">
      <p className="header">Register an Account</p>

      <div className="form">
        <div className="form_col">
          <TextInput label="Email" ref={emailRef} onEnter={handleRegister} />
          <TextInput
            label="Password"
            ref={passwordRef}
            onEnter={handleRegister}
            type="password"
          />
          <TextInput
            label="Confirm Password"
            ref={confirmPassRef}
            onEnter={handleRegister}
            type="password"
          />
          <Button
            label={
              <p
                className="additional-text"
                style={{ marginTop: "50px", marginBottom: "10px" }}
              >
                Have an account?&nbsp;
                <Link to="/login" className="additional-link">
                  Log In.
                </Link>
              </p>
            }
            onClick={handleRegister}
            padding="lg"
          >Register</Button>
        </div>

        <div className="form_col">
          <TextInput
            label="Abbreviated Conference Name"
            ref={confNameRef}
            onEnter={handleRegister}
          />
          <TextInput
            label="Abbreviated Committee Name"
            ref={commNameRef}
            onEnter={handleRegister}
          />
          <Checkbox
            label={
              <>
                I have read and agree to the{" "}
                <Link className="eula_link" to="/eula" target="_blank">
                  EULA
                </Link>
              </>
            }
            ref={eulaRef}
          />
        </div>
      </div>

      <Notice visible={Boolean(error)} message={error} type="error"/>
    </div>
  );

  async function handleRegister() {
    if (!auth) return
    const submission = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      confirmPassword: confirmPassRef.current?.value || "",
      confName: confNameRef.current?.value || "",
      commName: commNameRef.current?.value || "",
      eula: Boolean(eulaRef.current?.checked),
    };
    registerAccount(auth, submission)
      .then((creds) => {
        navigate(`/app/${creds.user.uid}`);
      })
      .catch(e => {setFadingWarning(e.message)});
  }

  function setFadingWarning(message: string) {
    setError(message);
    setTimeout(() => {
      setError("");
    }, MESSAGE_DURATION_MS);
  }
}

export default Register;
