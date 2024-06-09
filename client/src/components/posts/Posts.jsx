import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';
import Post from './post/Post'; // Import the Post component



const Posts = ({setCurrentId}) => {
  // useSelector is used to fetch data from redux store
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <div>
      {!posts.length ? <CircularProgress /> : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={10} md={6}>
              <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
          ))}
        </Grid>
      )
      }
    </div>
  );
};

export default Posts;
