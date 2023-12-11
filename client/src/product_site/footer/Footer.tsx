import "./Footer.scoped.css";
import { FaLinkedin } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { INQUIRY_EMAIL, LINCOLN_LINKEDIN } from "../../common/constants";

function Footer() {
  const { pathname } = useLocation();
  const onAppPage = /\/app\/\w*/i.test(pathname);
  const onDelegatePage = /\/form\/\w*/i.test(pathname);
  const showFooter = !onAppPage && !onDelegatePage;

  return (
    showFooter && (
      <div className="footer">
        <div className="text">
          MUNSuite © 2022&nbsp;&nbsp;|&nbsp;&nbsp;By
          <a className="name" href={LINCOLN_LINKEDIN}>
            Lincoln Lee&nbsp;
            <FaLinkedin size={16} />
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a style={{ color: "#BCBCBC" }} href={`mailto:${INQUIRY_EMAIL}`}>
            Shoot me an email!
          </a>
        </div>
      </div>
    )
  );
}

export default Footer;
