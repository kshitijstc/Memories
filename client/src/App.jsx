import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/auth" element={<Auth />} exact />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
