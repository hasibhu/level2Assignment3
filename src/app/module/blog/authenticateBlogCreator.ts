
// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";
// import config from "../../config"; // Assuming this contains JWT secret or token key

// import AppError from "../../errors/AppError";
// import httpStatus from "http-status";
// import catchAsync from "../../utils/catchAsync";


// export const blogValidationMidddleware = () => {
//   return catchAsync(async (req ,  res, next) => {
//     const authorizationHeader = req.headers.authorization;

//     if (!authorizationHeader) {
//       return res.status(401).json({
//         success: false,
//         message: "Authorization header is required.",
//         statusCode: 401,
//       });
//     }

//     const tokenHeader = authorizationHeader.split(' ')[0];

//     if (tokenHeader !== "Bearer") {
//       throw new AppError(httpStatus.CONFLICT, "Token format 'Bearer <Token>' is accepted only !!");
//     }



//     const token = authorizationHeader.split(' ')[1];

//       const decoded = jwt.verify(token, config.jwt_access_token as string) as { name: string; email: string; role: string };

  

//       if (decoded.role === 'user') {
//         throw new AppError(httpStatus.CONFLICT, "Only an user is  allowed to accomplish this task!!");
//       }

//       req.user = decoded;
//       next();
//     } 
//   )
// };



import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../../config";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

// Extend Request to include user
interface CustomRequest extends Request {
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

export const blogValidationMidddleware = () => {
  return catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    // Safe header access
    const authorizationHeader = req.headers['authorization'];

    // Check if Authorization header exists
    if (!authorizationHeader) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Authorization header is required.");
    }

    // Validate 'Bearer <token>' format
    const parts = authorizationHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid Authorization format. Expected 'Bearer <token>'.");
    }

    const token = parts[1];

    // Verify token and extract payload
    const decoded = jwt.verify(token, config.jwt_access_token as string) as {
      name: string;
      email: string;
      role: string;
    };

    // Role validation
    if (decoded.role === "user") {
      throw new AppError(httpStatus.FORBIDDEN, "Users are not allowed to accomplish this task.");
    }

    // Attach user to request
    req.user = decoded;

    // Proceed to the next middleware
    next();
  });
};
