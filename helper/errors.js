class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message);
    this.statusCode = 404;
  }
}

class InternalServerError extends Error {
  constructor(message = 'Internal server error') {
    super(message);
    this.statusCode = 500;
  }
}

export { CustomError, NotFoundError, InternalServerError };
