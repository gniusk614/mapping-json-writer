// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import jsonReader from './lib/mappingRule.json'
import { Provider } from "react-redux";
import { createStore } from "redux";

const initState = JSON.stringify(jsonReader,null,2);

function reducer(state = initState, action) {
  console.log("action->>" + action.type);
  switch (action.type) {
    case "write":
      console.log("??");
      jsonReader.push = action.data
      console.log(jsonReader)
      state = jsonReader
      return state;
    default:
      return state;
  }
}

let store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
