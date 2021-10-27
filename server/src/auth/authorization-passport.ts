import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../model/signupModel";

//Function to authorization the routes with password
async function authorization(req: Request, res: Response, next: NextFunction) {
  const token = req.user || req.headers["authorization"];
  const secret = process.env.ACCESS_TOKEN_SECRET as string;
  if (!token) return res.status(401).json({ error: "Login Required" });
  console.log(token)
  try {
    if (req.user) {
     return next();
    }
    if (req.headers["authorization"]) {
      const decoded: any = jwt.verify(token, secret);
      const currentUser = await User.findById(decoded._id);
      req.user = currentUser;

      next();
    }
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
}


export default authorization;
