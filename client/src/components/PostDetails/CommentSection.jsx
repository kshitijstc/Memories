import React,{useState,useRef,useEffect} from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import {styled} from '@mui/material/styles';
// import "./CommentSection.css";
import { commentPost } from '../../actions/Posts';


const Outercontainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
});
const Innercontainer = styled('div')({
    height: '200px',
    overflowY: 'scroll',
    overflowX: 'none',
    marginRight: '30px',
});


const CommentSection = ({post}) => {
  const [comments, setComments] = useState(post?.comments || []);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    console.log(post.comments); // Inspect the structure of post.comments
  }, [post]);

  const handleClick = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));
    setComment('');
    setComments(newComments);
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <Outercontainer>
        <Innercontainer>
        <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              {c}  <br/>
            </Typography>
          ))}
        
          <div ref={commentsRef} />
        </Innercontainer>
        {user?.result?.name && (<div style={{width:'60%'}}>
            <Typography variant="h6" gutterBottom>Write a Comment</Typography>
            <TextField
              fullWidth
              rows={4}
              multiline
              variant="outlined"
              label="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br/>
            <Button style={{ marginTop: '10px' }} fullWidth color="primary" variant="contained"
            disabled={!comment.length}
            onClick={handleClick}>
              Comment
            </Button>
        </div>
    )}
        
    </Outercontainer>
  );
};

export default CommentSection;