const User = require('../Models/userSchema');
const userService = require('../Services/user.Service');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');


const cookieOption = {
  maxAge: 7*24*60*60*1000, //7days
  httpOnly: true,
  secure: true
}


const registerUser = async(req, res, next)=>{
  try{
    const errors = validationResult(req);  
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }
 
    const {fullname, email, password} = req.body;
 
 const hashedPassword = await bcrypt.hash(password,10);
 
 const user = await userService.createUser({
     firstname: fullname.firstname,
     lastname: fullname.lastname,
     email,
     password: hashedPassword
 })
 
 const token = await user.jwtToken();
 
 res.status(201).json({token, user})
  }
   catch(err){
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message
    })
   }
}

const login = async(req, res)=>{
  try{

   const errors = validationResult(req);

   if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
   }

    const {email, password} = req.body;
     console.log(email, password)
    if(!email || !password){
        return res.status(401).json('Every Field is required');
    }

    const user = await User.findOne({email}).select('+password');


    if(!user){
            return res.status(403).json("Account doesn't exist with this email")
    }
    
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(402).json('Wrong Password');
    }

    const token = await user.jwtToken();

    res.cookie('token',token,cookieOption);
    res.status(200).json({
        status: true,
        message: 'User Loggedin Successfully',
        token: token,
        user
    })
}
catch(err){
    res.status(500).json({
        error: err.message
    })
}
}

const userProfile = async(req, res, next)=>{
   req.status(200).json(req.user);
}

module.exports = {registerUser,
                  login,
                  userProfile
}