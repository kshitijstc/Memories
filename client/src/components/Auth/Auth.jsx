import React, { useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
  Button,
} from "@mui/material";
// import Icon from "./Icon";
import { styled } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { GoogleLogin } from "@react-oauth/google";
import Input from "./Input";
import {useDispatch} from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // Prevents the page from refreshing when the form is submitted
    e.preventDefault();
    // console.log("Form Data:", formData);
    if (isSignup) {
      // Dispatch the signup action
      dispatch(signup(formData,navigate));
    } else {
      dispatch(signin(formData,navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword(!showPassword);
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    // ?. is the optional chaining operator in JavaScript that allows you to access deeply nested object properties without worrying if the property exists or not.
    const token = res?.credential;
    const decoded = jwtDecode(token);
    const result = {
      email: decoded.email,
      name: decoded.name,
      googleId: decoded.sub,
      imageUrl: decoded.picture,
    };

    try {
      dispatch({type: "AUTH", data: { result, token }});
      navigate("/");
      // console.log("Result:", result);
      // console.log("Token:", token);
    } catch (error) {
      console.log("Dispatch error:", error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try again later");
  };
  
  return (
    
    
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: "20px", marginTop: "30px" }}>
          <Avatar
            sx={{
              margin: "10px auto 20px auto",
              backgroundColor: "primary.main",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {isSignup ? "Sign up" : "Sign in"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={3}
              sx={{
                padding: "20px",
                textAlign: "center",
              }}
            >
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <GoogleLogin
              onSuccess={googleSuccess}
              onError={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                margin: "10px 0",
                fontSize: "16px",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
            
          </form>
        </Paper>
      </Container>
  );
};

export default Auth;
