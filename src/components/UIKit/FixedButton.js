import React from "react";
import classNames from "classnames";
import styles from "./uikit.module.scss";

const FixedButton = ({ children }) => {
  return (
    <div className={classNames("fixedButton", styles.fixedButton)}>
      {children}
    </div>
  );
};

export default FixedButton;
