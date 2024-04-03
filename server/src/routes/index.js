const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const postRoutes = require('./post.routes');
const chatRoutes = require('./chat.routes');
const messageRoutes = require('./message.routes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/chat', chatRoutes);
router.use('/message', messageRoutes);

module.exports = router;