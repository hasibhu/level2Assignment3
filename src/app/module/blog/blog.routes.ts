



import express, { Response, Request } from "express";
import { blogControllers } from "./blog.controllers";

import { blogValidationMidddleware } from "./authenticateBlogCreator";
import { validateRequest } from "../../middleware/validateRequest";
import { BlogValidations } from "./blog.validations";
import { BlogModel } from "./blog.model";


const router = express.Router();

// POST /api/blogs
router.post("/blogs",
    validateRequest(BlogValidations.blogValidationSchema),
    blogValidationMidddleware(),
    blogControllers.createBlog
);


router.get("/blogs",
    // validateRequest(BlogValidations.blogValidationSchema),
    // blogValidationMidddleware(),
    blogControllers.getAllBlogs
);
    

router.patch("/blogs/:id",
    validateRequest(BlogValidations.updateBlogValidationSchema),
    blogValidationMidddleware(),
    blogControllers.updateBlog
);
    

router.delete("/:id",
    blogValidationMidddleware(),
    blogControllers.deleteBlog
    );







export const BlogRoutes = router;