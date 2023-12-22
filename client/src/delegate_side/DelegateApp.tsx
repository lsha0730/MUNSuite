import {
  useEffect,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";
import { get, getDatabase, onValue, ref, set } from "firebase/database";
import "./DelegateApp.scoped.css";
import {
  AccountType,
  Delegate,
  FirebaseDataDelegate,
  FirebaseDataTarget,
  Settings,
  oneArgFn,
} from "../common/types/types";

import LoginPage from "./login_page/LoginPage";
import Dashboard from "./dashboard/Dashboard";
import InvalidLink from "./invalid_link/InvalidLink";

import { appContext, delegateContext } from "../common/Context";
import { getHostAccountInfo } from "../common/utils/http";
import { setUpFirebaseListeners } from "../common/utils/firebase";
import { useLocation } from "react-router-dom";
import { StaffAccountInfo } from "../staff_side/StaffApp";
import { Question } from "../common/types/questionTypes";
import { Directive } from "../common/types/directiveTypes";
import {
  BLANK_DELEGATIONS,
  BLANK_FORM,
  BLANK_HOST_ACCOUNT_INFO,
  BLANK_PENDINGS,
  BLANK_PROCESSED,
  BLANK_SETTINGS,
} from "../common/constants";

export type DelegateAPI = {
  user: Delegate | null;
  setUser: Dispatch<SetStateAction<Delegate | null>>;
  hostAccountInfo: StaffAccountInfo;
};

function DelegateApp() {
  const { database } = useContext(appContext);
  const { pathname } = useLocation();
  const hostID = pathname.slice(6); // pathname is "/form/<uuid>"
  const [linkValidity, setValidLink] = useState("loading");
  const [user, setUser] = useState<Delegate | null>(null);
  const [hostAccountInfo, setHostAccountInfo] = useState<StaffAccountInfo>(
    BLANK_HOST_ACCOUNT_INFO
  );
  const delegateAPI: DelegateAPI = {
    user,
    setUser,
    hostAccountInfo,
  };

  const [delegations, setDelegations] = useState<Delegate[]>(BLANK_DELEGATIONS);
  const [form, setForm] = useState<Question[]>(BLANK_FORM);
  const [pendings, setPendings] = useState<Directive[]>(BLANK_PENDINGS);
  const [processed, setProcessed] = useState<Directive[]>(BLANK_PROCESSED);
  const [settings, setSettings] = useState<Settings>(BLANK_SETTINGS);
  const firebaseData: FirebaseDataDelegate = {
    delegations,
    form,
    pendings,
    processed,
    settings,
  };

  useEffect(() => {
    if (!hostID) return;
    getHostAccountInfo(hostID, setHostAccountInfo);
  }, [hostID]);

  useEffect(() => {
    if (!database) return;

    onValue(ref(database, `appdata/${hostID}/livedata/form`), (snapshot) => {
      setValidLink(snapshot.exists() ? "valid" : "invalid");
    });

    setUpFirebaseListeners(database, `appdata/${hostID}/livedata`, [
      {
        target: FirebaseDataTarget.Delegations,
        onValue: setDelegations as oneArgFn,
      },
      { target: FirebaseDataTarget.Form, onValue: setForm as oneArgFn },
      { target: FirebaseDataTarget.Pendings, onValue: setPendings as oneArgFn },
      {
        target: FirebaseDataTarget.Processed,
        onValue: setProcessed as oneArgFn,
      },
      { target: FirebaseDataTarget.Settings, onValue: setSettings as oneArgFn },
    ]);
  }, [database]);

  // Firebase: Writing
  function writeToFirebase(target: any, content: any) {
    if (database && ["pendings"].includes(target) && linkValidity) {
      // Delegate side only writes to pendings
      if (content.length > 0) {
        set(ref(database, `appdata/${hostID}/livedata/${target}`), content);
      }
    }
  }

  useEffect(() => {
    const storedCode = sessionStorage.getItem("code");
    if (!storedCode) {
      setUser(null);
      return;
    }
    // TODO: Replace this suspicious del-side auth method
    const delegate = delegations.find((d) => d.code === storedCode) || null;
    setUser(delegate);
  }, [delegations]);

  const screens = {
    loading: <div />,
    valid:
      user && delegateIsInDelegateList(user) ? (
        <Dashboard key="dashboard" submit={submit} />
      ) : (
        <LoginPage />
      ),
    invalid: <InvalidLink />,
  };

  return (
    <delegateContext.Provider value={{ delegateAPI, firebaseData }}>
      <div className="app_container">{(screens as any)[linkValidity]}</div>
    </delegateContext.Provider>
  );

  function delegateIsInDelegateList({ name }: Delegate) {
    return delegations.map((d) => d.name).includes(name);
  }

  function submit(submissionObj: any) {
    if (!database) return;
    get(ref(database, `appdata/${hostID}/livedata/pendings`)).then(
      (snapshot) => {
        let currPendings = snapshot.exists() ? snapshot.val() : [];
        writeToFirebase("pendings", currPendings.concat(submissionObj));
      }
    );
  }
}

export default DelegateApp;
