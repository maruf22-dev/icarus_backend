const express = require('express')
let route = express.Router()
const sql_exec = require("../utils/sql_executionar")
const QUERIES = require('../utils/query_defination')
// returns some basic information about the DATABASE

// ?HOST=LOCAL or ?HOST=WEB

// curl command for testing
// change UID and EMAIl every time
//  curl -d '{"listingID" : "*****", "favouritedBy" : "someone", "renterId" : "123"}' -H 'Content-Type: application/json' "http://localhost:3001/api/v1/database/addfavourite?HOST=LOCAL"

route.post('/',
    async function (req, res) {


        let favourite_add = await sql_exec(
            req.query.HOST,
            'UPDATE',
            QUERIES.UPDATE.INSERT_NEW_FAVOURITE(
                req.body.listingID,
                req.body.favouritedBy
            )
        );
        let numOfFavQuery = await sql_exec(
            req.query.HOST,
            'RETRIEVE',
            QUERIES.RETRIEVE.GET_NUM_OF_FAV(
                req.body.renterID
            )
        );
        let numOfFav = numOfFavQuery.data.data[0].numOfFavs;
        let newNumOfFav = parseInt(numOfFav) + 1;
        let increase_numofFav = await sql_exec(
            req.query.HOST,
            'UPDATE',
            QUERIES.UPDATE.UPDATE_RENTER_NUM_OF_FAV(
                newNumOfFav,
                req.body.renterID
            )
        );


        res.send({
            data: newNumOfFav,
            first: favourite_add,
            second: numOfFavQuery,
            third: increase_numofFav
        });
    }
);

module.exports = route