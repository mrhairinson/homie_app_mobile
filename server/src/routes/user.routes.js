const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middlewares/index');

const {
    getUser,
    getUserPosts
} = require('../controllers/user.controllers');

router.get('/:id' ,getUser);
router.get('/posts', authenticateToken ,getUserPosts);

module.exports = router;