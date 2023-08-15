import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
