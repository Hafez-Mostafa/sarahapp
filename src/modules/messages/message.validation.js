import joi from 'joi';

export const createValidMessage = {
    body: joi.object({
        content: joi.string().required(),

    }),
    params: joi.object({
        id: joi.string().required()

    }),
};


export const deleteValidMessage = {

    params: joi.object({
        id: joi.string().required()

    }),

};

