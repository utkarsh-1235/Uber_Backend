const User = require('../Models/userSchema');

module.exports.createUser = async({firstname, lastname, email, password})=>{
    if(!firstname || !email || !password){
        throw new Error('All fields are required')
    }
   
    const existingUser = await User.findOne({email});
    if(existingUser){
       throw new Error('Email already exist')
    }

    const user = await User.create({
       fullName: {
         firstName: firstname,
         lastName: lastname
       },
       email,
       password
    })
    return user;
}