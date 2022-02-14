/* The above code is importing a function from a file. */
const logger = require("./logger");
/**
 * Logs information about the incoming request before passing it on to the next middleware or route
 * handler
 * @param request - The incoming request object.
 * @param response - The response object.
 * @param next - The next function in the chain of middleware.
 */
const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

/**
 * If the request body has a status property, then return an error
 * @param request - The incoming request object.
 * @param response - The response object.
 * @param next - The next middleware function in the chain.
 */
const unknownEndpoint = (request, response, next) => {
  const error = new Error(`The request of ${request.path} is not found`);
  error.status = 404;
  next(error);
};

/**
 * It takes an error, a request, a response, and a next function as arguments. It then logs the error
 * message to the console and sends a response with the error message and status code
 * @param error - The error object.
 * @param request - The incoming request object.
 * @param response - The response object.
 * @param next - The next middleware function in the chain.
 */
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  response.status(error.status || 500);
  response.send({
    error: {
      message: error.message,
      status: error.status || 500,
    },
  });
};

/* The above code is a middleware function that will be executed for every request made to the
application. */
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
