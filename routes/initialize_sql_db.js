const express = require('express')
let route = express.Router()
const sql_initializer = require('../utils/sql_initializer')
// returns some basic information about the DATABASE

// ?HOST=LOCAL or ?HOST=WEB // ?ACTION=CREATE or ?ACTION=DROP
route.get('/', async function (req, res) 
{
    res.send(await sql_initializer(req.query.HOST, req.query.ACTION));
});

module.exports = route