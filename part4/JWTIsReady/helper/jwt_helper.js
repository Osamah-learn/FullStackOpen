const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  /* This is a function that returns a token. */
  signAccessToken: (userid) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "https://osamah-dev.tech/",
        audience: userid,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(createError.InternalServerError());
        } else {
          resolve(token);
        }
      });
    });
  },
  /* This is checking if the user is logged in or not. If the user is not logged in, it will return a
  401 error. */
  verifyAccessToken: (req, res, next) => {
    /* This is checking if the user is logged in or not. If the user is not logged in, it will return
    a 401 error. */
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    /* Get the token from the headers*/
    const authHeader = req.headers["authorization"];
    /* This is splitting the header into two parts. The first part is the word "Bearer" and the second
   part is the token. */
    const bearerToken = authHeader.split(" ");
    /* This is getting the token from the header. */
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      } else {
        req.payload = payload;
        next();
      }
    });
  },
  signRefreshToken: (userid) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "https://osamah-dev.tech/",
        audience: userid,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(createError.InternalServerError());
        } else {
          resolve(token);
        }
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(createError.Unauthorized());
          const userid = payload.aud;
          resolve(userid);
        }
      );
    });
  },
};

// we recevide username and password from login router
// then we make if check if its true we return jwt response else its 404
// when we get the jwt in the front end we gonna save it in the local storage
// when ever we send request from the front end , post blogs we need to put them in header
