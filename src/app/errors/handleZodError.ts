import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericErrorResponse } from "../interface/error.interface";

  

const handleZodError = (err: ZodError) : TGenericErrorResponse => {
     
     const errorSources : TErrorSource = err.issues.map((issue: ZodIssue) => {
       
       return {
         path: issue?.path[issue?.path?.length - 1],
         message: issue?.message
       }
     })

     const statusCode = 400;
     
     return { // this return values will be bundled in the simplifiedError variable below in the err instance 
       statusCode,
       message: 'Common validation error created by us in handleZodError function',
       errorSources
     }
     
   }

export default handleZodError;