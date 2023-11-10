import React from "react";
import "../Home.scoped.css";

function FeatureItem({
  textPosition,
  img,
  heading,
  subheading,
  icon,
  mobile = false,
}) {
  return (
    <div
      className={
        textPosition == "right"
          ? "home-feature-group-imgText"
          : "home-feature-group-textImg"
      }
    >
      <img src={img} className="features-image" />
      <div className="feature-text-group">
        <div className="features-icon-heading-group">
          {icon}
          <p className="feature-text-heading">{heading}</p>
        </div>
        <p className="feature-text-subheading">{subheading}</p>
      </div>
    </div>
  );
}

export default FeatureItem;
