const axios = require('axios').default;

async function sql_exec(HOST, TYPE, QUERY) {
    let localConnection = 'http://localhost/db_manager.php?';
    let hostedConnection = 'https://icarus-database.000webhostapp.com/db_manager.php?';
    if (HOST === "LOCAL")
        connection = localConnection;
    else {
        HOST = "WEB";
        connection = hostedConnection;
    }
    let api_key = 'API_KEY=' + process.env.SQL_API_KEY + '&&';
    let method = '&&METHOD=executeQuery';
    let type = '&&TYPE=' + TYPE;
    let query = 'QUERY=' + QUERY;
    let getter = connection + api_key + query + method + type;
    let response = null;
    console.log(getter);
    try {
        response = await axios.get(getter);
    }
    catch (err) {
        console.log(err);
        return response;
    }
    return {
        data: response.data,
    };
}
module.exports = sql_exec;