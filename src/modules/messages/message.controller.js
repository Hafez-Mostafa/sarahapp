import userModel from "../../../db/models/userModel.js";
import messageModel from "../../../db/models/messageModel.js";
import AppError from "../../../utils/AppError.js";
import { asyncHandling } from '../../../utils/errorHandling.js';
import { ObjectId } from "mongodb";


//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=Create New  Messages-=-=-=-=-=-=-=-=-=-=-=-=-=-

export const createMessage = asyncHandling(async (req, res, next) => {
    const { content } = req.body;
    const {id } = req.params;
    if (!ObjectId.isValid(id)) return next(new AppError('Invalid receiver ID format', 400));
    if (!content) return next(new AppError('Message content is required', 400));
    const receiver = await userModel.findById({ _id: id });
    if (!receiver) return next(new AppError('Receiver is unknown!', 400));
    const newMessage = await messageModel.create({ content, receiverId:id });
    if (!newMessage) return next(new AppError('Error creating message!', 400));
    res.status(201).json({ msg: 'Message sent successfully.', message: newMessage });
});



//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=Reading  Messages-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
export const readingMessage = asyncHandling(async (req, res, next) => {
    const messages = await messageModel.find({})
    if (!messages) return next(new AppError('Error fetching message!', 400));
    res.status(201).json({ msg: messages });
});
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//-=-=-=-=-=-=-=-=-=-=-=-=Delete Message-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
export const deletingmessage = asyncHandling(async (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return next(new AppError('Invalid ID format', 400));
    const message = await messageModel.deleteOne({ _id: id });
    if (message.deletedCount === 0) return next(new AppError('Message not found or already deleted!', 404));
    res.status(200).json({ msg: 'Message deleted successfully' ,message});
});
