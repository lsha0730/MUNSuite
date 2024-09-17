import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Auth.scoped.css";
import { appContext } from "../../common/Context";
import { syntaxCheckEmail } from "../../common/utils/utils";
import { Button, TextInput } from "../../common/components/input";
import Notice from "../../common/components/notice/Notice";

const MESSAGE_DURATION_MS = 3000

const Login = () => {
  const navigate = useNavigate();
  const { auth, user } = useContext(appContext);
  const [error, setError] = useState<string>("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div className="container">
      <p className="header">Log In</p>

      <div className="form_col">
        <TextInput label="Email" ref={emailRef} onEnter={handleLogin} />
        <TextInput label="Password" ref={passwordRef} onEnter={handleLogin} type="password"/>
        <p className="additional-text" style={{ marginTop: "10px" }}>
          <Link to="/forgot" className="additional-link">
            Forgot Password?
          </Link>
        </p>

        <Button
          label={
            <p
              className="additional-text"
              style={{ marginTop: "100px", marginBottom: "10px" }}
            >
              Don't have an account?&nbsp;
              <Link to="/register" className="additional-link">
                Register!
              </Link>
            </p>
          }
          onClick={handleLogin}
          padding="lg"
        >Log In</Button>
      </div>

      <Notice visible={Boolean(error)} message={error} type="error"/>
    </div>
  );

  function handleLogin() {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const incomplete = [email, password].some((e) => e == "");
    const validEmail = syntaxCheckEmail(email)
    if (incomplete) {
      setFadingWarning("Fields Incomplete");
      return
    }
    if (!validEmail) {
      setFadingWarning("Invalid Email");
      return
    }
    if (auth) signInWithEmailAndPassword(auth, email, password)
      .then((creds) => {
        navigate(`/app/${creds.user.uid}`);
      })
      .catch((error) => {
        if (error.code == "auth/wrong-password") setFadingWarning("Wrong Password");
      });
  }

  function setFadingWarning(message: string) {
    setError(message);
    setTimeout(() => {
      setError("");
    }, MESSAGE_DURATION_MS);
  }
}

export default Login;
