require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateJwt = (phoneNumber) => {
    // const token = jwt.sign(phoneNumber, process.env.JWT_SECRET_KEY);
    const token = jwt.sign({
        data: phoneNumber
      }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
    return token;
}

module.exports.generateJwt = generateJwt;