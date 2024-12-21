import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogModel } from "./blog.model";
import { blogServices } from "./blog.services";
import { TBlog } from "./blog.interface";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";



const createBlog = catchAsync(async (req, res) => {
  const { title, content, isPublished } = req.body;

  if (!title || !content || isPublished) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required",
      statusCode: 400,
    });
  }

  // Log req.user to check if it's populated
  console.log("Logged-in user:", req.user);

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
      statusCode: 401,
    });
  }

  const payload: TBlog = {
    title,
    content,
    isPublished,
    author: {
      name: req.user.name,    
      email: req.user.userEmail,  
    },
  };

  const result = await blogServices.createBlogInDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});




// update blog

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  
  // Log payload for debugging
  console.log("Update Request Payload:", req.body);
  const result = await blogServices.updateCourseIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.ACCEPTED,
    success: true,
    message: 'Blog has been updated successfully',
    data: result,
  });
})


 export const blogControllers = {
   createBlog,
   updateBlog
 }