import httpStatus from 'http-status';
import CustomError from './customError.js';

class NotFoundError extends CustomError {
  statusCode;
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.NOT_FOUND;
  }
}

export default NotFoundError;
