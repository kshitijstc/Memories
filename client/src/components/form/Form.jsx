import React, { useState,useEffect } from "react";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch , useSelector} from "react-redux";
import { createPost,updatePost } from "../../actions/Posts";
import Input from '@mui/material/Input';

// Define styled components
const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),

}));
const FormContainer = styled("form")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

const FileInput = styled(TextField)({
  width: "97%",
  margin: "10px 0",
});

const ButtonSubmit = styled(Button)({
  marginBottom: 10,
});

const CustomInput = styled(Input)({
  width: "97%",
  margin: "10px 0",
});

const Form = ({currentId,setCurrentId}) => {
  // Using useSelector to get the post which we want to update in the form field from redux store.
  const post=useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null);
  const [file, setFile] = useState(null);
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(post){
      setPostData(post);
    } 
  },[post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
    }else{
      dispatch(createPost({...postData,name:user?.result?.name}));
    }
    clear();
  };
    
  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setCurrentId(null);
  };

  if(!user?.result?.name){
    return (
      <CustomPaper>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </CustomPaper>
    );
  }

  return (
    <CustomPaper >
      <FormContainer onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Editing':'Creating'} a Memory</Typography>
        {/* <FileInput
          required
          name="creator"
          label="Creator"
          variant="outlined"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        /> */}
        <FileInput
          required
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <FileInput
          required
          name="message"
          label="Message"
          variant="outlined"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <FileInput
          required
          name="tags"
          label="Tags (comma separated)"
          variant="outlined"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />

        //how to use multer to upload image


         <CustomInput type="file" onChange={(e) => setFile(e.target.files[0])} />
        
        <ButtonSubmit
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          fullWidth
        >
          Submit
        </ButtonSubmit>
        <ButtonSubmit
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </ButtonSubmit>
      </FormContainer>
    </CustomPaper>
  );
};

export default Form;
