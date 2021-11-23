const express = require('express')
let route = express.Router()

// returns some basic information about the API
route.get('/', function (req, res) {
    const DividerLine = "_______________________________________\n";
    const DESC_INFO = "Client-side asked for the API information.\n";
    const API_INFO = {
        version: process.env.VERSION,
        author: "Md. Maruf Bin Salim",
        description: "It's the backend for CSE311 Project_1",
        initialCommit: "20/11/2021",
        port: process.env.PORT
    }
    console.info(DESC_INFO);
    console.info(DividerLine);
    console.info(API_INFO);
    console.info(DividerLine);
    res.send(API_INFO);
});

module.exports = route