const express = require('express')
let route = express.Router()
const axios = require('axios').default;

// returns some basic information about the DATABASE
route.get('/', async function (req, res) 
{
    let response = null;
    try
    {
        response= await axios.get('https://icarus-database.000webhostapp.com/check_connection.php?API_KEY=KEY&&METHOD=returnConnectionInformation');
    }
    catch(err)
    {
        console.log(err);
    }
    const DB_INFO = {
        DBA: "Md. Maruf Bin Salim",
        hostedAt: "https://***************.000webhostapp.com/",
        status: response.data,
    }
    res.send(DB_INFO);
});

module.exports = route