import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Layout from "./Components/LayoutArea/Layout/Layout";
import interceptorsService from "./Services/InterceptorsService";
import { BrowserRouter } from "react-router-dom";

interceptorsService.createInterceptors();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

reportWebVitals();
