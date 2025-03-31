const User = require('../Models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser = async(req, res, next)=>{
 const token = req.cookies.token || req.headers.authorization.split('')[1];
 if(!token){
    return res.status(401).json({message: 'Unauthorized'});
 }
 try{
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   const user = await User.findById(decoded._id);

   req.user = user;
 }catch(err){
    return res.status(401).json({message: 'Unauthorized'});
 }
}