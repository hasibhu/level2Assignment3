



import express, { Response, Request } from "express";
import { blogControllers } from "./blog.controllers";

import { blogValidationMidddleware } from "./authenticateBlogCreator";
import { validateRequest } from "../../middleware/validateRequest";
import { BlogValidations } from "./blog.validations";
import { BlogModel } from "./blog.model";


const router = express.Router();

// POST /api/blogs
router.post("/createBlog",
    validateRequest(BlogValidations.blogValidationSchema),
    blogValidationMidddleware(),
    blogControllers.createBlog
);
    

router.patch("/:id",
    validateRequest(BlogValidations.updateBlogValidationSchema),
    blogValidationMidddleware(),
    blogControllers.updateBlog
    );







export const BlogRoutes = router;