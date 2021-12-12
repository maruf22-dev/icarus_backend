const axios = require('axios').default;
const QUERIES = require('../utils/Query')

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