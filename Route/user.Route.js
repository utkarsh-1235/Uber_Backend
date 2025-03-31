const express = require('express');
const userRoute = express();
const {registerUser, login, userProfile} = require('../Controllers/userController')
const authMiddleware = require('../Middlewares/auth.middleware');
const {body} = require('express-validator');

userRoute.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('password must be at least 6 characters long')
], registerUser);

userRoute.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('password must be atleast 6 characters long') 
],login);

userRoute.get('/profile',authMiddleware.authUser, userProfile);
module.exports = userRoute;
