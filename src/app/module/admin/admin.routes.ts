




import express from "express";
import { AdminControllers } from "./admin.controllers";
import { updateUserValidationSchema } from "../user/user.validation";
import { validateRequest } from "../../middleware/validateRequest";
import { adminValidationMidddleware } from "./adminAuthenticator";



const router = express.Router();



    

router.patch("/admin/users/:userId/block",
    validateRequest(updateUserValidationSchema),
    adminValidationMidddleware(),
    AdminControllers.adminControllerForUserBlock
);
    

router.delete("/admin/blogs/:id",
    adminValidationMidddleware(),
    AdminControllers.adminControllerForBlogDelete
    );







export const AdminRoutes = router;