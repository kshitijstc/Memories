import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

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
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find(title);
        res.json({data:posts});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { title, message, tags, name } = req.body;

    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const newPost = new PostMessage({
            title,
            message,
            tags,
            name, // Storing the name of the user
            creator: req.userId, // Storing the ID of the user
            selectedFile: result.secure_url,
            cloudinaryId: result.public_id,
            createdAt: new Date().toISOString(),
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try {
        let updatedPost = { title, message, tags, createdAt: new Date().toISOString() };

        if (req.file) {
            // Upload the new image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            updatedPost.selectedFile = result.secure_url;
            updatedPost.cloudinaryId = result.public_id;
        }

        // Find the post by id and update it with the new data
        const post = await PostMessage.findById(id);

        if (req.file && post.cloudinaryId) {
            // Delete the old image from Cloudinary if a new image was uploaded
            await cloudinary.uploader.destroy(post.cloudinaryId);
        }

        // Ensure the creator field is not overwritten
        updatedPost.creator = post.creator;

        const updatedPostMessage = await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

        res.status(200).json(updatedPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


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
