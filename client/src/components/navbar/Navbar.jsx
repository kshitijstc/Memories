import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@mui/material";
import MemoriesLogo from "../../images/MemoriesLogo.jpg";
import "../../app.css";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode  } from "jwt-decode";


const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = user?.token;
    // JWT token expiration setup
    if (token) {
      const decodedToken = jwtDecode (token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  }

  // console.log("User:", user);
  return (
    <AppBar className="appBar" position="static" color="inherit">
      <Toolbar className="toolbar">
        <Link to="/" className="logo-container">
        <img className="image" src={MemoriesLogo} alt="memories" height="70 rem"/>
        </Link>
        <div className="toolbar-buttons">
          {user ? (
            <div className="profile">
              <Avatar
                className="avatar"
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className="userName" variant="h6">
                {user.result.name}
              </Typography>
              <Button className="logout" variant="contained" color="secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
