require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateJwt = (phoneNumber) => {
  // const token = jwt.sign(phoneNumber, process.env.JWT_SECRET_KEY);
  const token = jwt.sign(
    {
      data: phoneNumber,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "2h" }
  );
  return token;
};

const isValidPassword = (password) => {
  const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
  return passwordRegex.test(password);
};

// Function to hash a password
const hashPassword = async (password) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the salt
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

const comparePasswords = async (plaintextPassword, hashedPassword) => {
  try {
    // Compare the plaintext password with the hash
    const isMatch = await bcrypt.compare(plaintextPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
};

module.exports = {
  generateJwt,
  isValidPassword,
  hashPassword,
  comparePasswords,
};
