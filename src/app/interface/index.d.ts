import { JwtPayload } from "jsonwebtoken";

// Extending Express Request to include user info
declare global {
  namespace Express {
    interface Request {
        user?: JwtPayload & { name: string; email: string; role:string }; 
    }
  }
}
