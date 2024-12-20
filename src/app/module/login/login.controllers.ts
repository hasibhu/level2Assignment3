import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./login.services";
import catchAsync from "../../utils/catchAsync";




const loginUser = catchAsync(async (req, res) => {
    

    const result = await AuthServices.loginUserService(req.body)

    // console.log(result);
    // res.setHeader("Authorization", `Bearer ${result?.accessToken}`);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User loged in successfully",
        data: result
    })
})



export const AuthControllers = {
    loginUser
}