const express = require('express')
let route = express.Router()
const sql_exec = require("./sql_executionar")
const QUERIES = require('./query_defination')
// returns some basic information about the DATABASE

// ?HOST=LOCAL or ?HOST=WEB

// curl command for testing
// change UID and EMAIl every time
//  curl -d '{"listerID" : "111"}' -H 'Content-Type: application/json' "http://localhost:3001/api/v1/database/getlister?HOST=LOCAL"

// UPDATE listings SET vacancy='[value-14]' WHERE listings.listID=''
const message_handler = async (message) => {
    let value = await
        sql_exec(message, 'RETRIEVE',
            QUERIES.RETRIEVE.GET_LISTER(message));

    return value;
};

module.exports = message_handler