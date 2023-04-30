import React from "react";
import styles from "./Home.module.css";

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
          ? styles.home_feature_group_imgText
          : styles.home_feature_group_textImg
      }
    >
      <img src={img} className={styles.features_image} />
      <div className={styles.feature_text_group}>
        <div className={styles.features_icon_heading_group}>
          {icon}
          <p className={styles.feature_text_heading}>{heading}</p>
        </div>
        <p className={styles.feature_text_subheading}>{subheading}</p>
      </div>
    </div>
  );
}

export default FeatureItem;
