import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
	const result: any = validationResult(req);

	if (!result.isEmpty()) {
		const { errors } = result;
		const message = errors[errors.length - 1].msg;
		return res.status(400).json({ message, errors });
	}
	next();
};

export default validateRequest;
