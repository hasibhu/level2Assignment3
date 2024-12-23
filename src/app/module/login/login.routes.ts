
import express from "express"
import { validateRequest } from "../../middleware/validateRequest";
import { AuthValidation } from "./login.validations";
import { AuthControllers } from "./login.controllers";


const router = express.Router();


router.post('/auth/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser)


export const AuthRoutes = router;