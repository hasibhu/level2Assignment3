import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogModel } from "./blog.model";
import { blogServices } from "./blog.services";
import { TBlog } from "./blog.interface";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { Request, Response } from "express";



// const createBlog = catchAsync(async (req, res) => {
//   const { title, content, isPublished } = req.body;

//   if (!title || !content || isPublished) {
//     return res.status(400).json({
//       success: false,
//       message: "Title and content are required",
//       statusCode: 400,
//     });
//   }

//   // Log req.user to check if it's populated
//   console.log("Logged-in user:", req.user);

//   if (!req.user) {
//     return res.status(401).json({
//       success: false,
//       message: "User not authenticated",
//       statusCode: 401,
//     });
//   }

//   const payload: TBlog = {
//     title,
//     content,
//     isPublished,
//     author: {
//       name: req.user.name,    
//       email: req.user.userEmail,  
//     },
//   };

//   const result = await blogServices.createBlogInDB(payload);

//   sendResponse(res, {
//     statusCode: httpStatus.CREATED,
//     success: true,
//     message: 'Blog created successfully',
//     data: result,
//   });
// });







// get all blos conrolers 


// const createBlog = async (req: Request, res: Response) => {
//   const { title, content, isPublished } = req.body;

//   if (!title || !content || isPublished) {
//     return res.status(400).json({
//       success: false,
//       message: "Title and content are required",
//       statusCode: 400,
//     });
//   }

//   // Log req.user to check if it's populated
//   console.log("Logged-in user:", req.user);

//   if (!req.user) {
//     return res.status(401).json({
//       success: false,
//       message: "User not authenticated",
//       statusCode: 401,
//     });
//   }

//   const payload: TBlog = {
//     title,
//     content,
//     isPublished,
//     author: {
//       name: req.user.name,    
//       email: req.user.userEmail,  
//     },
//   };

//   const result = await blogServices.createBlogInDB(payload);

//   // Instead of returning the response directly, just send it
//   sendResponse(res, {
//     statusCode: httpStatus.CREATED,
//     success: true,
//     message: 'Blog created successfully',
//     data: result,
//   });

//   // Ensure this handler returns `Promise<void>`
//   return ;
// };


const createBlog = async (req: Request, res: Response): Promise<void> => {
  const { title, content, isPublished } = req.body;

  if (!title || !content || isPublished) {
    res.status(400).json({
      success: false,
      message: "Title and content are required",
      statusCode: 400,
    });
    return; // Ensure early return
  }

  // Log req.user to check if it's populated
  console.log("Logged-in user:", req.user);

  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "User not authenticated",
      statusCode: 401,
    });
    return; // Ensure early return
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

  // Send response, don't return it
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });

  // The handler function now ends without returning anything.
};




const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogsFromDB(req.query);

  if (result.length === 0) {
    throw new AppError( httpStatus.CONFLICT, `Your search does not match any blog.`)
  }
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: result
  });

})

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




const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Blog with this id is not available!');
  }


  const result = await blogServices.deleteBlogFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog has been deleted successfully',
    data: {
      success: true,
      message: 'Blog deleted successfully',
      statusCode: httpStatus.OK
    }
  });
})






 export const blogControllers = {
   createBlog,
   getAllBlogs,
   updateBlog,
   deleteBlog
 }