import { CSSProperties, ReactNode } from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { ImFontSize, ImSearch } from "react-icons/im";
import "./Home.scoped.css";

import delside from "../../common/assets/images/mockups/delside.png";
import delegations from "../../common/assets/images/mockups/delegations.png";
import form from "../../common/assets/images/mockups/form.png";
import inbox from "../../common/assets/images/mockups/inbox.png";
import history from "../../common/assets/images/mockups/history.png";
import statistics from "../../common/assets/images/mockups/statistics.png";
import notes from "../../common/assets/images/mockups/notes.png";

export const ADWORDS = [
  "Optimized",
  "Revamped",
  "Upgraded",
  "Modernized",
  "Innovated",
  "Simplified",
  "Transformed",
  "Overhauled",
  "Streamlined",
  "Enhanced",
  "Reimagined",
  "Digitalized",
  "Accelerated",
];

type Feature = {
  heading: string;
  subheading: string;
  img: string;
  icon: ReactNode;
};

type Image = {
  img: string;
  alt: string;
  style: CSSProperties;
};

export const FEATURES: Feature[] = [
  {
    heading: "Personalized Delegate Dashboards.",
    subheading:
      "Directive status communication, a submission history, and password gating.",
    img: delside,
    icon: <BsFillPersonLinesFill size={50} className="features_icon" />,
  },
  {
    heading: "Directives you can actually read.",
    subheading: "And a form shutoff for when things get a little too crazy.",
    img: inbox,
    icon: <ImFontSize size={50} className="features_icon" />,
  },
  {
    heading: "A Directives History Page.",
    subheading:
      "This time when you leave your desk, the whole pile won't just disappear.",
    img: history,
    icon: <FaHistory size={50} className="features_icon" />,
  },
  {
    heading: "Auto-collected Delegate Statistics.",
    subheading:
      "Automatically curated, to show who's putting money where their mouth is.",
    img: statistics,
    icon: <GoGraph size={50} className="features_icon" />,
  },
  {
    heading: "Searchable Notes for Every Delegate.",
    subheading:
      "Evaluate and compare delegates with a dedicated UI. No more scribbled papers.",
    img: notes,
    icon: <ImSearch size={50} className="features_icon" />,
  },
];

export const IMAGES: Image[] = [
  {
    img: delegations,
    alt: "Delegations UI Image",
    style: { position: "absolute", top: "-70px", left: "200px" },
  },
  {
    img: form,
    alt: "Form UI Image",
    style: { position: "absolute", bottom: "-50px", left: "0px" },
  },
  {
    img: history,
    alt: "History UI Image",
    style: { position: "absolute", bottom: "-100px", right: "200px" },
  },
  {
    img: statistics,
    alt: "Statistics UI Image",
    style: { position: "absolute", top: "-120px", left: "-20px" },
  },
  {
    img: notes,
    alt: "Notes UI Image",
    style: { position: "absolute", bottom: "0px", right: "-100px" },
  },
];

export const TRUSTING_CONFS = [
  {
    name: "Horizons",
    img: require("../../common/assets/images/customer_logos/horizons.png"),
    url: "https://horizons.cahsmun.org",
  },
  {
    name: "CAHSMUN",
    img: require("../../common/assets/images/customer_logos/cahsmun.png"),
    url: "https://cahsmun.org",
  },
  {
    name: "VMUN",
    img: require("../../common/assets/images/customer_logos/vmun.png"),
    url: "https://vmun.com",
  },
  {
    name: "TMUN",
    img: require("../../common/assets/images/customer_logos/tmun.png"),
    url: "https://tmun.ca",
  },
];
