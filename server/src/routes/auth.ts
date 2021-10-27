// var express = require('express');
import express, {Request, Response, NextFunction} from "express"
const router = express.Router();
const passport = require("passport")


router.get('/google/redirect', passport.authenticate('google'), function(req:Request, res:Response, next:NextFunction) {
    res.redirect('/users/profile/')
});
 
router.get('/goal',  function(req:Request, res:Response, next:NextFunction) {
res.redirect('/users/profile/')
})

router.get('/google', passport.authenticate('google',{
    scope: ['profile','email']
}))

module.exports = router;
