import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { MetaMaskProvider } from "metamask-react";

import 'bootstrap/dist/css/bootstrap.min.css'



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
<MetaMaskProvider>
      <App />
      </MetaMaskProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

  <App />
