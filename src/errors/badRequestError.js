import CustomError from './customError.js';
import httpStatus from 'http-status';

class BadRequestError extends CustomError {
  statusCode;
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.BAD_REQUEST;
  }
}

export default BadRequestError;
