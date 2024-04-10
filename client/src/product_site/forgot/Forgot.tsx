import { useContext, useRef, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import "./Forgot.scoped.css";
import { BiPaperPlane } from "react-icons/bi";
import { syntaxCheckEmail } from "../../common/utils/utils";
import { appContext } from "../../common/Context";
import { Button, ShortText } from "../../common/components/input";
import Notice from "../../common/components/notice/Notice";

const MESSAGE_DURATION_MS = 3000;

const Forgot = () => {
  const { auth } = useContext(appContext);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <div className="centering_container">
      {emailSent ? (
        <div className="content">
          <BiPaperPlane size={100} className="icon" />
          <p className="header">Email Sent!</p>
          <p className="subheader">Check your inbox</p>
        </div>
      ) : (
        <div className="content">
          <p className="header">Reset Password</p>

          <div className="inputs">
            <ShortText
              ref={emailRef}
              label="Account Email"
              onEnter={handleForgot}
            />
            <Button onClick={handleForgot} padding="lg">Send Email</Button>
          </div>
        </div>
      )}
      <Notice visible={Boolean(error)} message={error} type="error"/>
    </div>
  );

  function handleForgot() {
    const email = emailRef.current?.value || "";
    const incomplete = email === "";
    const validEmail = syntaxCheckEmail(email)

    if (incomplete) {
      setFadingWarning("Fields Incomplete");
      return
    }
    if (!validEmail) {
      setFadingWarning("Invalid Email");
      return
    }

    if (auth) sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmailSent(true);
      })
      .catch((error) => {
        console.log(`Login error (${error.code}): ${error.message}`);
        if (error.code == "auth/user-not-found") {
          setFadingWarning("No user found");
        }
      });
  }

  function setFadingWarning(message: string) {
    setError(message);
    setTimeout(() => {
      setError("");
    }, MESSAGE_DURATION_MS);
  }
}

export default Forgot;
