const express = require('express')
let route = express.Router()
const sql_connection_info = require('../../utils/sql_connection_info');

// returns some basic information about the DATABASE
route.get('/', async function (req, res) 
{
    res.send(await sql_connection_info("LOCAL"));
});

module.exports = route