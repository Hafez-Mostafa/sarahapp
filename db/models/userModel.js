import { mongoose } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    }, password: {
        type: String,
        required: true
    }, otp: { type: Boolean, default: false }
})

const userModel = mongoose.model('User',userSchema)
export default userModel