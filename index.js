import express   from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import AppError from './utils/AppError.js';
import  {globalErrorHandling}  from './utils/errorHandling.js';
import  connectionDB  from './db/connectionDB.js';
import  userRoute  from './src/modules/users/user.route.js';




dotenv.config();
const app = express()
// Configure CORS
const corsConfig = {
    origin: "*",
    credentials: true, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
};
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
connectionDB()
app.use(express())
app.use(express.json());





app.use('/users',userRoute)
app.get('/', (req, res, next) => {
    res.status(200).send('Hello SarahApp!');
});

app.get('*', (req, res,next) =>{
    return next(new AppError(`Invalid URL : ${req.originalUrl}`,404))
})

app.use(globalErrorHandling);

const PORT =  process.env.PORT||3000
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`))