const mongoose = require("mongoose");
const Chat = require("../model/chat.model");
const ChatMessage = require("../model/message.model");

const chatMessageCommonAggregation = () => {
  return [
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "sender",
        as: "sender",
        pipeline: [
          {
            $project: {
              password: 0,
              __v: 0,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        sender: { $first: "$sender" },
      },
    },
  ];
};

exports.sendMessage = async (req, res) => {
  const chatId = req.params.chatId;
  const { content } = req.body;
  if (!content) {
    return res.status(400).send({ message: "Message content is required" });
  }

  const selectedChat = await Chat.findById(chatId);
  if (!selectedChat) {
    return res.status(404).send({ message: "Chat does not exist" });
  }

  // create a new message instance with appropriate metadata
  const message = await ChatMessage.create({
    sender: mongooseId(req.user.id),
    content: content || "",
    chat: mongooseId(chatId),
  });
  // update the chat's last message which could be utilized to show last message in the list item
  const chat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $set: { lastMessage: message._id },
    },
    { new: true }
  );

  const messages = await ChatMessage.aggregate([
    {
      $match: {
        _id: mongooseId(message._id),
      },
    },
    ...chatMessageCommonAggregation(),
  ]);

  // store the aggregation result
  const receivedMessage = messages[0];

  if (!receivedMessage) {
    return res.status(500).send({ message: "Internal server error" });
  }

  // logic to emit socket event about the new message created to the other participants

  res
    .status(201)
    .send({ receivedMessage, message: "Message successfully sent" });
};
exports.getAllMessages = async (req, res) => {
  const chatId = req.params.chatId;

  const selectedChat = await Chat.findById(chatId);

  if (!selectedChat) {
    return res.status(404).send({ message: "Chat does not exist" });
  }

  // Only send messages if the logged in user is a part of the chat he is requesting messages of
  if (!selectedChat.participants?.includes(mongooseId(req.user.id))) {
    return res.status(400).send("User is not a part of this chat");
  }

  const messages = await ChatMessage.aggregate([
    {
      $match: {
        chat: mongooseId(chatId),
      },
    },
    ...chatMessageCommonAggregation(),
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  res.status(200).send({
    messages: messages || [],
    message: "Successfully fetched all messages of chat",
  });
};

const mongooseId = (id) => {
  return new mongoose.Types.ObjectId(id);
};
