// UPDATE table_name
// SET column1 = value1, column2 = value2, ...

const express = require('express')
let route = express.Router()
const sql_exec = require("../utils/sql_executionar")
const QUERIES = require('../utils/query_defination')
// returns some basic information about the DATABASE

// ?HOST=LOCAL or ?HOST=WEB

// curl command for testing
// change UID and EMAIl every time
//  curl -d '{"areaID":"123", "latitude":45.3453453456,  "longitude":50.23452345}' -H 'Content-Type: application/json' "http://localhost:3001/api/v1/database/insertarea?HOST=LOCAL"

route.post('/',
    async function (req, res) {
        res.send(await
            sql_exec(
                req.query.HOST,
                'UPDATE',
                QUERIES.UPDATE.UPDATE_USER_PROFILE(
                    req.body.profilepic,
                    req.body.username,
                    req.body.bio,
                    req.body.phone,
                    req.body.email,
                    req.body.occupation,
                    req.body.address,
                    req.body.usertype,
                    req.body.userID
                )
            )
        );
    }
);

module.exports = route