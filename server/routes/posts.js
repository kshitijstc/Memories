import express from "express";
import { getPostsBySearch,getPosts,createPost,updatePost,deletePost,likePost,getPost,commentPost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary'
import dotenv from "dotenv";
import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

dotenv.config();
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});
console.log(cloudinary.config());




const router = express.Router();

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename: (req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({storage:storage});



router.get("/:id",getPost);
router.get("/search",getPostsBySearch);
router.get("/",getPosts);
router.post("/", auth, upload.single("selectedFile"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const { title, message, creator, tags } = req.body;
        const newPost = new PostMessage({
            title,
            message,
            creator,
            tags,
            createdAt: new Date().toISOString(),
            selectedFile: result.secure_url,
            cloudinaryId: result.public_id,
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.patch("/:id", auth, upload.single("selectedFile"), async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }

    try {
        let updatedPost = { title, message, creator, tags, createdAt: new Date().toISOString() };

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

        const updatedPostMessage = await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

        res.status(200).json(updatedPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// router.post("/",auth,upload.single("selectedFile"),createPost);
router.delete("/:id",auth,deletePost);
router.patch("/:id/likePost",auth,likePost);
router.post("/:id/commentPost",auth,commentPost);

export default router;