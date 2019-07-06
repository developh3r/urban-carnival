import React from "react";
import classNames from "classnames";
// import styles from "./layout.module.scss";

const Layout = ({ children }) => (
  <section className={classNames("app p-5")}>
    <div className="columns is-centered">
      <div className="column is-half">{children}</div>
    </div>
  </section>
);

export default Layout;
