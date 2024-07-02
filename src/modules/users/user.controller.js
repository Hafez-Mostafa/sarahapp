import userModel from '../../../db/models/userModel.js';
import { asyncHandling } from '../../../utils/errorHandling.js';
import AppError from '../../../utils/AppError.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { otp } from '../../../services/otp.js'



export const getUsers = asyncHandling(async (req, res, next) => {
    const users = await userModel.find();
    if (!users) {
        return next(new AppError('Error fetching data', 400));
    }
    res.status(200).json({ msg: 'Users fetched successfully', users });
});

export const signUp = asyncHandling(async (req, res, next) => {
    const { name, email, password, cpassword } = req.body;

    const emailExist = await userModel.findOne({ email })
    if (emailExist) return next(new AppError('Email is already in Use', 400))

    const token = jwt.sign({ name, email }, 'otpjwttoken');
    let otpLink = `http://localhost:3000/users/otpmail/${token}`;
    const checkemail = otp('mustafa_yassine@hotmail.com', ':) hehe', `<a href=${otpLink}>Confirm the email </a>`)
    if (!checkemail) return next(new AppError("Error Sending Email", 400))

    const hashedpassword = bcrypt.hashSync(password, 10);
    const user = await userModel.create({ name, email, password: hashedpassword })
    if (!user) return next(new AppError('User is not created', 400))


    res.status(201).json({ msg: 'Signed up successfully', user: user });
});
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

export const signIn = asyncHandling(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
   if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('User not found or Invalid credentials', 400));
  }
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET
  );
  res.status(200).json({
    message: 'User signed in successfully',
    user: { id: user._id, name: user.name, email: user.email },
    token: token
  });
});




//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-



export const emailConfirm = asyncHandling(async (req, res, next) => {
    const { token } = req.params
    let decoded = jwt.verify(token, 'otpjwttoken')
    if (!decoded) { return next(new AppError('Invalid token payload', 400)); }
    const user = await userModel.findOneAndUpdate( { email: decoded.email, otp: false }, { otp: true }, { new: true });
    if (!user) return next(new AppError('User not found or already confirmed', 404));

    res.status(201).json({ msg: 'Email confirmed successfully' });
});