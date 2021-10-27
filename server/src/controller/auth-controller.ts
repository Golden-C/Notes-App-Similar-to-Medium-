
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/signupModel";
// import { sendMail } from "../services/email-service";

const signIn = async (req: Request, res: Response) => {
	const { email:userEmail, password } = req.body;

	try {
		const user = await User.validateCredentials(userEmail, password);
		const secret = process.env.ACCESS_TOKEN_SECRET!;
		const token = jwt.sign({ _id: user._id }, secret);

		res.cookie("tko", token, {
			maxAge: 1000 * 60 * 60,
			httpOnly: false,
		});
		const {_id="", firstName="", lastName="", email="", about="", location="", gender="", avatar=""} = user
		
		res.status(200).json({ 
			user:{_id, firstName, lastName, email, about, location, gender, avatar},
			token });
	} catch (err:any) {
		console.log(err.message)
		res.status(400).json({
			error: err.message,
		});
	}
};

const signOut = async (req: Request, res: Response) => {
	res.clearCookie("tko");
	return res.status(200).json({
		message: "signed out successfully",
	});
};
export {signIn, signOut}