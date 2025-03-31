const express = require('express');
const userRoute = express();
const {registerUser} = require('../Controllers/userController')
const {body} = require('express-validator');

userRoute.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('passowrd must be at least 6 characters long')
], registerUser);
module.exports = userRoute;
