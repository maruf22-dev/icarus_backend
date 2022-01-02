const express = require('express')
let route = express.Router()
const sql_exec = require("./sql_executionar")
const QUERIES = require('./query_defination')

let getThreadId = (senderID, recieverID) => {
    let computed = "thread_";
    if (senderID < recieverID) computed = senderID + "_" + recieverID;
    else computed = recieverID + "_" + senderID;
    return computed;
}
// returns some basic information about the DATABASE

// ?HOST=LOCAL or ?HOST=WEB

// curl command for testing
// change UID and EMAIl every time
//  curl -d '{"listerID" : "111"}' -H 'Content-Type: application/json' "http://localhost:3001/api/v1/database/getlister?HOST=LOCAL"

// UPDATE listings SET vacancy='[value-14]' WHERE listings.listID=''
const send_message = async (message) => {
    let value = await sql_exec('LOCAL', 'UPDATE',
            QUERIES.UPDATE.SEND_MESSAGE(message.messageID, message.senderID, message.recieverID, 
                message.messageText, message.timestamp, message.senderProfileImageLink, getThreadId(message.senderID, message.recieverID), message.senderName));


    return value;
};

module.exports = send_message;