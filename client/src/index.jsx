import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
import {rootReducer} from "./reducers";
import "./index.css";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Correct way to add middleware
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
