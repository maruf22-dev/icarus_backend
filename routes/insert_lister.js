const express = require('express')
let route = express.Router()
const sql_exec = require("../utils/sql_executionar")
const QUERIES = require('../utils/query_defination')
// returns some basic information about the DATABASE

// ?HOST=LOCAL or ?HOST=WEB

// curl command for testing
// change UID and EMAIl every time
//  curl -d '{"listerID":"123", "numOfListings":456,  "totalRating":50, "totalRaters":9}' -H 'Content-Type: application/json' "http://localhost:3001/api/v1/database/insertlister?HOST=LOCAL"

route.post('/',
    async function (req, res) {
        res.send(await
            sql_exec(
                req.query.HOST,
                'UPDATE',
                QUERIES.UPDATE.INSERT_NEW_LISTER(
                    req.body.listerID, 
                    req.body.numOfListings, 
                    req.body.totalRating, 
                    req.body.totalRaters,
                )
            )
        );
    }
);

module.exports = route