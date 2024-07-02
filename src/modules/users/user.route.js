
import { Router } from "express";
import * as UC from './user.controller.js'
import {validation} from '../../middleware/validation.js'
import * as UV from "./user.validation.js";
import { auth } from "../../middleware/auth.js";





const route = Router()


route.get('/',UC.getUsers)
route.post('/signUp',validation(UV.signUpValidation),UC.signUp)
route.post('/signIn',validation(UV.signInValidation),UC.signIn)
route.get('/otpmail/:token',UC.emailConfirm)






export default route