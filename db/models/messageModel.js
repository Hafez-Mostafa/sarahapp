import {mongoose} from "mongoose";
const {Schema} = mongoose;


const messageSchema = new Schema({
    content:{
        type:String,
        require:true,
        
    },
    receiverId:{
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'user'
        }
    

},{timestamps:true}
)


const messageModel = mongoose.model('message', messageSchema);
export default messageModel;