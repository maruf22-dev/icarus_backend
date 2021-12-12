const express = require("express");
const app = express();
const cors = require("cors");
const serverSocket = require('socket.io');
// The port for the server to run on
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());


//requiring the routes and using them
const API_INFO_ROUTE = require('./routes/backend_info/info')
const HOSTED_SQL_DATABASE_INFO_ROUTE = require('./routes/check_sql_connection/check_sql_db');
const LOCAL_SQL_DATABASE_INFO_ROUTE = require('./routes/check_sql_connection/check_local_sql_db')
const SQL_INIT = require('./utils/sql_init')
app.use('/api/v1/info', API_INFO_ROUTE);
app.use('/api/v1/database/sql/hosted', HOSTED_SQL_DATABASE_INFO_ROUTE);
app.use('/api/v1/database/sql/local', LOCAL_SQL_DATABASE_INFO_ROUTE);
app.use('/', API_INFO_ROUTE);
let DividerLine = "_______________________________________\n";

// socekt initialization from http server
// can be accessed from any link to handle GET and POST request
const server = require('http').createServer(app);
let io = serverSocket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// socket logic
io.on('connection', (socket) => {
    // send_to_thread :
    // recieves message and sends to all users in the frontend (including the sender)
    socket.on("send_to_thread", (message) => {
        socket.broadcast.emit("recieve_message", message);
        socket.emit("recieve_message", message);
        console.log(message);
    });
    socket.on("disconnect", () => {
    })
});


// start listening with the server
server.listen(PORT, () => {
    let StartingInfo = `The Server is Listening at port : ${PORT}\n`;
    console.info(DividerLine + StartingInfo + DividerLine);
    SQL_INIT("LOCAL", "DROP");
});
