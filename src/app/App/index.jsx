import React, { Fragment } from "react";
import Router from "@app/Router";
import { ToastContainer } from "react-toastify";
import useInitialApp from "@hooks/useInitialApp";
import "react-toastify/dist/ReactToastify.css";
import "./tailwind.css";
import "./global.css";

function App() {
  useInitialApp();
  return (
    <Fragment>
      <Router></Router>
      <ToastContainer />
    </Fragment>
  );
}
export default App;
