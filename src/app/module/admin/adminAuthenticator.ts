

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

export const adminValidationMidddleware = () => {
  return catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers['authorization']; // Fix header access

    // Check if Authorization header is provided
    if (!authorizationHeader) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Authorization header is required.");
    }

    // Validate 'Bearer <token>' format
    const parts = authorizationHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid Authorization format. Expected 'Bearer <token>'.");
    }

    const token = parts[1];

    // Verify Token
    const decoded = jwt.verify(token, config.jwt_access_token as string) as {
      name: string;
      email: string;
      role: string;
    };

   console.log(decoded.role);

    
    if (decoded.role !== 'admin') {
        throw new AppError(httpStatus.BAD_REQUEST, "Only an admin is allowed to use this blog delete api. Please use admin login and set admin token!!");
    }

    // Attach user to req object
    req.user = decoded;

    // Proceed to the next middleware
    next();
  });
};
