const { Chat } = require("../models/chat.models");
const { errorCode } = require("../resources");

//create chat
//get user chats

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (chat) {
      console.log("This chat has already been created");
    }
    const newChat = new Chat({
      members: [firstId, secondId],
    });
    const response = await newChat.save();
    return res.status(201).json({
      errorCode: errorCode.SUCCESS,
      data: newChat._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error,
    });
  }
};

const findUserChats = async (req, res) => {
  const userId = req.params.userId;
  try {
    const chats = await Chat.find({
      members: { $in: [userId] },
    });
    return res.status(200).json({
      errorCode: errorCode.SUCCESS,
      data: chats,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorCode: errorCode.INTERNAL_SERVER_ERROR,
      message: error,
    });
  }
};

const findChats = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });
    return res.status(200).json({
      errorCode: errorCode.SUCCESS,
      data: chat,
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
  createChat,
  findUserChats,
  findChats,
};
