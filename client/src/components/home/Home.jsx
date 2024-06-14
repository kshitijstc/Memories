import { React, useState, useEffect } from "react";
import { Container, Grow, Grid, Paper, AppBar, Button, TextField, Chip } from "@mui/material";
import {  styled } from "@mui/material/styles";
import Posts from "../posts/Posts";
import Form from "../form/Form";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/Posts";
import { useTheme, useMediaQuery } from "@mui/material";
import "../../app.css";
import Paginate from "../Pagination";
import { useNavigate,useLocation } from "react-router-dom";

// this is a custom hook to get the query parameters from the URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          sx={{ flexDirection: isMobile ? "column-reverse" : "row" }}
        >
          <Grid item xs={12} sm={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={3.5}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper sx={{ padding: 2, margin: "10px 0" }}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
