const { verify } = require("jsonwebtoken");
// const jwt = require("express-jwt");
// const cookieParser = require("cookie-parser");

const validateToken = (req, res, next) => {
  const accessToken = req.body.cookie.split("=")[1];

  if (!accessToken) return res.status(400).send("User not logged in");

  try {
    const validToken = verify(accessToken, "secret");
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.send("error");
  }
};

module.exports = { validateToken };
