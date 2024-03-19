const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const postRoutes = require('./post.routes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/post', postRoutes);

module.exports = router;