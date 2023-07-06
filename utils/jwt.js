const jwt = require("jsonwebtoken");

module.exports.generateAccessToken = function generateAccessToken(email) {
  console.log(email);
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const expiresIn = "7d";

  const token = jwt.sign({ email }, jwtSecretKey, { expiresIn });
  return token;
};
