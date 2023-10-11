const mongoose = require("mongoose");
const User = require("../model/user.model");
const ChatMessage = require("../model/message.model");
const Chat = require("../model/chat.model");

const chatCommonAggregattion = () => {
    return [
        {
            // lookup for participants present
            $lookup: {
                from: "users",
                foreignField: "_id",
                localField: "participants",
                as: "participants",
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
            // lookup for the group chats
            $lookup: {
                from: "chatmessages",
                foreignField: "_id",
                localField: "lastMessage",
                as: "lastMessage",
                pipeline: [
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
                    { $addFields: { sender: { $first: "$sender" } } },
                ],
            },
        },
        {
            $addFields: {
                lastMessage: { $first: "$lastMessage" },
            },
        },
    ];
};

const deleteCascadeChatMessages = async (chatId) => {
    // fetch the messages associated with the chat to remove
    const messages = await ChatMessage.find({
        chat: mongooseId(chatId),
    });

    // delete all the messages
    await ChatMessage.deleteMany({
        chat: mongooseId(chatId),
    });
};

exports.searchAvaliableUsers = async (req, res) => {
    const keyword = req.query.search ?? "";

    const users = await User.aggregate([
        {
            $match: {
                _id: { $ne: mongooseId(req.user.id) }, // avoid logged in user
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { email: { $regex: keyword, $options: "i" } },
                ],
            },
        },
        {
            $project: {
                password: 0,
                __v: 0,
            },
        },
    ]);
    return res
        .status(200)
        .send({ users: users, message: "Users fetched successfully" });
};

exports.getAllChats = async (req, res) => {
    const chats = await Chat.aggregate([
        {
            $match: {
                participants: { $elemMatch: { $eq: mongooseId(req.user.id) } }, // get all chats that have logged in user as a participant
            },
        },
        ...chatCommonAggregattion(),
        {
            $sort: {
                updatedAt: -1,
            },
        },
    ]);
    return res.status(200).send({
        chats: chats || [],
        message: "User chats fetched successfully!",
    });
};

exports.createOrGetAOneOnOneChat = async (req, res) => {
    const { receiverId } = req.params;

    // check if it's valid reciever
    const receiver = await User.findById(receiverId);

    if (!receiver) {
        return res.status(404).send({ message: "Receiver does not exist" });
    }

    // check if receiver is not the user who is requesting a chat
    if (receiver._id.toString() === req.user.id.toString()) {
        // u didn't not implement saved message
        return res
            .status(400)
            .send({ message: "You cannot chat with yourself" });
    }

    const chat = await Chat.aggregate([
        {
            $match: {
                isGroupChat: false, // avoid group chats. This controller is responsible for one on one chats
                // Also, filter chats with participants having receiver and logged in user only
                $and: [
                    {
                        participants: {
                            $elemMatch: { $eq: mongooseId(req.user.id) },
                        },
                    },
                    {
                        participants: {
                            $elemMatch: { $eq: mongooseId(receiver._id) },
                        },
                    },
                ],
            },
        },
        ...chatCommonAggregattion(),
    ]);

    if (chat.length) {
        // if we find the chat that means user already has created a chat
        return res
            .status(200)
            .send({ chat: chat[0], message: "Chat retrieved successfully" });
    }

    // if not we need to create a new one on one chat
    const newChatInstance = await Chat.create({
        isGroupChat: false,
        chatName: "One on one chat",
        participants: [mongooseId(req.user.id), mongooseId(receiverId)],
        admin: mongooseId(req.user.id),
    });

    const createdChat = await Chat.aggregate([
        { $match: { _id: newChatInstance._id } },
        ...chatCommonAggregattion(),
    ]);

    const payload = createdChat[0]; // store the aggregate result;
    if (!payload) {
        return res.status(500).send({ message: "Internal Server Error" });
    }

    // logic to emit socket about the new chat added to the participants

    //=================================//
    return res
        .status(200)
        .send({ payload, message: "Chat retrieved successfully" });
};

