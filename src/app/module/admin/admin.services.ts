import mongoose from "mongoose";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { BlogModel } from "../blog/blog.model";





const getAllUsersFromDB = () => {
    
    const result = UserModel.find();

    return result;
}


// update blog into db 
const blockUserByAdminInDB = async (id: string, payload: Partial<TUser>) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid blog ID!');
    }

    if (Object.keys(payload).length === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'At least one field must be updated!');
    }

    // basic info update 
    const updateBlogInfo = await UserModel.findByIdAndUpdate(
        id,
        payload,
        {
            new: true,
            runValidators: true,
        }
            
    );

    if (!updateBlogInfo) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update blog!');
    }

    return updateBlogInfo;
};


const deleteBlogByAdminFromDB = (id: string)=>{
    const result = BlogModel.findByIdAndDelete(id, {
            new: true
        })

    return result
}



export const AdminServices = {
    getAllUsersFromDB,
    blockUserByAdminInDB,
    deleteBlogByAdminFromDB
}