import React from "react";

const Layout = ({ children }) => (
  <section className="app p-5">
    <div className="columns is-centered">
      <div className="column is-half">{children}</div>
    </div>
  </section>
);

export default Layout;
