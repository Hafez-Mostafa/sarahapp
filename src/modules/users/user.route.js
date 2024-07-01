
import { Router } from "express";
import * as UC from './user.controller.js'


const route = Router()


route.get('/',UC.getUsers)


export default route