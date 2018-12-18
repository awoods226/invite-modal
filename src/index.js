import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import WebFont from "webfontloader";
import "./index.css";

WebFont.load({
  google: {
    families: ["Montserrat:300,400,700", "sans-serif"]
  }
});

ReactDOM.render(
  <App trigger={document.querySelector(".invite-button")} />,
  document.getElementById("invite-root")
);
