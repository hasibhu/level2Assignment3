import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./login.services";
import catchAsync from "../../utils/catchAsync";
import catchAsyncLogin from "../../errors/AppErrorcatchAsysnc";




const loginUser = catchAsyncLogin(async (req:any, res:any) => {
    

    const result = await AuthServices.loginUserService(req.body)




    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User login is successfully",
        data: result
    })
})



export const AuthControllers = {
    loginUser
}