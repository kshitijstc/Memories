import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPost = async (req,res) => {
    const {id} = req.params;
    try{
        const post= await PostMessage.findById(id);
        res.status(200).json(post);
    }catch(error){
        res.status(404).json({message:error.message});
    }
}

export const getPosts = async (req,res) => {
    const { page } = req.query;

    try {
        const LIMIT = 9;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({ createdAt: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({data:posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
        
    }

}

// Query -> /posts?searchQuery=blabla
// Params -> /posts/:id

export const getPostsBySearch = async (req,res) => {
    const { searchQuery } = req.query;
    try {
        // 'i' is used to make the search case insensitive i.e. it will search for the query in both upper and lower case
        // Regular expression is used to search for the query in the title of the post
        const title = new RegExp(searchQuery, "i");
        const posts = await PostMessage.find({ title });
        res.json({data:posts});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req,res) => {
    const { title, message, tags } = req.body;
    const selectedFile = req.file?`uploads/${req.file.filename}` : '';

    const newPost = new PostMessage({
        title,
        message,
        tags,
        selectedFile,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    });
    // const post = req.body;
    // const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req,res) => { 
    const { id: _id } = req.params;
    // const post = req.body;
    const { title, message, tags } = req.body;
    const selectedFile = req.file?`uploads/${req.file.filename}` : req.body.selectedFile;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

    /*const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});
    res.json(updatedPost);*/
    const updatedPost = { title, message, tags, selectedFile, _id };

    const result = await PostMessage.findByIdAndUpdate(_id, updatedPost, { new: true });

    res.json(result);
}

export const deletePost = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");
    await PostMessage.findByIdAndDelete(id);
    res.json({message: "Post deleted successfully"});
}

export const likePost = async (req,res) => {    
    const {id} = req.params;
    if(!req.userId) return res.json({message: "Unauthenticated"});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");
    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if(index === -1){
        post.likes.push(req.userId);
    }
    else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
    res.json(updatedPost);
}

export const commentPost = async (req,res) => {
    const {id} = req.params;
    const {value} = req.body;
    const post = await PostMessage.findById(id);
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true});
    res.json(updatedPost);
}
