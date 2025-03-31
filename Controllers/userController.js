const User = require('../Models/userSchema');
const userService = require('../Services/user.Service');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

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

module.exports = {registerUser}