import React from "react";
import styles from "./uikit.module.scss";

const FixedButton = ({ children }) => {
  return <div className={styles.fixedButton}>{children}</div>;
};

export default FixedButton;
