import { Model } from "mongoose";

type Role = 'user' | 'admin';

export interface TUser {
    name: string;
    email: string;
    password: string;
    role?: Role; 
    isBlocked?: boolean;
};



export interface UserModelInInterface extends Model<TUser>{
  isUserExistByCustomId(id: string): Promise<TUser>;
  isUserBlocked(id: string): Promise<TUser>;
  isPasswordMatched(plainTextPassword:string, hashedPassword :string): Promise<boolean>
}