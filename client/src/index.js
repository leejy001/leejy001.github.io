import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import LoadUser from "./components/auth/loadUser";

LoadUser();

ReactDom.render(<App />, document.getElementById("root"));
