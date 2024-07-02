import joi from 'joi';

export const createValidMessage = {
    body: joi.object({
        content: joi.string().required(),

    }),
    params: joi.object({
        id: 
        joi.string()
        .length(24)
        .required()
        .regex(/^[0-9a-fA-F]{24}$/, 'hexadecimal')
        .message('ID must be a valid 24-character hexadecimal string')
    }),
};


export const deleteValidMessage = {

    params: joi.object({
        id:  joi.string()
        .length(24)
        .required()
        .regex(/^[0-9a-fA-F]{24}$/, 'hexadecimal')
        .message('ID must be a valid 24-character hexadecimal string')

    }),

};

