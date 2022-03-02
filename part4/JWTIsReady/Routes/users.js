const usersRouter = require("express").Router();
const User = require("../Models/User");
const createError = require("http-errors");
const { authSchema } = require("../helper/validation_schema");
const { signAccessToken, signRefreshToken,verifyRefreshToken } = require("../helper/jwt_helper");
const { verify } = require("jsonwebtoken");
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
    const refreshToen = await signRefreshToken(user.id);
    res.send({ accessToken, refreshToen });
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
    const refreshToen = await signRefreshToken(savedUser.id);
    return res.status(201).json({ accessToken, refreshToen });
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
});

/* This is a route that will be used to refresh a user's token. */
usersRouter.post("/refresh-token", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.badRequest();
    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);
    res.send({accessToken, refToken});
  } catch (error) {
    next(error);
  }
});

/* This is a route that will be used to logout a user. */
usersRouter.delete("/logout", async (req, res, next) => {
  res.send("logout Route");
});

module.exports = usersRouter;
