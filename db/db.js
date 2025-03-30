const mongoose = require('mongoose');
require('dotenv').config();

const MongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/Foodie_Hub';

const dbConnect = async()=>{
    await mongoose.connect(MongodbUrl)
                          .then((conn)=> console.log(`Database connected successfully ${conn.connection.host}`))
                        .catch((err)=> console.error('Error',err))}

module.exports = dbConnect;                        