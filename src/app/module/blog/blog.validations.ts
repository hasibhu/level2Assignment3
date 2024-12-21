

import { z } from "zod";


const blogValidationSchema = z.object({
    body: z.object({
        title: z.string({required_error: "Title is required"}),
        content: z.string({required_error: "Content is required"})
    })
})


const updateBlogValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        isPublished: z.boolean().optional(),
        author: z.object({
            name: z.string().optional(),
            email: z.string().email().optional(),
        }).optional()
    })
});




export const BlogValidations = {
    blogValidationSchema,
    updateBlogValidationSchema
}