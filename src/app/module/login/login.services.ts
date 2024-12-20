import jwt  from 'jsonwebtoken';
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser } from "./login.interface";
import config from "../../config";
import { UserModel } from '../user/user.model';

const loginUserService = async (payload: TLoginUser) => {
    

    const user = await UserModel.isUserExistByCustomId(payload?.email)

    // check if user is available before statics
    const isUserExist = await UserModel.findOne({ email: payload?.email})  // User means user model
    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User is not available!!");
    }

     // check user status
        await UserModel.isUserBlocked(payload.email);

        // checking if the password is correct matching with db
        if (!(await UserModel.isPasswordMatched(payload.password, user?.password))) {
            throw new AppError(httpStatus.NOT_FOUND, "Password does not match!!");
        }
    
    
        // apply jwt 
        const jwtPayload = {
            userEmail: user?.email,
            name: user?.name,
            role: user.role
        }

    
        const accessToken = jwt.sign(
            jwtPayload,

            config.jwt_access_token as string,

            {
                expiresIn: '20d'
            }
        )

     
        return {
            accessToken
        }
   
}




export const AuthServices = {
    loginUserService,

}