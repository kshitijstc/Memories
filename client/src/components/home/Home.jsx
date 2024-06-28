import { React, useState, useEffect } from "react";
import { Container, Grow, Grid, Paper, AppBar, Button, TextField, Chip } from "@mui/material";
import {  styled } from "@mui/material/styles";
import Posts from "../posts/Posts";
import Form from "../form/Form";
import { useDispatch } from "react-redux";
import { getPosts,getPostBySearch } from "../../actions/Posts";
import { useTheme, useMediaQuery } from "@mui/material";
import "../../app.css";
import Paginate from "../Pagination";
import { useNavigate,useLocation } from "react-router-dom";


const Pagination = styled(Paginate)({
  borderRadius: 3,
  marginTop: '1 rem',
  padding: '16px',
});

const AppBarSearch = styled(AppBar)({
  borderRadius: 4,
  marginTop: '1 rem',
  padding: '16px',
  display: 'flex',
});
// this is a custom hook to get the query parameters from the URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  // const[tags, setTags] = useState([]);

  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleKeyPress = (e) => {
    // search for posts when the user presses the enter key
    // the enter key has a key code of 13
    if (e.keyCode === 13) {
      searchPost();
    }
  }
  // const handleAdd = (tag) => {
  //   setTags([...tags, tag]);
  // }
  // const handleDelete = (tagToDelete) => {
  //   setTags(tags.filter((tag) => tag !== tagToDelete));
  // }
  const searchPost = () => { 
    if (search.trim()) {
      // dispatch to search for posts
      dispatch(getPostBySearch(search));
      // This is done so that if we want to send a friend the search query, we can do so by directly copying the URL and sending it to them
      navigate(`/posts/search?searchQuery=${search || "none"}`);
    } else {
      navigate("/");
    }
  }
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
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {!searchQuery && (
              <Paper sx={{ padding: 2, margin: "10px 0" }}>
                <Pagination page={page} />
              </Paper>
            )}
            <AppBarSearch position="static" color="inherit" sx={{ padding: 2 }}>
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyDown={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);  
                }}
              />
              {/* <Chip
                label="Search Tags"
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                sx={{ marginTop: 2 }}
              /> */}
              <Button onClick={searchPost}  
              variant="contained" sx={{ marginTop: 2 }}
              >Search</Button>
            </AppBarSearch>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
