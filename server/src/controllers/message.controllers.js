const { Message } = require("../models/message.models");
const { errorCode } = require("../resources");

//Get message
//Create message

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  try {
    const message = new Message({
      chatId,
      senderId,
      text,
    });
    const response = await message.save();
    return res.status(201).json({
      errorCode: errorCode.SUCCESS,
      message: "Save message Success",
      data: message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error,
    });
  }
};

const getMessage = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({
      chatId: chatId,
    });
    return res.status(200).json({
      errorCode: errorCode.SUCCESS,
      data: messages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error,
    });
  }
};

const getNewestMessage = async (req, res) => {
  const { chatId } = req.params;
  try {
    const message = await Message.find({
      chatId: chatId,
    })
      .sort({ _id: -1 })
      .limit(1);
    console.log(message);
    return res.status(200).json({
      errorCode: errorCode.SUCCESS,
      data: message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error,
    });
  }
};

module.exports = {
  createMessage,
  getMessage,
  getNewestMessage,
};
