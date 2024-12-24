import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";
import mongoose from "mongoose";
import QueryBuilder from "../../queryBuilder/queryBuilder";






const createBlogInDB = async (payload: TBlog) => {
    // console.log('payload', payload);
 

    const result = await BlogModel.create(payload);

    return result

};





const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
 
  const blogQuery = new QueryBuilder(BlogModel.find(), query)
    .search(['title', 'content'])  
    .filter()  
    .sort();  
    
  const result = await blogQuery.modelQuery;

  return result;
};








// update blog into db 
const updateblogsIntoDB = async (id: string, payload: Partial<TBlog>) => {

    const check = await BlogModel.findById(id)
  
    if (!check) {
        throw new AppError(httpStatus.BAD_REQUEST, `There is no blog with ID: ${id}`);
    }

    if (Object.keys(payload).length === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'At least one field must be updated!');
    }

        // basic info update 
        const updateBlogInfo = await BlogModel.findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
                runValidators: true,
            }
            
        );

    if (!updateBlogInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update blog!');
    }

    return updateBlogInfo;
}


// delete blog by user 
const deleteBlogFromDB = async (id : string) => {
    
     const check = await BlogModel.findById(id)
  
    if (!check) {
        throw new AppError(httpStatus.BAD_REQUEST, `There is no blog with ID: ${id}`);
    }
    const result = await BlogModel.findByIdAndDelete(id, {isDeleted: true})
   
    return result;
}





export const blogServices = {
    createBlogInDB,
    getAllBlogsFromDB,
    updateblogsIntoDB,
    deleteBlogFromDB
}