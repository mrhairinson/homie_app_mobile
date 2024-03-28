const otpGenerator = require('otp-generator');

const { errorCode, errorMessage } = require('../resources/index');
const { User } = require('../models/user.models');
const { Otp } = require('../models/otp.models');
const { generateJwt } = require('../services/index');

/**
 * Handle sign up
 * @param {*} req 
 * @param {*} res 
 */
const signup = async(req, res) => {
    try {
        const phoneNumber = req.body.phoneNumber;
        console.log(`Phone number: ${phoneNumber}`);
        const user = await User.findOne({
            phoneNumber: phoneNumber
        });
        if (user) {
            //Check if user is already existing
            return res.status(400).json({
                errorCode: errorCode.DUPLICATE_USER,
                message: errorMessage.DUPLICATE_USER
            });
        }
        //Generate otp
        const OTP = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets : false,
            upperCaseAlphabets: false,
            specialChars: false
        });
        console.log(`otp: ${OTP}`);
        const otp = new Otp({ phoneNumber:phoneNumber, otpNumber:OTP });
        // Save otp to mongoose database
        const result = await otp.save();
        //Send OTP
        // sendOTP(otp.phoneNumber, otp.otpNumber);
        console.log("Sending OTP...");
        console.log("OTP sended!");
        return res.status(201).json({
            otp: otp.otpNumber,
            message: "OTP sended!",
            errorCode: errorCode.SUCCESS,
        });
    } catch (error) {
        return res.status(500).json({
            errorCode: errorCode.INTERNAL_SERVER_ERROR,
            message: error
        });
    }
}

/**
 * Handle verification
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const verify = async(req, res) => {
    try {
        const phoneNumber = req.body.phoneNumber;
        const requestOtp = req.body.otpNumber;
        const user = await User.findOne({
            phoneNumber: phoneNumber
        });
        const otpHolder = await Otp.findOne({
            phoneNumber: phoneNumber
        });
        if (user) {
            //Check if user is already existing
            return res.status(400).json({
                errorCode: errorCode.DUPLICATE_USER,
                message: errorMessage.DUPLICATE_USER
            });
        }
        if (!otpHolder) {
            //Check if otp expired
            return res.status(400).json({
                errorCode: errorCode.EXPIRED_OTP,
                message: errorMessage.EXPIRED_OTP
            });
        }
        if (requestOtp !== otpHolder.otpNumber) {
            return res.status(400).json({
                errorCode: errorCode.WRONG_OTP,
                message: errorMessage.WRONG_OTP
            });
        }
        //Save user if they provide valid otp number
        const newUser = new User({phoneNumber: phoneNumber, name: phoneNumber, dob: ""});
        const result = await newUser.save();
        return res.status(201).json({
            errorCode: errorCode.SUCCESS,
            message: "User registed successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            errorCode: errorCode.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
}

const signin = async(req, res) => {
    try {
        const { phoneNumber } = req.body;
        const user = await User.findOne({
            phoneNumber: phoneNumber
        });
        if (!user) {
            // Case user is not registered
            return res.status(400).json({
                errorCode: errorCode.NOT_REGISTED_USER,
                message: errorMessage.NOT_REGISTED_USER
            });
        }
        //Create JWT
        const jwtToken = generateJwt(phoneNumber);
        console.log(jwtToken);
        return res.status(200).json({
            jwtToken: jwtToken,
            user: user,
            message: "Sign in successfully!",
            errorCode: errorCode.SUCCESS,
        });
    } catch (error) {
        return res.status(500).json({
            errorCode: errorCode.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
}

const signout = async(req, res) => {
    return res.status(200).json({
        message: "Logout successfully!",
        errorCode: errorCode.SUCCESS,
    });
}

module.exports = {
    signup,
    signin,
    signout,
    verify
};