import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import "semantic-ui-css/semantic.css";
import "./index.css";

ReactDOM.render(
  <App trigger={document.querySelector(".invite-button")} />,
  document.getElementById("invite-root")
);
