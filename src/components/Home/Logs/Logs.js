import React from "react";

const Logs = ({ date, phrase }) => {
  return (
    <div className="column is-4">
      <div className="card">
        <div className="card-content">
          <h3 className="is-size-4">{date}</h3>
          {phrase}
        </div>
      </div>
    </div>
  );
};

export default Logs;
