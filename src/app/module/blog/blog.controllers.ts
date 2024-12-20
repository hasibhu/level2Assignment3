import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogModel } from "./blog.model";
import { blogServices } from "./blog.services";
import { TBlog } from "./blog.interface";








// const createBlog = catchAsync(async (req, res) => {
     
//   const { title, content } = req.body;

//   if (!title || !content) {
//     return res.status(400).json({
//       success: false,
//       message: "Title and content are required",
//       statusCode: 400,
//     });
//   }

//   if (!req.user) {
//     return res.status(401).json({
//       success: false,
//       message: "User not authenticated",
//       statusCode: 401,
//     });
//   }

    
    
    
//     const payload: TBlog = {
//     title,
//     content,
//     author: {
//       name: req.user.name,    // Assuming `name` is part of the `user` object
//       email: req.user.email,  // Assuming `email` is part of the `user` object
//     },
//     };
    
//     console.log(payload);
//     const result = await blogServices.createBlogInDB(req.body)

  
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User has been retrieved succesfully',
//       data: result,
//     });

    
//   } 

//  )



const createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
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
    author: {
      name: req.user.name,    // Expecting name from req.user
      email: req.user.userEmail,  // Expecting email from req.user
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



 export const blogControllers = {
     createBlog
 }