import React from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import moment from "moment";
import { Button } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/Posts";
// Define styled components
const Media = styled(CardMedia)({
  height: 0,
  paddingTop: "56.25%", // 16:9 aspect ratio
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backgroundBlendMode: "darken",
});

const Border = styled(Box)({
  border: "solid",
});

const FullHeightCard = styled(Card)({
  height: "100%",
});

const CustomCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "15px",
  height: "100%",
  position: "relative",
});

const Overlay = styled(Box)({
  position: "absolute",
  top: "20px",
  left: "20px",
  color: "white",
});

const Overlay2 = styled(Box)({
  position: "absolute",
  top: "20px",
  right: "20px",
  color: "white",
});
const Details = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  margin: "20px",
});

const Title = styled(Typography)({
  padding: "0 5px",
  
});

const CustomCardActions = styled(CardActions)({
  padding: "0 16px 8px 16px",
  display: "flex",
  justifyContent: "space-between",
});

const Post = ({ post , setCurrentId}) => {
  const dispatch = useDispatch();
  return (
    <CustomCard>
      <Media image={post.selectedFile} title={post.title} />
      <Overlay>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </Overlay>
      <Overlay2>
        <Button style={{ color: "white" }} size="small" onClick={() => {setCurrentId(post._id)}}>
          <MoreHorizIcon fontSize="default" />
        </Button>
      </Overlay2>
      <Details>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </Details>
      
      
      <CardContent>
      <Title variant="h5" >{post.title}</Title>
      <Typography variant="body2" component="p" color="textSecondary">{post.message}</Typography>
      </CardContent>
      <CustomCardActions>
        <Button size="small" color="primary" onClick={() => {dispatch(likePost(post._id))}}>
          <ThumbUpAltIcon fontSize="small" />
          Like&nbsp;{post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id))}}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CustomCardActions>
    </CustomCard>
  );
};

export default Post;
