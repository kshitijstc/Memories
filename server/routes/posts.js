import express from "express";
import { getPostsBySearch,getPosts,createPost,updatePost,deletePost,likePost,getPost,commentPost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";
import multer from "multer";

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

// Always keep the parameterized routes at the bottom of the file
// Took me almost 3 weeks to figure this out and fix search functionality
router.get("/",getPosts);
router.get("/search",getPostsBySearch);
router.post("/", auth, upload.single("selectedFile"), createPost);
router.get("/:id",getPost);
router.patch("/:id", auth, upload.single("selectedFile"), updatePost);
router.delete("/:id",auth,deletePost);
router.patch("/:id/likePost",auth,likePost);
router.post("/:id/commentPost",auth,commentPost);

export default router;