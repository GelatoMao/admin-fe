import React, { Component } from "react";
import PageTitle from "component/page-title/index.jsx";
import "./index.css";

export default class Home extends Component {
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="首页">
          <button className="btn btn-warning">
            test
          </button>
        </PageTitle>
        <div className="row">
          <div className="col-md-12">body</div>
        </div>
      </div>
    );
  }
}
