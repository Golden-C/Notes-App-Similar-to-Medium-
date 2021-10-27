import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import RequestInterface, { obj, NoteInterface } from '../interfaces/interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Joi, { func } from 'joi';
import { signToken } from '../middleware/joi';
import notesUsers from '../model/signupModel';
import sendEmail from '../nodemailer';
import Folder from '../model/folderModel';
import folders from '../model/folderModel'

const EmailValidator = require('email-deep-validator');
const emailValidator = new EmailValidator();
const secret: string = process.env.ACCESS_TOKEN_SECRET as string;
const cloudinary = require('cloudinary').v2;

async function changePassword(req: RequestInterface, res: Response) {
    const user_id = req.user as JwtPayload;
    console.log(user_id, "chabgeP")
    let { oldPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      res
        .status(400)
        .json({
          status: 'Client error',
          message: 'Password does not match' });
    }
  
    const user = await notesUsers.findById(user_id);
    if(!user){
      return res.status(404).json({message: 'User doesnt exist'})
    }
    const validPassword = bcrypt.compareSync(oldPassword, user.password);
    const newPasswords = await bcrypt.hash(newPassword, 10);
  
    try {
     
      if (validPassword) {
        const updatedPassword = await notesUsers.findByIdAndUpdate(
          user._id,
          { password: newPasswords },
          { new: true },
        );
  
        return res.status(200).json({
          status: 'Ok',
          message: "Password change successful"
        });
      } 
        res.status(404).json({
          status: 'Not found',
          message: 'Not a valid password',
        });
        
    res.status(404).json({
      status: 'Not found',
      message: 'Not a valid password',
    });
  } catch (err) {
    console.log('changePassword =>', err);
    res.status(500).send({
      status: 'Not found',
      message: 'Unable to process request',
    });
  }
}

function getEmailFromUser(req: Request, res: Response) {
  return res.render('getEmail');
}

//Function to send a reset password link to the user's email address
async function resetPasswordLink(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;
  const user = await notesUsers.findOne({ email: email });

  const validatorSchema = Joi.object({
    email: Joi.string().required().min(6).max(50).email(),
  });
  const validator = validatorSchema.validate(req.body);

  try {
    if (validator.error) {
      return res.status(404).json({
        status: 'Not found',
        message: validator.error.details[0].message,
      });
    }

    if (!user) {
      return res.status(404).json({
        status: 'Not found',
        message: 'User not found',
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '24h' }
    );

    const Email = email;
    const subject = 'Reset Password'
    const link = `${req.protocol}://localhost:3000/password/${token}`;
    const body = `
    <h2>Please click on the given <a href=${link}>link</a>  to reset your password</h2>
    `;
  
    if (process.env.CONDITION !== "test"){
        await sendEmail(subject, Email, body)
    }
    return res.status(200).render('fakeEmailView', { link });
  } catch (err) {
    res.status(500).json({
      status: 'Server Error',
      message: 'Unable to process request',
    });
  }
}

//Function to get get new password from the user
async function displayNewPasswordForm(req: Request, res: Response) {
  const token = req.params.token;

  if (!token) {
    res.status(401).json({
      status: '401 Unauthorized',
      message: 'Token not found',
    });
  }
  try {
    const verified = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    res.render('resetPassword', { token: token });
  } catch (err) {
    console.log('displayNewPasswordForm => ', err);
    res.status(401).json({
      status: '401 Unauthorized',
      message: 'Invalid token',
    });
  }
}

//Function to process the new password from the user
async function processNewPasswordFromUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const ValidateSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required().min(6).max(20),
    confirmPassword: Joi.string().required().min(6).max(20),
  });

  const validator = ValidateSchema.validate(req.body);
  if (validator.error) {
    return res.status(400).json({
      message: validator.error.details[0].message,
    });
  }

  try {
    const { password, confirmPassword, token } = req.body;
    if (password !== confirmPassword) {
      res.status(400).json({
        status: 'Client error',
        message: 'Password does not match',
      });
    }

    const check = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    const hashedPassword = bcrypt.hashSync(password, 12);

    const updatedUser = await notesUsers.findByIdAndUpdate(
      check.userId,
      { password: hashedPassword },
      { new: true }
    );

    // const { id, name, email } = updatedUser;

    // return res.redirect('/');
    return res.status(200).json({
      status: 'Successful',
      message: 'Password reset successful',
    });
  } catch (err) {
    console.log('forgotPassword =>', err);
    res.status(500).json({
      status: 'Service Error',
      message: 'Unable to process request',
    });
  }
}

async function createUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const { firstName, lastName, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
      res.status(404).send({ msg: 'Password do not match' });
      return;
    }
    let finder = await notesUsers.findOne({ email });
    if (finder) {
      res.status(404).send({ msg: 'Email already exists' });
      return;
    }
    const { validDomain } = await emailValidator.verify(email);
    if (!validDomain) {
      res.status(404).send({ msg: 'Please provide a valid email address' });
      return;
    }
    const newUsers: obj = {
      firstName,
      lastName,
      email,
      password,
    };
    let token = await signToken(newUsers);
    const subject = 'Please Verify Your Account'
    const Email = email;
    const body = `
    <h2>Please click on the given <a href="http://localhost:3000/redirect/${token}">link</a> to activate your acount.</h2></br>
    <h3>This link expires in 15mins</h3>
    `
        //email services
    if (process.env.CONDITION !== "test"){
        await sendEmail(subject, Email, body)
    }
    res
      .status(201)
      .send({ msg: 'A mail has been sent to you for verification!!!' });
  } catch (err: any) {
    // console.log(err)
    res.status(404).send({ msg: 'Error!!!' });
    return;
  }
}

async function confirmUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const decoded: any = jwt.verify(req.params.token, secret);
    const { args } = decoded;
    if (!args) {
      throw new Error('Thrown here');
    }
    const user = await notesUsers.create(args);
    
    res.status(201).send({ msg: 'Created Successful!!!' });
  } catch (err: any) {
    res.status(404).send({ msg: 'Invalid Token!!!' });
    return;
  }
}

async function updateUser(req: Request, res: Response): Promise<void> {
  let id = req.user._id;
  let img_Url;
  // if (Object.keys(req.body).length === 0) {
  //   res.status(404).json({ message: 'Please Input needed fields' });
  //   return;
  // }
  const user = (await notesUsers.findById(id)) as unknown as {
    [key: string]: string | boolean;
  };
  img_Url = user.avatar;
  if (req.file) {
    
    const { url } = await cloudinary.uploader.upload(req.file?.path);
    img_Url = url;
  }
  let fname = req.body.firstName || " "
  let lname = req.body.lastName || " "
  let emil = req.body.email || " "
  let gend = req.body.gender || " "

let newDetails = {
  firstName: fname.trim() || user.firstName,
  lastName: lname.trim() || user.lastName,
  email: emil.trim() || user.email,
  gender: gend.trim() || user.gender,
  role: req.body.role,
  about: req.body.about,
  location: req.body.location,
  avatar: img_Url,
}
  notesUsers.findByIdAndUpdate(id,newDetails,(err: any) => {
      if (err) {
        return res.status(404).json({
          message: err.message,
          type: 'fail',
        });
      }
      res.status(201).json({
        message: 'Profile updated successfully!',
        data:newDetails
      });
    }
  );
}

export {
  confirmUsers,
  updateUser,
  createUsers,
  changePassword,
  getEmailFromUser,
  resetPasswordLink,
  displayNewPasswordForm,
  processNewPasswordFromUser,
};
