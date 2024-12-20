import { Schema, model } from "mongoose";
import { TUser, UserModelInInterface } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const userSchema = new Schema<TUser, UserModelInInterface>(  
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address', 
      ],
    },
    password: {
      type: String,
      required: true,
    },
  
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',  
    },
    isBlocked: {
      type: Boolean,
      default: false,  
    },
    },
  
  {
    timestamps: true,
  },
);



userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; 
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});






userSchema.statics.isUserExistByCustomId = async function (email: string) {
  return await UserModel.findOne({email})
}



userSchema.statics.isUserBlocked = async function (email: string) {
  const user = await this.findOne({ email });




  if (user?.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked already!!");
  }


  return user; 
};


userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)

}





export const  UserModel = model<TUser, UserModelInInterface>('User', userSchema)