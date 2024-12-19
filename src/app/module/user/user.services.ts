import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface"
import { UserModel } from "./user.model"




const createUserInDB = async (payload : TUser) => {
    
      const newUserEmail = payload.email;

  // Check if a user with the given email already exists
  const existingUser = await UserModel.findOne({ email: newUserEmail });
  if (existingUser) {
    throw new AppError( httpStatus.CONFLICT, `A user with email: ${newUserEmail} is already exist.`);
  }

    const result = await UserModel.create(payload);

    return result
}


const getAllUsers = async () => {
    
    const user = await UserModel.find();

    return user;
}








export const UserServices = {
    createUserInDB,
    getAllUsers,
    
}