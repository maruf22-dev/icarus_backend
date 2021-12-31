
const CREATE =
{
    USER:
        " CREATE TABLE user " +
        " (userName varchar(255) NOT NULL," +
        " email varchar(255)  NOT NULL," +
        " password varchar(255) NOT NULL," +
        " userID varchar(255)  NOT NULL," +
        " profileImageLink varchar(255)," +
        " otp varchar(255), " +
        " PRIMARY KEY (email)); ",
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
    GET_USER_AUTH:
        function GET_USER_AUTH(EMAIL) {
            return (
                `SELECT userName, email, userID, password FROM user WHERE ` +
                `email = '${EMAIL}' ; `
            );
        },
    GET_USERS_BASIC_INFO: "SELECT userName, userID, profileImageLink FROM user"
}



const UPDATE =
{
    INSERT_NEW_USER:
        function INSERT_NEW_USER(USERNAME, USERID, EMAIL, PASSWORD) {
            return (
                `INSERT INTO user (userID, profileImageLink, userName, email, password, otp)` +
                ` VALUES('${USERID}', NULL, '${USERNAME}', '${EMAIL}', '${PASSWORD}', NULL); `
            );
        },
}

const QUERIES = {
    DBA: DBA,
    RETRIEVE: RETRIEVE,
    UPDATE: UPDATE
}

module.exports = QUERIES;