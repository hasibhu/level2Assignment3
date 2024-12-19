type Role = 'user' | 'admin';

export type TUser = {
   
    name: string;
    email: string;
    password: string;
    role?: Role; 
    isBlocked: boolean;
};