const app = require('./app');
require('dotenv').config();
const http = require('http');
const Port = process.env.PORT || 4001;


const server = http.createServer(app);


server.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
});