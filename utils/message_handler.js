const express = require('express')
let route = express.Router()
const sql_exec = require("./sql_executionar")
const QUERIES = require('./query_defination')
const { get } = require('express/lib/response')
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
const message_handler = async (message) => {
    let exists = await
        sql_exec('LOCAL', 'RETRIEVE',
            QUERIES.RETRIEVE.EXISTS(getThreadId(message.senderID, message.recieverID)));
    console.log(exists.data.data.length);
    
    if(exists.data.data.length > 0)
    {
        await
        sql_exec('LOCAL', 'UPDATE',
            QUERIES.UPDATE.UPDATE_NEW_HISTORY(getThreadId(message.senderID, message.recieverID),message.senderID, message.recieverID, message.timestamp, message.senderProfileImageLink, null));
    }
    else
    {
        await
        sql_exec('LOCAL', 'UPDATE',
            QUERIES.UPDATE.INSERT_NEW_HISTORY(getThreadId(message.senderID, message.recieverID),message.senderID, message.recieverID, message.timestamp, message.senderProfileImageLink, null));
    }

    return exists;
};

module.exports = message_handler