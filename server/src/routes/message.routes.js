const express = require('express');
const router = express.Router();

// const { authenticateToken } = require('../middlewares/index');

const {
    createMessage,
    getMessage
} = require('../controllers/message.controllers');

router.post('/' ,createMessage);
router.get('/:chatId' ,getMessage);

module.exports = router;