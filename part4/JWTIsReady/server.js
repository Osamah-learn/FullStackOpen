/* The first line imports the Express module. 

The second line creates an Express application. 

The third line imports the configuration file. 

The fourth line creates a logger object. 

The last line creates an Express application. */

const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogRoute = require("./Routes/Bloglist.route");
const usersRouter = require("./Routes/users");
const middleware = require("./utils/middleware");
const startMongo = require("./helper/initMongoDb");
const {verifyAccessToken} = require("./helper/jwt_helper")
/* Sending a response to the client. */
app.use(cors());
app.use(express.json());
app.get("/",verifyAccessToken, async (req, res,next) => {
  console.log("This request is authorization",req.headers['authorization'])
  res.send("Hello User who login")
})
app.use("/api/blogs", blogRoute);
app.use("/", usersRouter);
app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


/* Error handler middleware. */

/* The above code is creating a server that listens on port from config.port. */
if (process.env.NODE_ENV !== "test") {
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
  });
}
module.exports = app;
