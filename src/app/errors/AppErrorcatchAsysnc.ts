

import { Request, Response, NextFunction } from 'express';
import config from '../config';

const catchAsyncLogin = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch((err) => {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
      statusCode: err.statusCode || 500,
      error: {
        details: err.details || "No additional details available",
      },
      stack: config.NODE_ENV === "production" ? err.stack : undefined,
    });
  });

export default catchAsyncLogin;
