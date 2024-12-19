import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const userSchema = new Schema<TUser>(  
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true, // Ensures email is unique in the database
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address', // Error message if validation fails
      ],
    },
    password: {
      type: String,
      required: true,
    },
  
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',  // Default value for role is 'user'
    },
    isBlocked: {
      type: Boolean,
      default: false,  // Default value for isBlocked is false
    },
    },
  
  {
    timestamps: true,
  },
);



userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
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





export const  UserModel = model<TUser>('User', userSchema)