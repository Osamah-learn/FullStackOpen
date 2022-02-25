const usersRouter = require("express").Router();
const User = require("../Models/User");
const createError = require("http-errors");
const { authSchema } = require("../helper/validation_schema");
const { signAccessToken } = require("../helper/jwt_helper");
/* This is a route that will be used to login a user. */
usersRouter.post("/login", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const user = await User.findOne({ username: result.username });
    if (!user) throw createError.NotFound("User is not registerd");
    const ifPasswordMatch = await user.isValidPassword(result.password);
    if (!ifPasswordMatch)
      throw createError.Unauthorized("UserName or password is incorrect");
    const accessToken = await signAccessToken(user.id);
    res.send({ accessToken });
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("Invalid UserName or Password"));
    next(error);
  }
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
    const accessToken = await signAccessToken(savedUser.id);

    return res.status(201).json({ accessToken });
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
