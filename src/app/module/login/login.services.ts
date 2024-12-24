import jwt  from 'jsonwebtoken';
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser } from "./login.interface";
import config from "../../config";
import { UserModel } from '../user/user.model';
import AppErrorForLogin from '../../errors/AppErrorForLogin';

// const loginUserService = async (payload: TLoginUser) => {
    

//     const user = await UserModel.isUserExistByCustomId(payload?.email)

//     // check if user is available before statics
//     const isUserExist = await UserModel.findOne({ email: payload?.email})  // User means user model
//     if (!isUserExist) {
//         throw new AppErrorForLogin(httpStatus.UNAUTHORIZED, "Invalid credentials!!");
//     }

//      // check user status
//         await UserModel.isUserBlocked(payload.email);

//         // checking if the password is correct matching with db
//         if (!(await UserModel.isPasswordMatched(payload.password, user?.password))) {
//             throw new AppErrorForLogin(httpStatus.UNAUTHORIZED, "Password does not match!!");
//         }
    
    
//         // apply jwt 
//         const jwtPayload = {
//             userEmail: user?.email,
//             name: user?.name,
//             role: user.role
//         }

    
//         const accessToken = jwt.sign(
//             jwtPayload,

//             config.jwt_access_token as string,

//             {
//                 expiresIn: '20d'
//             }
//         )

     
//         return {
//             accessToken
//         }
   
// }



const loginUserService = async (payload: TLoginUser) => {
  // Check if user exists
  const user = await UserModel.findOne({ email: payload?.email });
  
    if (!user) {
    throw new AppErrorForLogin(
      httpStatus.UNAUTHORIZED,  // 401 status code
      "Invalid credentials",
      "User not found with this email!"
    );
  }

  // Check if user is blocked
  await UserModel.isUserBlocked(payload.email);

  // Check if the password matches
  const isPasswordMatched = await UserModel.isPasswordMatched(payload.password, user?.password);
  if (!isPasswordMatched) {
    throw new AppErrorForLogin(
      httpStatus.UNAUTHORIZED,  // 401 status code
      "Invalid credentials",
      "Password does not match!!"
    );
  }

  // Create JWT Token
  const jwtPayload = {
    userEmail: user?.email,
    name: user?.name,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: '20d',
  });

  return {
    accessToken,
  };
};



export const AuthServices = {
    loginUserService,

}