import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";






const createBlogInDB = async (payload : TBlog ) => {
    console.log('payload', payload);
 

    const result = await BlogModel.create(payload);

    return result
}


export const blogServices = {
    createBlogInDB
}