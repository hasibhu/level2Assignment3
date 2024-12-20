

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {

  port: process.env.PORT,
  dataBase_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BYCRYPT_SALT_ROUNDS,
  jwt_access_token: process.env.JWT_ACCESS_SECRET,
  
};