exports.getAllAvaliableGroupChat = async (req, res) => {
    const groupChats = await Chat.aggregate([
        {
            $match: {
                isGroupChat: true,
            },
        },
        ...chatCommonAggregattion(),
    ]);
    res.send({ groupChats, message: "all group chats avaliable fetched" });
};
exports.createAGroupChat = async (req, res) => {
    const { name, description, participants } = req.body;
    if (!name || !description) {
        return res.status(400).send({ message: "All fields are required" });
    }

    const chatExists = await Chat.findOne({ chatName: name.toLowerCase() });

    if (chatExists) {
        return res
            .status(400)
            .send({ message: "Chat group already exists try another name" });
    }

    const createdGroupChat = await Chat.create({
        admin: mongooseId(req.user.id),
        chatName: name.toLowerCase(),
        chatDescription: description,
        isGroupChat: true,
        participants: [
            ...new Set([...(participants ?? []), mongooseId(req.user.id)]),
        ],
    });

    //structrue the chat
    const chat = await Chat.aggregate([
        { $match: { _id: createdGroupChat._id } },
        ...chatCommonAggregattion(),
    ]);

    const payload = chat[0];

    if (!payload) {
        return res.status(500).send({ message: "Internal server error" });
    }

    // logic to emit socket event goes below.......

    return res.status(201).send({ payload, message: "chat group created" });
};

exports.getGroupChatDetails = async (req, res) => {
    const chatId = req.params.chatId;

    const groupChat = await Chat.aggregate([
        { $match: { _id: mongooseId(chatId), isGroupChat: true } },
        ...chatCommonAggregattion(),
    ]);
    const chat = groupChat[0];

    if (!chat) {
        return res.status(404).send({ message: "Chat doesn't exist" });
    }

    return res.status(200).send({ chat, message: "detail group chat fetched" });
};

exports.updateGroupChat = async (req, res) => {
    const chatId = req.params.chatId;
    const { name, description } = req.body;

    // check for chat existence
    const groupChat = await Chat.findOne({
        _id: mongooseId(chatId),
        isGroupChat: true,
    });

    if (!groupChat) {
        return res.status(404).send({ message: "Chat doesn't exist" });
    }

    // only admin can update group
    if (groupChat?.admin?.toString() !== req.user.id?.toString()) {
        return res.status(404).send({ message: "you are not an admin" });
    }

    const updatedGroupChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $set: {
                chatName: name ?? groupChat.chatName,
                chatDescription: description ?? groupChat.chatDescription,
            },
        },
        { new: true }
    );

    const chat = await Chat.aggregate([
        {
            $match: {
                _id: updatedGroupChat._id,
            },
        },
        ...chatCommonAggregattion(),
    ]);

    const payload = chat[0];
    if (!payload) {
        return res.status(500).send({ message: "Internal server error" });
    }

    // emit event to all the participants...

    return res
        .status(200)
        .send({ payload, message: "Group chat name updated successfully" });
};

exports.joinGroupChat = async (req, res) => {
    const { chatId } = req.params;

    const groupChat = await Chat.findOne({
        _id: mongooseId(chatId),
        isGroupChat: true,
    });

    if (!groupChat) {
        return res.status(404).send({ message: "Group chat does not exist" });
    }

    if (groupChat.admin.toString() === req.user.id.toString()) {
        return res.status(400).send({
            message: "You are already in the group (aka- you are admin)",
        });
    }

    if (groupChat.participants.includes(req.user.id)) {
        return res
            .status(400)
            .send({ message: "You are already in the group" });
    }

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: {
                participants: mongooseId(req.user.id),
            },
        },
        {
            new: true,
        }
    );

    const chat = await Chat.aggregate([
        {
            $match: {
                _id: updatedChat._id,
            },
        },
        ...chatCommonAggregattion(),
    ]);

    const payload = chat[0];

    if (!payload) {
        return res.status(500).send({ message: "Internal server error" });
    }

    res.send({ payload, message: "joined successfully to group" });
};

exports.leaveGroupChat = async (req, res) => {
    const { chatId } = req.params;

    // check if chat is a group
    const groupChat = await Chat.findOne({
        _id: mongooseId(chatId),
        isGroupChat: true,
    });
    if (!groupChat) {
        return res.status(404).send({ message: "Group chat does not exist" });
    }

    const existingParticipants = groupChat.participants;

    if (!existingParticipants?.includes(req.user.id)) {
        return res
            .status(404)
            .send({ message: "You are not a part of this group chat" });
    }

    if (groupChat.admin.toString() === req.user.id.toString()) {
        // since the admin is leaving completely delete the group
        return res.status(200).send({
            message: "You are admin if u leave everything will be deleted",
        });
    }

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: {
                participants: mongooseId(req.user.id),
            },
        },
        {
            new: true,
        }
    );

    const chat = await Chat.aggregate([
        {
            $match: {
                _id: updatedChat.id,
            },
        },
        ...chatCommonAggregattion(),
    ]);

    const payload = chat[0];

    if (!payload) {
        return res.status(500).send({ message: "Internal server Error" });
    }

    res.status(200).send({
        payload,
        message: "leaved successfully from a grup",
    });
};

