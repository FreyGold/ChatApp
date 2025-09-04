interface AppErrorType extends Error {
   statusCode: number;
   status: string;
   isOperational: boolean;
}

const AppError = (message: string, statusCode: number): AppErrorType => {
   const error = new Error(message) as AppErrorType;
   error.statusCode = statusCode;
   error.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
   error.isOperational = true;

   if (Error.captureStackTrace) {
      Error.captureStackTrace(error, AppError);
   }

   return error;
};

export default AppError;
