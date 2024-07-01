import  userModel  from '../../../db/models/userModel.js'
import { asyncHandling } from '../../../utils/errorHandling.js'
import AppError from '../../../utils/AppError.js'

export const getUsers = asyncHandling(async (req, res, next) => {
    const users =await  userModel.find();
    if (!users) { return next(new AppError('Error Fetsching Data', 400)) }
    res.status(200).json({ msg: 'getting data' })

})
