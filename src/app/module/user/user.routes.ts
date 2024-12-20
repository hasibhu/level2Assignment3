import express from 'express';
import { UserControllers } from './user.controllers';
import { validateRequest } from '../../middleware/validateRequest';
import { createUserValidationSchema } from './user.validation';
import { authValidationMidddleware } from '../../middleware/auth.validationMiddleware';



const router = express.Router();



router.post(
    '/register',
    validateRequest(createUserValidationSchema),
    UserControllers.createUser
);


router.get(
    '/users',
    authValidationMidddleware(),
    UserControllers.getAllUsersController
);







export const UserRoutes = router;