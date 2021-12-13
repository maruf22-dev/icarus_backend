const express = require('express')
let route = express.Router()
const sql_connection_info = require('../utils/sql_connection_info_getter');
// returns some basic information about the DATABASE

// ?HOST=LOCAL or ?HOST=WEB
route.get('/', async function (req, res) 
{
    res.send(await sql_connection_info(req.query.HOST));
});

module.exports = route