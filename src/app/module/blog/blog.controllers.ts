import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogModel } from "./blog.model";
import { blogServices } from "./blog.services";
import { TBlog } from "./blog.interface";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { Request, Response } from "express";
import { UserModel } from "../user/user.model";




const createBlog = async (req: Request, res: Response): Promise<void> => {
  const { title, content, isPublished } = req.body;

  if (!title || !content || isPublished) {
    res.status(400).json({
      success: false,
      message: "Title and content are required",
      statusCode: 400,
    });
    return; 
  }


  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "User not authenticated",
      statusCode: 401,
    });
    return; // Ensure early return
  }

  const loggedInUserInfo : any = await UserModel.findOne({ email: req.user.userEmail });

  const payload: TBlog = {
    title,
    content,
    isPublished,
    author: {
      id: loggedInUserInfo._id,
      name: req.user.name,    
      email: req.user.userEmail,  
    },
  };

  const result = await blogServices.createBlogInDB(payload);

  // Send response, don't return it
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });

};




const getAllBlogs = catchAsync(async (req, res) => {
  
  const result = await blogServices.getAllBlogsFromDB(req.query);

  if (result.length === 0) {
    throw new AppError(httpStatus.CONFLICT, `Your search does not match any blog.`);
  }

  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});




// update blog

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  
  // Log payload for debugging
  console.log("Update Request Payload:", req.body);
  const result = await blogServices.updateblogsIntoDB(id, req.body);


  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, `Blog with ID ${id} not found.`);
  }


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog has been updated successfully',
    data: result,
  });
})




const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Blog with this id is not available!');
  }


  const result = await blogServices.deleteBlogFromDB(id);

  sendResponse(res, {
    success: true,
    message: 'Blog has been deleted successfully',
    statusCode: httpStatus.OK
  });
})






 export const blogControllers = {
   createBlog,
   getAllBlogs,
   updateBlog,
   deleteBlog
 }