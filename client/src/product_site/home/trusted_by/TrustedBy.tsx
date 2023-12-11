import "./TrustedBy.scoped.css";
import Hoverable from "../../../common/components/hover/Hover";

const TRUSTING_CONFS = [
  {
    name: "Horizons",
    img: require("../../../common/assets/images/customer_logos/horizons.png"),
    url: "https://horizons.cahsmun.org",
  },
  {
    name: "CAHSMUN",
    img: require("../../../common/assets/images/customer_logos/cahsmun.png"),
    url: "https://cahsmun.org",
  },
  {
    name: "VMUN",
    img: require("../../../common/assets/images/customer_logos/vmun.png"),
    url: "https://vmun.com",
  },
  {
    name: "TMUN",
    img: require("../../../common/assets/images/customer_logos/tmun.png"),
    url: "https://tmun.ca",
  },
];

const TrustedBy = () => {
  return (
    <div className="trusted_by">
      {TRUSTING_CONFS.map((conf) => (
        <Hoverable
          message={conf.name}
          href={conf.url}
          messageStyle={{ width: 75, textAlign: "center", padding: 0 }}
          pos={{ bottom: -20 }}
          style={{ width: "fit-content", height: "fit-content" }}
        >
          <img src={conf.img} className="logo" />
        </Hoverable>
      ))}
    </div>
  );
};

export default TrustedBy;
