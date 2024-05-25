require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const textflow = require("textflow.js");
textflow.useKey(process.env.TEXT_FLOW_API_KEY);

// Assuming `config` contains your AWS credentials and other necessary configurations
const config = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

const client = new S3Client(config);

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

const getBinarySizeInMB = (base64Str) => {
  const binaryData = Buffer.from(base64Str, "base64");
  return binaryData.length / (1024 * 1024);
};

const uploadSingleImageToAWS = async (file) => {
  const params = {
    Body: file.buffer,
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${file.originalname}`,
  };
  try {
    const command = new PutObjectCommand(params);
    const data = await client.send(command);
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

const formatPhoneNumber = (phoneNumber) => {
  const formattedPhoneNumber = `+84${phoneNumber.slice(1)}`;
  return formattedPhoneNumber;
};

const sendingOtpSms = (phoneNumber, otpNumber) => {
  phoneNumber = formatPhoneNumber(phoneNumber);
  textflow.sendSMS(
    phoneNumber,
    `Your OTP code for HOMiE is: ${otpNumber}. Hiệu lực 5 phút`,
    (result) => {
      if (result.ok) {
        console.log("Receive OTP: SUCCESS");
      } else {
        console.log("Receive OTP: FAIL");
      }
    }
  );
};

const sendingPassword = (phoneNumber, password) => {
  phoneNumber = formatPhoneNumber(phoneNumber);
  textflow.sendSMS(
    phoneNumber,
    `Your new password for ${phoneNumber} is: ${password}.`,
    (result) => {
      if (result.ok) {
        console.log("Get new password: SUCCESS");
      } else {
        console.log("Get new password: FAIL");
      }
    }
  );
};

const generateRandomString = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = {
  generateJwt,
  isValidPassword,
  hashPassword,
  comparePasswords,
  getBinarySizeInMB,
  uploadSingleImageToAWS,
  sendingOtpSms,
  sendingPassword,
  generateRandomString,
};
