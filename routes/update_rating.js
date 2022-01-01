const express = require('express')
let route = express.Router()
const sql_exec = require("../utils/sql_executionar")
const QUERIES = require('../utils/query_defination')
// returns some basic information about the DATABASE

// ?HOST=LOCAL or ?HOST=WEB

// curl command for testing
// change UID and EMAIl every time
//  curl -d '{"listerID" : "111", "totalRating" : 0, "totalRaters" : 0}' -H 'Content-Type: application/json' "http://localhost:3001/api/v1/database/updaterating?HOST=LOCAL"

// UPDATE listings SET vacancy='[value-14]' WHERE listings.listID=''
route.post('/',
    async function (req, res) {
        let update = await
            sql_exec(
                req.query.HOST,
                'UPDATE',
                QUERIES.UPDATE.CHANGE_RATING(
                    req.body.listerID,
                    req.body.totalRating,
                    req.body.totalRaters
                )
            );
        res.send(
            update
        );
    }
);

module.exports = route