exports.addNewParticipantInGroupChat = async (req, res) => {
    const { chatId, participantId } = req.params;

    const groupChat = await Chat.findOne({
        _id: mongooseId(chatId),
        isGroupChat: true,
    });
    if (!groupChat) {
        return res.status(404).send({ message: "Group chat doesn't exist" });
    }

    //check if user who is adding is a group admin
    if (groupChat.admin?.toString() !== req.user.id.toString()) {
        return res.status(404).send("You are not admin");
    }

    const existingParticipants = groupChat.participants;

    if (existingParticipants?.includes(participantId)) {
        return res
            .status(409)
            .send({ message: "Participant already in a group" });
    }

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: {
                participants: mongooseId(participantId),
            },
        },
        { new: true }
    );

    const chat = await Chat.aggregate([
        {
            $match: {
                _id: updatedChat._id,
            },
        },
        ...chatCommonAggregattion(),
    ]);

    const payload = chat[0];

    if (!payload) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
    // emit new chat event to the added participant

    return res
        .status(200)
        .send({ payload, message: "Participant added successfully" });
};

exports.removeParticipantFromGroupChat = async (req, res) => {
    const { chatId, participantId } = req.params;

    const groupChat = await Chat.findOne({
        _id: mongooseId(chatId),
        isGroupChat: true,
    });

    if (!groupChat) {
        return res.status(404).send({ message: "Group chat doesn't exist" });
    }

    //check if user who is adding is a group admin
    if (groupChat.admin?.toString() !== req.user.id.toString()) {
        return res.status(404).send({ message: "You are not admin" });
    }

    if (groupChat.admin?.toString() === participantId) {
        return res.status(400).send({
            message:
                "participant id is admin id so it will completely delete the whole group chat",
        });
    }

    const existingParticipants = groupChat.participants;

    // check if the participant that is being removed in a part of the group
    if (!existingParticipants?.includes(participantId)) {
        return res
            .status(400)
            .send({ message: "Participant does not exist in the group chat" });
    }

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: {
                participants: participantId, // remove participant id
            },
        },
        { new: true }
    );

    const chat = await Chat.aggregate([
        {
            $match: {
                _id: updatedChat._id,
            },
        },
        ...chatCommonAggregation(),
    ]);

    const payload = chat[0];

    if (!payload) {
        return res.status(500).send({ message: "Internal server error" });
    }
    // emit leave chat event to the removed participant

    return res
        .status(200)
        .send({ payload, message: "Participant removed successfully" });
};

exports.deleteOneOnOneChat = async (req, res) => {
    const { chatId } = req.params;

    //check for chat existence
    const chat = await Chat.aggregate([
        {
            $match: {
                _id: mongooseId(chatId),
            },
        },
        ...chatCommonAggregattion(),
    ]);

    const payload = chat[0];
    if (!payload) {
        return res.status(404).send({ message: "Chat does not exist" });
    }

    const otherParticipant = payload?.participants?.find(
        (participant) => participant?._id.toString() !== req.user.id.toString()
    );

    //otherParticipant is used to emit

    await Chat.findByIdAndDelete(chatId);

    await deleteCascadeChatMessages(chatId);

    // emit event

    res.status(200).send({ data: {}, message: "chat deleted" });
};

exports.deleteGroupChat = async (req, res) => {
    const { chatId } = req.params;
    //check for group chat existence
    const groupChat = await Chat.aggregate([
        {
            $match: {
                _id: mongooseId(chatId),
            },
        },
        ...chatCommonAggregattion(),
    ]);

    const chat = groupChat[0];

    if (!chat) {
        return res.status(404).send({ message: "Group chat does not exist" });
    }

    // check if the user deleting is admin
    if (chat.admin?.toString() !== req.user.id.toString()) {
        return res
            .status(404)
            .send({ message: "Only admin can delete the group" });
    }

    // delete the chat
    await Chat.findByIdAndDelete(chatId);

    // delete all message with chatid;
    await deleteCascadeChatMessages(chatId);

    // emit event with socket

    return res
        .status(200)
        .send({ data: {}, message: "Group chat deleted successfully" });
};

const mongooseId = (id) => {
    return new mongoose.Types.ObjectId(id);
};
