import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./styles.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user=JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} exact />
          <Route path="/posts" element={<Home />} exact />
          <Route path="/posts/search" element={<Home />} exact />
          <Route path="/posts/:id" element={<PostDetails />} exact />
          <Route path="/auth" element={(!user ? <Auth/> : <Navigate to="/posts"/>)} exact />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
