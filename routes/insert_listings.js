const express = require('express')
let route = express.Router()
const sql_exec = require("../utils/sql_executionar")
const QUERIES = require('../utils/query_defination')
// returns some basic information about the DATABASE

// ?HOST=LOCAL or ?HOST=WEB

// curl command for testing
// change UID and EMAIl every time
//  curl -d '{"listID" : "111" , "listedBy" : "222", "size" : 333, "rent" :444, "beds":555, "baths" :666, "aptNo" :"777", "house" :"888", "road" :"999", "block" :"A", "location" :"bashundhara", "latitude" :22.2222222222, "longitude" :33.333333333, "vacancy" :1, "listingArea" :"12345"}' -H 'Content-Type: application/json' "http://localhost:3001/api/v1/database/insertlistings?HOST=LOCAL"

route.post('/',
    async function (req, res) {
        res.send(await
            sql_exec(
                req.query.HOST,
                'UPDATE',
                QUERIES.UPDATE.INSERT_NEW_LISTING(
  
                    req.body.listID, 
                    req.body.listedBy, 
                    req.body.size, 
                    req.body.rent, 
                    req.body.beds, 
                    req.body.baths, 
                    req.body.aptNo, 
                    req.body.house, 
                    req.body.road, 
                    req.body.block, 
                    req.body.location, 
                    req.body.latitude,
                    req.body.longitude,
                    req.body.vacancy,
                    req.body.listingArea
                )
            )
        );
    }
);

module.exports = route