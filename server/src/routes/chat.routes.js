const express = require('express');
const router = express.Router();

// const { authenticateToken } = require('../middlewares/index');

const {
    createChat,
    findUserChats,
    findChats
} = require('../controllers/chat.controllers');

router.post('/' ,createChat);
router.get('/:userId' ,findUserChats);
router.get('/find/:firstId/:secondId' ,findChats);

module.exports = router;