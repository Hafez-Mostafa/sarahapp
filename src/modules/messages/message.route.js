
import { Router } from "express";
import * as MC from './message.controller.js'
import {validation} from '../../middleware/validation.js'
import * as MV from "./message.validation.js";
import { auth } from "../../middleware/auth.js";

const route = Router()


route.post('/',validation(MV.newMessage),auth(),MC.newMessage)
route.get('/',auth(),MC.readingMessage)
route.delete('/delete/:id',auth(),MC.deletingmessage)






export default route