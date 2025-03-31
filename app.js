const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const userRoute = require('./Route/user.Route');
const cookieParser = require('cookie-parser');

app.use((cors()));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/users',userRoute);
app.use('/',(req,res)=>{
    console.log( 'Request', req.body);
})


module.exports = app;