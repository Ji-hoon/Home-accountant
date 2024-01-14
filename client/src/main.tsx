import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App.tsx";
import "./index.css";
import Landing from "./pages/Landing/Landing.tsx";

const isLogin = false;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{isLogin ? <App /> : <Landing />}</React.StrictMode>,
);
