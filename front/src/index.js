import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import InterTTF from "./assets/Inter.ttf";

const GlobalStyle = createGlobalStyle`
${reset}
margin: 0 auto;
@font-face {
  font-family: 'Inter';
  src: local('Inter'), local('Inter');
  font-style: normal;
  src: url(${InterTTF}) format('truetype');
}
 `;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
