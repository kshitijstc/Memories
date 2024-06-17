import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
import {rootReducer} from "./reducers";
import "./index.css";
import { GoogleOAuthProvider, } from "@react-oauth/google";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Correct way to add middleware
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="414201799122-0tcbah6qssjf69p54hli6on5praq3q0e.apps.googleusercontent.com">
    <Provider store={store}>
      <App/>
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
