import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.services";
import httpStatus from 'http-status';



const createUser  = catchAsync( async (req, res) => {

    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createUserInDB(
     req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User has been created succesfully',
      data: result,
    });
  
});


const getAllUsersController = catchAsync( async (req, res) => {

    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.getAllUsers();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User has been created succesfully',
      data: result,
    });
  
});

export const UserControllers = {
  createUser,
  getAllUsersController

}