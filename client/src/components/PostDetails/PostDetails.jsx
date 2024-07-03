import React,{useEffect} from 'react';
import { Divider, Typography, Paper, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams,useNavigate } from 'react-router-dom';
import moment from 'moment';
import {styled} from '@mui/material/styles';
import {getPost , getPostBySearch} from "../../actions/Posts";
import MemoriesLogo from '../../images/MemoriesLogo.jpg';
import CommentSection from './CommentSection';
import './PostDetails.css';

const Media = styled('img')({
  borderRadius: '20px',
  objectFit: 'cover',
  width: '650px',
  maxHeight: '400px',
  })
  const ImageSection = styled('div')(({ theme }) => ({
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  }));

  const Card = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  }));
  const Section = styled('div')(({ theme }) => ({
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  }));

//   recommendedPosts: {
//     display: 'flex',
//     [theme.breakpoints.down('sm')]: {
//       flexDirection: 'column',
//     },
//   },
//   loadingPaper: {
//     display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
//   },
// }));

const PostDetails = () => {
  console.log('POST DETAILS');
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(()=>{
    dispatch(getPost(id));
  },[id]);

  // useEffect(()=>{
  //   if(post){
  //     dispatch(getPostBySearch({ search:post.title }))
  //   }
  // },[post]);

  if(!post) return null;
  if(isLoading){
    return <Paper elevation={6}><CircularProgress size="7em"/></Paper>
  }
  const recommendedPosts= posts.filter(({_id})=> _id!==post._id);
  
  const openPost = (_id) => {
    navigate(`/posts/${_id}`);
  }
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
    <Card>
      <Section>
        <Typography variant="h3" component="h2">{post.title}</Typography>
        <Typography gutterBottom variant='h6' color='textSecondary' component='h2'>{post.tags.map((tag) => `#${tag} `)}</Typography>
        <Typography variant="body1" component="p">{post.message}</Typography>
        <Typography variant="h6">Created by: {post.creater}</Typography>
        <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
        <Divider style={{ margin: '20px 0' }} />
        <CommentSection post={post}/>
        <Divider style={{ margin: '20px 0' }} />
      </Section>
      <ImageSection>
        <Media src={ post.selectedFile ||
          `https://memories-24-7.onrender.com/${post.selectedFile}` || 
          `http://localhost:5000/${post.selectedFile}` || MemoriesLogo}></Media>
      </ImageSection>
    </Card>
    {recommendedPosts.length && 
    <div>
      <Typography gutterBottom variant="h5">You might also like:</Typography> 
      <Divider/>
      <div>
        {recommendedPosts.map(({title,selectedFile,message,_id,name,likes}) => {
          <div style={{margin:'20px',cursor:"pointer"}} onclick={() => openPost(_id)} key={_id}>
            <Typography gutterBottom variant='h6'>{title}</Typography> 
            <Typography gutterBottom variant='subtitle2'>{name}</Typography> 
            <Typography gutterBottom variant='subtitle2'>{message}</Typography> 
            <Typography gutterBottom variant='subtitle1'>{likes.length}</Typography> 
            <img src={`${selectedFile} || https://memories-24-7.onrender.com/${selectedFile}` || `
            http://localhost:5000/${selectedFile}` || MemoriesLogo} alt={title} width="200px"/>
          </div>
        })}
      </div>
    </div>
    }
    </Paper>
  )
};

export default PostDetails;