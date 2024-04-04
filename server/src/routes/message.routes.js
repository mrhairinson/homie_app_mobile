const express = require('express');
const router = express.Router();

// const { authenticateToken } = require('../middlewares/index');

const {
    createMessage,
    getMessage,
    getNewestMessage
} = require('../controllers/message.controllers');

router.post('/' ,createMessage);
router.get('/:chatId' ,getMessage);
router.get('/newest/:chatId' ,getNewestMessage);

module.exports = router;