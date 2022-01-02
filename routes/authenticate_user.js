const express = require('express')
let route = express.Router()
const sql_exec = require("../utils/sql_executionar")
const QUERIES = require('../utils/query_defination')
// returns some basic information about the DATABASE

// ?HOST=LOCAL or ?HOST=WEB

// curl command for testing
// change UID and EMAIl every time
//  curl -d '{"email" : "email", "password" : "*****"}' -H 'Content-Type: application/json' http://localhost:3001/api/v1/database/userauth?HOST=LOCAL

route.post('/',
    async function (req, res) {
        console.log(req.body.email);
        console.log(req.query.HOST);
        let info = await sql_exec(
            req.query.HOST,
            'RETRIEVE',
            QUERIES.RETRIEVE.GET_USER_AUTH(
                req.body.email
            )
        );
        let response = null;
        console.log(info.data.data);
        if (info.data.data.length === 0) {
            response = {
                status_code: 403,
                error: "EMAIL_NOT_FOUND",
                main:
                {
                    password: req.body.password,
                    email: req.body.email,
                }
            }
        }
        else {
            let userID = info.data.data[0].userID;
            let username = info.data.data[0].name;
            let email = info.data.data[0].email;
            let password = info.data.data[0].password;

            // verify
            let verified = (email === req.body.email) && (password === req.body.password);

            if (verified) {
                response =
                {
                    status_code: 200,
                    error: null,
                    main:
                    {
                        password: password,
                        email: email,
                        userName: username,
                        userID: userID,
                    }
                }
            }
            else {
                response =
                {
                    status_code: 403,
                    error: "AUTHENTICATION_ERROR",
                    main:
                    {
                        password: req.body.password,
                        email: req.body.email,
                    }
                }
            }


        }
        console.log(response);
        res.send(response);
    }
);

module.exports = route