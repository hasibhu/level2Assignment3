class AppErrorForLogin extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: string;

  constructor(statusCode: number, message: string, details?: string, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.details = details;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppErrorForLogin;
