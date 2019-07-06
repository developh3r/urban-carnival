import React from "react";
import VideoInput from "../EncourageMe/VideoInput";

const EncourageMe = () => {
  return (
    <section className="hero">
      <div className="hero-body">
        <VideoInput />
      </div>
      <button className="button is-primary">Encourage Me</button>
    </section>
  );
};

export default EncourageMe;
