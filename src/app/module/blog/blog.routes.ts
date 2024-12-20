



import express from "express";
import { blogControllers } from "./blog.controllers";

import { blogValidationMidddleware } from "./authenticateBlogCreator";


const router = express.Router();

// POST /api/blogs
router.post("/createBlog",
    blogValidationMidddleware(),
    blogControllers.createBlog
    );





export const BlogRoutes = router;