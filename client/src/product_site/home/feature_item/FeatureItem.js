import "./FeatureItem.scoped.css";
import { classNames } from "../../../common/utils/utils";

function FeatureItem({ textPosition, img, heading, subheading, icon }) {
  return (
    <div
      className={classNames(
        "container",
        textPosition == "right" ? "img-text" : "text-img"
      )}
    >
      <img src={img} className="image" />
      <div className="text">
        <div className="icon-heading-group">
          {icon}
          <p className="heading">{heading}</p>
        </div>
        <p className="subheading">{subheading}</p>
      </div>
    </div>
  );
}

export default FeatureItem;
