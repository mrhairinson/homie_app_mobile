const otpGenerator = require("otp-generator");
const { errorCode, errorMessage } = require("../resources/index");
const { User } = require("../models/user.models");
const { Otp } = require("../models/otp.models");
const {
  generateJwt,
  isValidPassword,
  hashPassword,
  comparePasswords,
  sendingOtpSms,
  sendingPassword,
  generateRandomString,
} = require("../helpers/index");

/**
 * Handle sign up
 * @param {*} req
 * @param {*} res
 */
const signup = async (req, res) => {
  try {
    let phoneNumber = req.body.phoneNumber;
    let password = req.body.password;

    //Check trung nguoi dung
    const user = await User.findOne({
      phoneNumber: phoneNumber,
    });
    if (user) {
      //Check if user is already existing
      return res.status(400).json({
        errorCode: errorCode.DUPLICATE_USER,
        message: errorMessage.DUPLICATE_USER,
      });
    }

    //Check valid password
    if (!isValidPassword(password)) {
      return res.status(400).json({
        errorCode: errorCode.INVALID_PASSWORD,
        message: errorMessage.INVALID_PASSWORD,
      });
    }

    //Generate otp
    const OTP = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const otp = new Otp({
      phoneNumber: phoneNumber,
      password: password,
      otpNumber: OTP,
    });
    // Save otp to mongoose database
    const result = await otp.save();
    //Send OTP
    sendingOtpSms(phoneNumber, OTP);
    return res.status(201).json({
      errorCode: errorCode.SUCCESS,
      message: "OTP sended!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

/**
 * Handle verification
 * @param {*} req
 * @param {*} res
 * @returns
 */
const verify = async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const requestOtp = req.body.otpNumber;
    const otpHolder = await Otp.findOne({
      phoneNumber: phoneNumber,
    });
    //Check if otp expired
    if (!otpHolder) {
      return res.status(400).json({
        errorCode: errorCode.EXPIRED_OTP,
        message: errorMessage.EXPIRED_OTP,
      });
    }
    //Check if otp not correct
    if (requestOtp !== otpHolder.otpNumber) {
      return res.status(400).json({
        errorCode: errorCode.WRONG_OTP,
        message: errorMessage.WRONG_OTP,
      });
    }
    // Hash password
    const password = await hashPassword(otpHolder.password);
    //Save user if they provide valid otp number
    const newUser = new User({
      phoneNumber: phoneNumber,
      password: password,
      name: phoneNumber,
      dob: "",
    });
    const result = await newUser.save();
    return res.status(201).json({
      errorCode: errorCode.SUCCESS,
      message: "User registed successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

const signin = async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const plainPassword = req.body.password;
    const user = await User.findOne({
      phoneNumber: phoneNumber,
    });

    // Check user is not registered
    if (!user) {
      return res.status(400).json({
        errorCode: errorCode.NOT_REGISTED_USER,
        message: errorMessage.NOT_REGISTED_USER,
      });
    }

    //Check password correctness
    const validPassword = await comparePasswords(plainPassword, user.password);
    if (!validPassword) {
      return res.status(400).json({
        errorCode: errorCode.WRONG_PASSWORD,
        message: errorMessage.WRONG_PASSWORD,
      });
    }
    //Create JWT
    const jwtToken = generateJwt(phoneNumber);
    return res.status(200).json({
      jwtToken: jwtToken,
      user: user,
      message: "Sign in successfully!",
      errorCode: errorCode.SUCCESS,
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

const signout = async (req, res) => {
  return res.status(200).json({
    message: "Logout successfully!",
    errorCode: errorCode.SUCCESS,
  });
};

const forgetPassword = async (req, res) => {
  try {
    let phoneNumber = req.body.phoneNumber;
    let user = await User.findOne({
      phoneNumber: phoneNumber,
    });
    // Check user is not registered
    if (!user) {
      return res.status(400).json({
        errorCode: errorCode.NOT_REGISTED_USER,
        message: errorMessage.NOT_REGISTED_USER,
      });
    }

    let newPasswordPlain = generateRandomString();
    // Hash password
    const newPassword = await hashPassword(newPasswordPlain);
    user = await User.findOneAndUpdate(
      { phoneNumber: phoneNumber },
      { password: newPassword },
      {
        new: true,
      }
    );
    //Update thanh cong va gui SMS
    sendingPassword(phoneNumber, newPasswordPlain);
    return res.status(201).json({
      errorCode: errorCode.SUCCESS,
      message: "Update user successfully",
      data: { newPassword: newPasswordPlain },
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  signin,
  signout,
  verify,
  forgetPassword,
};
