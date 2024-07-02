import joi from 'joi';

export const signUpValidation = {
    body: joi.object({
        name: joi.string().alphanum().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required(),
        cpassword:joi.any().valid(joi.ref('password')).required()
    }),
    // query: joi.object({
    //     flag: joi.string().min(3).max(30).required().messages({ 'any.only': 'Passwords do not match' })
    // })
};



export const signInValidation = {
    body: joi.object({
        email: joi.string().email().required(),
        password: joi.string()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required()
    }),
  
};
