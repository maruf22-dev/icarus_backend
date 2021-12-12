const CREATE =
{
    USER:
        " CREATE TABLE user " +
        " ( userName varchar(255) NOT NULL," +
        " email varchar(255)  NOT NULL," +
        " password varchar(255) NOT NULL," +
        " userID varchar(255)  NOT NULL," +
        " profileImageLink varchar(255)," +
        " otp varchar(255), " +
        " PRIMARY KEY (userID, email)); "
}

const DROP =
{
    USER:
        " DROP TABLE user;"
}

const DBA =
{
    CREATE: CREATE,
    DROP: DROP,
}

const RETRIEVE =
{

}

const UPDATE =
{

}

const QUERIES = {
    DBA: DBA,
    RETRIEVE: RETRIEVE,
    UPDATE: UPDATE
}

module.exports = QUERIES;