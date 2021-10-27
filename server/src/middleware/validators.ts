import { body } from "express-validator";

const signInValidator = [
	body("email")
		.notEmpty()
		.isEmail()
		.withMessage("Email is required"),
	body("password")
		.notEmpty()
		.isString()
		.isLength({ min: 7 })
		.withMessage("Password is required"),
];

const registerValidator = [
	body("fullName")
		.notEmpty()
		.isString()
		.withMessage("Full name is required"),
	body("email")
		.notEmpty()
		.isEmail()
		.withMessage("Email is required"),
	body("password")
		.notEmpty()
		.isString()
		.isLength({ min: 7 })
		.withMessage("Password is required"),
];

const resetPasswordValidator = [
	body("token")
		.notEmpty()
		.isString()
		.withMessage("Token Required"),
	body("newPassword")
		.notEmpty()
		.isString()
		.isLength({ min: 7 })
		.withMessage("Your new Password should be at least 7 characters"),
	body("confirmPassword")
		.notEmpty()
		.isString()
		.isLength({ min: 7 })
		.withMessage("Your confirmed Password should be at least 7 characters"),
];

const forgotPasswordValidator = [
	body("email")
		.notEmpty()
		.isEmail()
		.withMessage("Email is required")
];

const profileValidator = [
	body("fullName")
		.notEmpty()
		.isString()
		.withMessage("Full name is required"),
];

const changePasswordValidator = [
	body("password")
		.notEmpty()
		.isString()
		.isLength({ min: 7 })
		.withMessage("Old Password is required"),
	body("newPassword")
		.notEmpty()
		.isString()
		.isLength({ min: 7 })
		.withMessage("Your new Password should be at least 7 characters"),
	body("confirmPassword")
		.notEmpty()
		.isString()
		.isLength({ min: 7 })
		.withMessage("Your confirmed Password should be at least 7 characters"),
];

export {
  signInValidator,
  profileValidator,
  registerValidator,
  resetPasswordValidator,
  forgotPasswordValidator,
  changePasswordValidator
}