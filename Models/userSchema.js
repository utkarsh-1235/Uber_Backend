const {Schema, model} = require('mongoose');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    fullName: {
    firstName: {
        type: String,
        required: trusted,
        minlength: [3, 'first name should be equal to or more than 3 letters']
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, 'last name should be equal to or more than 3 letters']
    }},
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
          ]
    },
    password: {
        type: String,
        requiered: true,
        select: false
    },
    socketId: {
        type: String
    }

},{
    timestamps: true
})

userSchema.methods = {
    //generating token
    jwtToken: async function(){
      return await JWT.sign(
         {id: this.id, email: this.email},
         process.env.JWT_SECRET,
         { expiresIn: process.env.JWT_EXPIRY, }
      )
    },

    comparePassword: async function(password){
     return await bcrypt.compare(password, this.password);
    },

    hashPassword: async function(password){
     return await bcrypt.hash(password, 10);
    }

 }

const usermodel = model('user',userSchema);
module.exports = usermodel;