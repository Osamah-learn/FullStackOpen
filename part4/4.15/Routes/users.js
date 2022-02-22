const usersRouter = require("express").Router();
const User = require("../Models/User");
const createError = require("http-errors");
const { authSchema } = require("../helper/validation_schema");

/* This is a route that will be used to login a user. */
usersRouter.post("/login", async (req, res, next) => {
  res.send("login route");
});

/* This is a route that will be used to register a user. */
usersRouter.post("/register", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const isExist = await User.findOne({ username: result.username });
    if (isExist)
      throw createError.Conflict(`${result.username} already exists`);

    const user = new User(result);
    const savedUser = await user.save();
    console.log("user registerd", savedUser);
    return res.status(201).json(savedUser);
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
});

/* This is a route that will be used to refresh a user's token. */
usersRouter.post("/refresh-token", async (req, res, next) => {
  res.send("refresh token route");
});

/* This is a route that will be used to logout a user. */
usersRouter.delete("/logout", async (req, res, next) => {
  res.send("logout Route");
});

module.exports = usersRouter;
