

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
    if (decoded.role !== "user") {
      throw new AppError(httpStatus.FORBIDDEN, "Only registered users are allowed to accomplish this task.");
    }

    // Attach user to request
    req.user = decoded;

    // Proceed to the next middleware
    next();
  });
};
