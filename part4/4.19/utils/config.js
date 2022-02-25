/* This is a JavaScript package file that  alow to pass env variables */
require("dotenv").config();

/* The `PORT` variable is set to the value of the `PORT` environment variable, or 8080 if the
environment variable is not set.

The `MONGODB_URI` variable is set to the value of the `MONGODB_URI` environment variable, or
`mongodb://localhost:27017/test` if the environment variable is not set.

# Step 3: Create a `server.js` file
# 
# This file is the entry point to your application. It connects to your database, loads your */
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
module.exports = {
  MONGODB_URI,
  PORT,
};
