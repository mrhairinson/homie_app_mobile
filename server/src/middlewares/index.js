const jwt = require("jsonwebtoken");

const { errorCode, errorMessage } = require("../resources/index");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).send({
      errorCode: errorCode.NOT_PERMISSION,
      message: errorMessage.NOT_PERMISSION,
    });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err.message);
      return res.status(403).send({
        errorCode: errorCode.NOT_VALID_TOKEN,
        message: errorMessage.NOT_VALID_TOKEN,
      });
    }
    req.phoneNumber = decoded.data;
    next();
  });
};

module.exports.authenticateToken = authenticateToken;
