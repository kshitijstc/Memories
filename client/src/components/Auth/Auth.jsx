import React, { useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Input from "./Input";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const state = null;
  
  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () => setShowPassword(!showPassword);
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: '20px', marginTop: '30px' }}>
        <Avatar 
          sx={{
            margin: "10px auto 20px auto",
            backgroundColor: "primary.main",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          variant="h5"
          sx={{textAlign: "center",}}
        >
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={3}
            sx={{
              padding: "20px",
              textAlign: "center"}}
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
          <Button type="submit" fullWidth variant="contained" color="primary" 
            sx={{ 
            margin: "10px 0",
            fontSize: "16px",
            fontWeight: "bold",
            letterSpacing: "1px",
            }}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          
          {/* <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
            <GoogleLogin
              onSuccess={(response) => {
                console.log(response);
              }}
              onFailure={(response) => {
                console.log(response);
              }}
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
            />
            <GoogleLogout
              render={(renderProps) => (
                <Button
                  className={classes.logout}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Logout
                </Button>
              )}
            />
          </GoogleOAuthProvider> */}
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
