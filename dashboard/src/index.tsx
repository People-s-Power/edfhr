import React from "react";
import ReactDOM from "react-dom";
import "styles/index.scss";
import "styles/styles.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals.js";
import { RecoilRoot } from "recoil";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
