const express = require('express');
const app = express();
const cors = require('cors');

app.use((cors()));
app.use(express.json());
app.get('/',(req,res)=>{
    console.log( 'Request',req);
})


module.exports = app;