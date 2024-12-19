import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error.interface';

// const handleMongooseValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
  

//   const errorSources: TErrorSource = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {

//     console.log(val?.message);

//       return {
//         path: val?.path,
//         message: val?.message,
//       };
//     },
//   );

//   const statusCode = 400;

//   return {
//     statusCode,
//     message: 'Mongoose Validation Error from handleMongooseValidationError',
//     errorSources,
//   };
// };

// const handleMongooseValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {

//   const errorSources: TErrorSource = Object.values(err.errors)
//     .filter((val) => !(val instanceof mongoose.Error.CastError)) // Exclude CastError
//     .map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
//       path: val.path,
//       message: val.message,
//     }));

//   const statusCode = 400;

//   return {
//     statusCode,
//     message: 'Mongoose Validation Error from handleMongooseValidationError',
//     errorSources,
//   };
// };


const handleMongooseValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
  const errorSources: TErrorSource = Object.values(err.errors)
    .map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: val.path,
      message: val.message,
    }));

  const statusCode = 400;

  return {
    statusCode,
    message: 'Mongoose Validation Error from handleMongooseValidationError',
    errorSources,
  };
};




export default handleMongooseValidationError;