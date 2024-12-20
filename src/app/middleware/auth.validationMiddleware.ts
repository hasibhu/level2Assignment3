

import  { NextFunction, Request, Response } from 'express';

import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../utils/catchAsync';


export const authValidationMidddleware = () => {

  return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {

    
        // Validate the request body
  
          //   const token = req.headers.authorization;
          const authorizationHeader = req.headers.authorization;

          // console.log(token);

          if (!authorizationHeader) {
              throw new AppError(
                  httpStatus.UNAUTHORIZED, 'You are not authorized'
              );
              
          }

    const parts = authorizationHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Authorization format. Expected "Bearer <token>"');
    }

    const token = parts[1];

          jwt.verify(token, config.jwt_access_token as string, function (err, decoded) {
             if (err) {
              throw new AppError(
                  httpStatus.UNAUTHORIZED, 'You are not authorized'
                 )
             }
              
              // console.log(decoded);

            req.user = decoded as JwtPayload
            
              // console.log('after inserting user in req: ',req.user);
          next(); // Proceed to the next middleware/controller
         })
        
    
     
  
    })
}  
