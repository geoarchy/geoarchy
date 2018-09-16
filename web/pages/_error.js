import React from "react";

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    const message = err ? err.message : null;
    if (!process.browser) {
    }
    return { statusCode, message };
  }

  render() {
    return (
      <React.Fragment>
        <main>
          <h1>{`${this.props.statusCode || "Web Client"} error`}</h1>
          <p>
            {this.props.statusCode
              ? `An error ${this.props.statusCode} occurred on server: ${this
                  .props.message || ""}`
              : "An error occurred on client"}
          </p>
        </main>
      </React.Fragment>
    );
  }
}
