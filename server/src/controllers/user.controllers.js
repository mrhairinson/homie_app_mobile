const { User } = require('../models/user.models');

const getUser = async (req, res) => {
    try {
        const phoneNumber = req.phoneNumber;
        const user = await User.findOne({phoneNumber: phoneNumber});
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({
            errorCode: errorCode.INTERNAL_SERVER_ERROR,
            message: error
        });
    }
}

/**
 * Handle get user's posts
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getUserPosts = async (req, res) => {
    try {
        res.send("Get user posts");
    } catch (error) {
        return res.status(500).send({
            errorCode: errorCode.INTERNAL_SERVER_ERROR,
            message: error
        });
    }
}

module.exports = {
    getUser,
    getUserPosts
};