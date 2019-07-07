import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// import { Container, Link as Button } from "react-floating-action-button";

import TopBanner from "./TopBanner";
import Logs from "./Logs/Logs";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FixedButton from "../UIKit/FixedButton";

const logs = [
  {
    date: "July 8",
    phrase: "I accept myself."
  },
  {
    date: "July 7",
    phrase: "I am beautiful no matter what they say."
  },
  {
    date: "July 2",
    phrase: "Be yourself."
  }
  // {
  //   date: "June 30",
  //   phrase: "I am not a present for your friends to open."
  // }
  // {
  //   date: "June 27",
  //   phrase: "Parang may problema pa rin."
  // }
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    };
  }

  render() {
    return (
      <Fragment>
        <TopBanner />
        <div className="columns">
          {logs.map(log => (
            <Logs date={log.date} phrase={log.phrase} />
          ))}
        </div>
        <FixedButton>
          <div className="columns">
            <div className="column p-1">
              <Link to="/how-are-you">
                <button className="button is-primary is-large is-fullwidth">
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Encourage me
                </button>
              </Link>
            </div>
            <div className="column p-1">
              <Link to="/login">
                <button className="button is-info is-danger is-fullwidth">
                  Sign out
                </button>
              </Link>
            </div>
          </div>
        </FixedButton>
      </Fragment>
    );
  }
}

export default Home;
