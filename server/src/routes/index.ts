import express, { Request, Response, NextFunction } from 'express';
import authorization from '../auth/authorization-passport';
import { upload } from '../middleware/cloudimage';
import {signIn, signOut} from '../controller/auth-controller'
import { signInValidator } from "../middleware/validators";
import validate from "../middleware/validate";
import { joiValidateSignup } from '../middleware/joi';
import {
  processNewPasswordFromUser,
  resetPasswordLink,
  getEmailFromUser,
  displayNewPasswordForm,
  updateUser,
  confirmUsers,
  createUsers,
  changePassword,
} from '../controller/users';

const router = express.Router();

router.get('/logout', signOut);
router.post('/login', signInValidator, validate, signIn);
router.post('/signup', joiValidateSignup, createUsers);
router.get('/confirm/:token', confirmUsers);
router.put('/update', authorization, upload, updateUser);
router.get('/recovery-email', getEmailFromUser);
router.post('/recovery-email', resetPasswordLink);
router.get('/reset/:token', displayNewPasswordForm);
router.post('/reset', processNewPasswordFromUser);
router.post('/changePassword', authorization, changePassword);
router.get('/profile', authorization, (req: Request, res: Response, next: NextFunction)=>{
  res.send(req.user);
});

module.exports = router;
