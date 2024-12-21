


import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../../config"; // Assuming this contains JWT secret or token key

import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


export const blogValidationMidddleware = () => {
  return catchAsync(async (req ,  res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is required.",
        statusCode: 401,
      });
    }

    const token = authorizationHeader.split(' ')[1];

      const decoded = jwt.verify(token, config.jwt_access_token as string) as { name: string; email: string; role: string };

  

      if (decoded.role === 'user') {
        throw new AppError(httpStatus.CONFLICT, "Admin is not allowed to create blog!!");
      }

      req.user = decoded;
      next();
    } 
  )
};
