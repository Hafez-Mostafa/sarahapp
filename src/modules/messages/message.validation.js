import joi from 'joi';

export const newMessage = {
    body: joi.object({
        message: joi.string().min(3).required(),
        receiverId: joi.string().required(),
        
    }),
    // query: joi.object({
    //     flag: joi.string().min(3).max(30).required().messages({ 'any.only': 'Passwords do not match' })
    // })
};

