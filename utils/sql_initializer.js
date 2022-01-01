const axios = require('axios').default;
const QUERIES = require('./query_defination')

async function sql_init(HOST, ACTION) {
    let localConnection = 'http://localhost/db_manager.php?';
    let hostedConnection = 'https://icarus-database.000webhostapp.com/db_manager.php?';
    if (HOST === "LOCAL")
        connection = localConnection;
    else {
        HOST = "WEB";
        connection = hostedConnection;
    }
    let api_key = 'API_KEY=' + process.env.SQL_API_KEY + '&&';
    let query = 'QUERY=';
    let method = '&&METHOD=executeQuery';
    let type = '&&TYPE=DBA'


    if (ACTION === "CREATE") {
        query += QUERIES.DBA.CREATE.USER;
        query += QUERIES.DBA.CREATE.MESSAGES;
        query += QUERIES.DBA.CREATE.THREADS;
        query += QUERIES.DBA.CREATE.LASTMESSAGE;
        query += QUERIES.DBA.CREATE.RENTER;
        query += QUERIES.DBA.CREATE.FAVOURITES;
        query += QUERIES.DBA.CREATE.LISTINGS;
        query += QUERIES.DBA.CREATE.LISTER;
        query += QUERIES.DBA.CREATE.AREA;
        query += QUERIES.DBA.CREATE.REPORT;
        query += QUERIES.DBA.CREATE.ADMIN;
        query += "INSERT INTO admin(adminID, pass) VALUES ('admin','zxcvbnm')";

    }
    else if (ACTION === "DROP") {
        query += QUERIES.DBA.DROP.USER;
    }

    let getter = connection + api_key + query + method + type;
    let response = null;
    try {
        response = await axios.get(getter);
    }
    catch (err) {
        console.log(err);
    }
    return {
        data: response.data,
    };
}
module.exports = sql_init;