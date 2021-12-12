function sql_init(HOST, ACTION)
{
    let localConnection = 'http://localhost/db_manager.php?';
    let hostedConnection = 'https://icarus-database.000webhostapp.com/db_manager.php?';
    let api_key = process.env.SQL_API_KEY;
    let connection = (HOST === "LOCAL") ? localConnection : hostedConnection;
    let query = '';
    let method = '';

    let final = connection;
    if(ACTION === "CREATE")
    {
        console.log(connection);
    }
    if(ACTION === "DROP")
    {
        console.log(connection);
    }
}
module.exports = sql_init;