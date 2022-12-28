// // Copyright (c) Microsoft Corporation.
// // Licensed under the MIT license.

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './app/App';
// import { SwitchableFluentThemeProvider } from './app/theming/SwitchableFluentThemeProvider';

// if (document.getElementById('root') !== undefined) {
//   ReactDOM.render(
//     <SwitchableFluentThemeProvider scopeId="SampleChatApp">
//       <div className="wrapper">
//         <App />
//       </div>
//     </SwitchableFluentThemeProvider>,
//     document.getElementById('root')
//   );
// }

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { SwitchableFluentThemeProvider } from './app/theming/SwitchableFluentThemeProvider';
//import AppStarter from "./app/AppStarter";

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>    
    <MsalProvider instance={msalInstance}>
    <SwitchableFluentThemeProvider scopeId="SampleChatApp">
      <App />
      </SwitchableFluentThemeProvider>
    </MsalProvider>
  </React.StrictMode>
);
  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
