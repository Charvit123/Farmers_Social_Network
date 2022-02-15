require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const socketServer=require('./socketServer');

const app = express();
app.use(express.json());

// const { createServer } = require("http");
// const httpServer = createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(httpServer);

// io.on('connection',(socket)=>{
//     // console.log(socket.id +'connected')
//     socketServer(socket);
// });

app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/dissRouter'));
const URL = process.env.MONGODB_URL;


mongoose.connect(URL, {
}, err => {
    if(err)
        throw err;
    console.log('Connected to mongodb')
});


const port = process.env.PORT || 5000;
// httpServer.listen(port, () => {
//     console.log('Server is running on port:', port);
// })
app.listen(port, () => {
    console.log('Server is running on port:', port);
})
