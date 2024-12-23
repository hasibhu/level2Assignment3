import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.services";




const adminGetAllUsers = catchAsync(async (req, res) => {
    
    const result = await AdminServices.getAllUsersFromDB();


     sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User has been retrieved succesfully',
      data: result,
    });



})



const adminControllerForUserBlock = catchAsync(async (req, res) => {
    
    const { userId } = req.params;
    const result = await AdminServices.blockUserByAdminInDB(userId, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User has been blocked succesfully',
        //   data: result,
    });


});


const adminControllerForBlogDelete = catchAsync(async (req, res) => {
    
    const { id } = req.params;

    const result = await AdminServices.deleteBlogByAdminFromDB(id)


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog has been deleted succesfully',
        //   data: result,
    });
})



export const AdminControllers = {
    adminGetAllUsers,
    adminControllerForUserBlock,
    adminControllerForBlogDelete
}