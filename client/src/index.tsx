// v18이전
// import React from "react";
// import ReactDOM from "react-dom";
// import { App } from "./App";

// ReactDOM.hydrate(<App />, document.getElementById("root"));

// v18 이후
import ReactDOM from "react-dom/client";
import { App } from "./App";

const rootNode = document.getElementById("root")!;
const root = ReactDOM.hydrateRoot(rootNode, <App />);
