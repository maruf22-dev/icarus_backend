const axios = require('axios').default;
async function sql_connection_info(HOST) {
    let localConnection = 'http://localhost/db_manager.php?';
    let hostedConnection = 'https://icarus-database.000webhostapp.com/db_manager.php?';
    let connection = "";

    if(HOST === "LOCAL")
        connection = localConnection;
    else 
    {
        HOST = "WEB";
        connection = hostedConnection;
    }

    let api_key = 'API_KEY=' + process.env.SQL_API_KEY + '&&';
    let method = 'METHOD=returnConnectionInformation';

    let getter = connection + api_key + method;
    let response = null;
    try {
        response = await axios.get(getter);
    }
    catch (err) {
        console.log(err);
    }
    return {
        DBA: "Md. Maruf Bin Salim",
        hostedAt: HOST,
        status: response.data,
    };
}
module.exports = sql_connection_info;