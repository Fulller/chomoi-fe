import React, { Fragment } from "react";
import Router from "@app/Router";
import { ConfigProvider, App as AntApp } from "antd";
import { ToastContainer } from "react-toastify";
import useInitialApp from "@hooks/useInitialApp";
import "react-toastify/dist/ReactToastify.css";
import "./tailwind.css";
import "./global.css";

function App() {
  useInitialApp();
  return (
    <ConfigProvider>
      <AntApp>
        <Router></Router>
        <ToastContainer />
      </AntApp>
    </ConfigProvider>
  );
}
export default App;
