import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./App.scoped.css";
import { appContext } from "./common/Context";
import { onAuthStateChanged } from "firebase/auth";
import { useMediaQuery } from "react-responsive";

import {
  Login,
  Register,
  Eula,
  Footer,
  Forgot,
  Home,
  Navbar,
  Plans,
  OrderInstructions,
} from "./product_site";
import StaffApp from "./staff_side/StaffApp";
import DelegateApp from "./delegate_side/DelegateApp";
import { configureFirebase } from "./common/utils/firebase";
import { classNames } from "./common/utils/utils";

const DESKTOP_BREAKPOINT_PX = 641;
const GRAY_BG_PAGES = ["/register", "/login", "/forgot", "/prepayment"];

function App() {
  const { app, auth, database, analytics } = configureFirebase();
  const [user, setUser] = useState(auth.currentUser);
  const isPortrait = useMediaQuery({
    query: `(max-width: ${DESKTOP_BREAKPOINT_PX}px)`,
  });
  const { pathname } = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  return (
    <appContext.Provider
      value={{ app, auth, database, analytics, user, isPortrait }}
    >
      <div
        className={classNames(
          "app_container",
          GRAY_BG_PAGES.includes(pathname) ? "gray_bg" : ""
        )}
      >
        <Navbar />
        <div className="UI_container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={
                user ? <Navigate to={`/app/${user.uid}`} /> : <Register />
              }
            />
            <Route
              path="/login"
              element={user ? <Navigate to={`/app/${user.uid}`} /> : <Login />}
            />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/prepayment" element={<OrderInstructions />} />
            <Route path="/eula" element={<Eula />} />
            <Route
              path="/app/*"
              element={user ? <StaffApp /> : <Navigate to="/login" />}
            />
            <Route path="/form/*" element={<DelegateApp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </appContext.Provider>
  );
}

export default App;
