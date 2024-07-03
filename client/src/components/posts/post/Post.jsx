import React, {useState} from 'react';
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ButtonBase } from '@mui/material';
import moment from 'moment';
import { Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/Posts';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const Media = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backgroundBlendMode: 'darken',
});

const CustomCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: '15px',
  height: '100%',
  position: 'relative',
});

const Overlay = styled(Box)({
  position: 'absolute',
  top: '20px',
  left: '20px',
  color: 'white',
});

const Overlay2 = styled(Box)({
  position: 'absolute',
  top: '20px',
  right: '20px',
  color: 'white',
  zIndex: 10,  
});

const Details = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px',
});

const Title = styled(Typography)({
  padding: '0 5px',
});

const CustomCardActions = styled(CardActions)({
  padding: '0 16px 8px 16px',
  display: 'flex',
  justifyContent: 'space-between',
});
// In your React component
  const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);

  const hasLikedPost = post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id));
  const userId = user?.result?.googleId || user?.result?._id;
  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  }
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltIcon fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => navigate(`/posts/${post._id}`);

  return (
    <CustomCard raised elevation={6}>
      <ButtonBase component="span" onClick={openPost} style={{ display: 'block', textAlign: 'initial', zIndex: 1 }}>
        <Media image={post.selectedFile} title={post.title} />
        <Overlay>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </Overlay>
      </ButtonBase>
      <Overlay2>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
            <EditIcon fontSize="small" />
          </Button>
        )}
      </Overlay2>
      <ButtonBase component="span" onClick={openPost} style={{ display: 'block', textAlign: 'initial', zIndex: 1 }}>
        <Details>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </Details>
        <CardContent>
          <Title variant="h5">{post.title}</Title>
          <Typography variant="body2" component="p" color="textSecondary">{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CustomCardActions>
        <Button size="small" color="primary" onClick={handleLike} disabled={!user?.result}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="error" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CustomCardActions>
    </CustomCard>
  );
};

export default Post;

