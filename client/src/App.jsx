import React, { useState,useEffect } from "react";
import memories from "./images/memories.jpg";
import {Container,AppBar,Typography,Grow,Grid} from "@mui/material";
import Posts from "./components/posts/Posts";
import Form from "./components/form/Form";
import "./styles.css";
import { useDispatch } from "react-redux";
import {getPosts} from './actions/Posts';
import { useTheme, useMediaQuery } from "@mui/material";

const App = () => {
  const [currentId,setCurrentId]=useState(null);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getPosts());
  },[currentId,dispatch]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container maxWidth="lg">
      <AppBar className="appBar" position="static" color="inherit">
        <Typography className="heading" variant="h2" align="center">Memories <img className="image" src={memories} alt="memories" height="60" /></Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3} sx={{ flexDirection: isMobile ? "column-reverse" : "row" }}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}  />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
