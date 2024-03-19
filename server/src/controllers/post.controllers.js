const { User } = require('../models/user.models');

/**
 * Handle get all posts
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllPosts = async (req, res) => {
    try {
        res.send("Get all posts");
    } catch (error) {
        return res.status(500).send({
            errorCode: errorCode.INTERNAL_SERVER_ERROR,
            message: error
        });
    }
}

/**
 * Handle get post paginations (fix pagination)
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getPaginationPosts = async (req, res) => {
    try {
        res.send("Pagination");
    } catch (error) {
        return res.status(500).send({
            errorCode: errorCode.INTERNAL_SERVER_ERROR,
            message: error
        });
    }
}

/**
 * Handle create post request
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createPost = async (req, res) => {
    try {
        res.send("Create");
    } catch (error) {
        return res.status(500).send({
            errorCode: errorCode.INTERNAL_SERVER_ERROR,
            message: error
        });
    }
}

/**
 * Handle update post request
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updatePost = async (req, res) => {
    try {
        res.send("Update");
    } catch (error) {
        return res.status(500).send({
            errorCode: errorCode.INTERNAL_SERVER_ERROR,
            message: error
        });
    }
}

/**
 * Handle delete post request
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deletePost = async (req, res) => {
    try {
        res.send("Delete");
    } catch (error) {
        return res.status(500).send({
            errorCode: errorCode.INTERNAL_SERVER_ERROR,
            message: error
        });
    }
}

module.exports = {
    getAllPosts,
    getPaginationPosts,
    createPost,
    updatePost,
    deletePost
};