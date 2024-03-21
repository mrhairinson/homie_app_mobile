const { User } = require('../models/user.models');
const { Post } = require('../models/post.models');

const getUser = async (req, res) => {
    try {
        const phoneNumber = req.phoneNumber;
        const user = await User.findOne({phoneNumber: phoneNumber});
        return res.status(200).json({
            message: "Get user successfully",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
            errorCode: errorCode.INTERNAL_SERVER_ERROR
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
        const phoneNumber = req.phoneNumber;
        const posts = await Post.find({phoneNumber: phoneNumber});
        return res.status(201).send({
            message: "Get user's posts successfully",
            data: posts
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
            errorCode: errorCode.INTERNAL_SERVER_ERROR,
        });
    }
}

module.exports = {
    getUser,
    getUserPosts
};