
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  console.log(req);

  // Ensure it resolves properly and satisfies the handler signature
  Promise.resolve(
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "API not found",
      statusCode: httpStatus.NOT_FOUND,
      error: `Problem with API format: ${req.url}`,
    })
  ).catch(next);
};

export default notFound;
