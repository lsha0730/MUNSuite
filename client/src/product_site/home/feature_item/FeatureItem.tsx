import "./FeatureItem.scoped.css";
import { classNames } from "../../../common/utils/utils";
import { ReactNode } from "react";

type Props = {
  textPosition: "left" | "right";
  img: string;
  heading: string;
  subheading: string;
  icon: ReactNode;
};

function FeatureItem({ textPosition, img, heading, subheading, icon }: Props) {
  return (
    <div
      className={classNames(
        "container",
        textPosition == "right" ? "img-text" : "text-img"
      )}
    >
      <img src={img} className="image" />
      <div className="text">
        {icon}
        <p className="heading">{heading}</p>
        <p className="subheading">{subheading}</p>
      </div>
    </div>
  );
}

export default FeatureItem;
