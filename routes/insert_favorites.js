const express = require('express')
let route = express.Router()
const sql_exec = require("../utils/sql_executionar")
const QUERIES = require('../utils/query_defination')
// returns some basic information about the DATABASE

// ?HOST=LOCAL or ?HOST=WEB

// curl command for testing
// change UID and EMAIl every time
//  curl -d '{"listingID" : "*****","favoritedBy" : "123"}' -H 'Content-Type: application/json' "http://localhost:3001/api/v1/database/insertfavorites?HOST=LOCAL"

route.post('/',
    async function (req, res) {
        res.send(await
            sql_exec(
                req.query.HOST,
                'UPDATE',
                QUERIES.UPDATE.INSERT_NEW_FAVORITE(
                    req.body.listingID,
                    req.body.favoritedBy,
                )
            )
        );
    }
);

module.exports = route