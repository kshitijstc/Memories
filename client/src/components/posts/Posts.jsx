import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';
import Post from './post/Post'; // Import the Post component



const Posts = ({setCurrentId}) => {
  // useSelector is used to fetch data from redux store
  const {posts,isLoading} = useSelector((state) => state.posts);
  console.log(posts);
  // const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  if(!posts.length && !isLoading) return 'No posts';
  return (
    <div>
      {isLoading ? <CircularProgress /> : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
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
