const express = require('express')
let route = express.Router()
const sql_exec = require("../utils/sql_executionar")
const QUERIES = require('../utils/query_defination')
// returns some basic information about the DATABASE

// ?HOST=LOCAL or ?HOST=WEB

// curl command for testing
// change UID and EMAIl every time
//  curl -d '{"listedBy" : "111"}' -H 'Content-Type: application/json' "http://localhost:3001/api/v1/database/getalllistin/s?HOST=LOCAL"

// UPDATE listings SET vacancy='[value-14]' WHERE listings.listID=''
route.post('/',
    async function (req, res) {
        let value = await
            sql_exec(
                req.query.HOST,
                'RETRIEVE',
                QUERIES.RETRIEVE.GET_ALL_LISTING(

                )
            );
        res.send(value);
    }
);

module.exports = route