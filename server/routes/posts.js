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

router.get("/:id",getPost);
router.get("/search",getPostsBySearch);
router.get("/",getPosts);
router.post("/",auth,upload.single("selectedFile"),createPost);
router.patch("/:id", auth,upload.single('selectedFile'),updatePost);
router.delete("/:id",auth,deletePost);
router.patch("/:id/likePost",auth,likePost);
router.post("/:id/commentPost",auth,commentPost);

export default router;