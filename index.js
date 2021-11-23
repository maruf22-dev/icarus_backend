const express = require("express");
const app = express();
const cors = require("cors");
const serverSocket = require('socket.io');

require('dotenv').config();
app.use(express.json());
app.use(cors());
const server = require('http').createServer(app);

// The port for the server to run on
let PORT = process.env.SERVER_PORT || 3000;

//requiring the routes and using them
const API_INFO_ROUTE = require('./routes/info')
app.use('/api/v1/info', API_INFO_ROUTE);

let DividerLine = "_______________________________________\n";

// socekt init
// can be accessed from any link to handle GET and POST request
let io = serverSocket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// socket logic
io.on('connection', (socket) => {
    
    // socket.emit(jointhread, threadID)
    // thread_kjahsdkjashd
    console.info('A socket connection was created\n');
    console.info('socket ID: ' + socket.id + '\n');
    console.info(DividerLine);

    // send_to_thread
    socket.on("send_to_thread", (message) => {
        // console.log(socket.rooms);
        // console.info("New text socket : " + socket.id + " is :\n");
        // console.info(message);
        // console.info("Thread : " + message.threadID + "\n");
        // console.info(DividerLine);
        socket.broadcast.emit("recieve_message", message);
        socket.emit("recieve_message", message);
        console.log(message);
    });

    socket.on("disconnect", () => {
        // console.info("The socket " + socket.id + " was disconnected.");
        // console.info(DividerLine);
    })
});


// run the server
server.listen(PORT, () => {
    let StartingInfo = `The Server is Listening at port : ${PORT}\n`;
    console.info(DividerLine + StartingInfo + DividerLine);
});
