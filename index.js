const express = require("express");
const app = express();
const cors = require("cors");
const serverSocket = require('socket.io');
const bodyParser = require("body-parser");
const send_message = require('./utils/send_message');
const message_handler = require('./utils/message_handler');
// The port for the server to run on
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));

// info endpoint
app.use('/api/v1/info', require('./routes/info'));
app.use('/', require('./routes/info'));

// check endpoint for sql connection
// ?HOST=LOCAL or ?HOST=WEB
app.use('/api/v1/database/sql', require('./routes/check_sql_db'));

// init endpoint for sql connection
// ?HOST=LOCAL or ?HOST=WEB // ?ACTION=CREATE or ?ACTION=DROP
app.use('/api/v1/database/sql/init', require('./routes/initialize_sql_db'));

// creates a user 
// ?DB=SQL or ?DB=MONGO
// ?HOST=LOCAL or ?HOST=WEB
app.use('/api/v1/database/createuser', require('./routes/create_user'));

// authinticates a user
// ?DB=SQL or ?DB=MONGO
// ?HOST=LOCAL or ?HOST=WEB
app.use('/api/v1/database/userauth', require('./routes/authenticate_user'));

// creates a user 
// ?DB=SQL or ?DB=MONGO
// ?HOST=LOCAL or ?HOST=WEB
app.use('/api/v1/database/insertthread', require('./routes/insert_thread'));
app.use('/api/v1/database/insertrenter', require('./routes/insert_renter'));
app.use('/api/v1/database/insertfavorites', require('./routes/insert_favorites'));
app.use('/api/v1/database/insertlistings', require('./routes/insert_listings'));
app.use('/api/v1/database/insertlister', require('./routes/insert_lister'));
app.use('/api/v1/database/insertarea', require('./routes/insert_area'));
app.use('/api/v1/database/insertreport', require('./routes/insert_report'));
// user will update : numOfFav++, insert a new Fav in favs
app.use('/api/v1/database/addfavourite', require('./routes/add_favourite'));
app.use('/api/v1/database/updatevacancy', require('./routes/update_vacancy'));
app.use('/api/v1/database/updaterating', require('./routes/update_rating'));
app.use('/api/v1/database/getlistings', require('./routes/get_listings'));
app.use('/api/v1/database/getlister', require('./routes/get_lister'));
app.use('/api/v1/database/gethistory', require('./routes/get_history'));
app.use('/api/v1/database/getuser', require('./routes/get_user'));
app.use('/api/v1/database/getmessages', require('./routes/get_messages'));
app.use('/api/v1/database/getalllisting', require('./routes/get_all_listing'));

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
        send_message(message);
        message_handler(message);
    });
    socket.on("disconnect", () => {
    })
});


// start listening with the server
server.listen(PORT, () => {
    let StartingInfo = `The Server is Listening at port : ${PORT}\n`;
    console.info(DividerLine + StartingInfo + DividerLine);
});
