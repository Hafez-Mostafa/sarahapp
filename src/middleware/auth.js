import AppError from "../../utils/AppError.js"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import userModel from "../../db/models/userModel.js"
dotenv.config()

export const auth = () => {
    return async (req, res, next) => {

        const { token } = req.headers
        if (!token) return next(new AppError('Token not found', 404))
        const bearer = process.env.JWT_BEARER
        if (!token.startsWith(bearer)) return next(new AppError('Invalid Bearer', 400))
        // const newToken = token.split(bearer)[1]
        const newToken = token.slice(bearer.length).trim();
        let decoded = jwt.verify(newToken, process.env.JWT_SECRET)
        if (!decoded) return next(new AppError('invalid signature', 400))
        const user = userModel.findById(decoded?.id)
        if (!user) return next(new AppError('user is inValid', 400))
        req.user = user
        next()




    }
}