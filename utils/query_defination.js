
const CREATE =
{
    USER:
    "CREATE TABLE users(name varchar(255) NOT NULL,email varchar(255) NOT NULL,password varchar(255) NOT NULL,userID varchar(255) NOT NULL,profileImageLink varchar(1000),otp varchar(255),usertype varchar(255) NOT NULL,phoneNumber varchar(20),occupation varchar(255),address varchar(1000),reportCount int,bio varchar(1000),PRIMARY KEY (email)); ",
    MESSAGES:
    "CREATE TABLE messages(msgID varchar(255) NOT NULL,senderID varchar(255) NOT NULL,receiverID varchar(255) NOT NULL,text varchar(1000) NOT NULL,timeSent varchar(255) NOT NULL,senderProfImgLink varchar(1000),threadID varchar(100) NOT NULL,senderName varchar(255) NOT NULL,PRIMARY KEY (msgID));",
    THREADS:
    "CREATE TABLE threads( threadID varchar(255) NOT NULL,seen int,PRIMARY KEY (threadID));",
    LASTMESSAGE:
    "create table lastMessage ( id varchar(255) NOT NULL,sentBy varchar(255) NOT NULL,receivedBy varchar(255) NOT NULL,time varchar(255) NOT NULL,senderProfilePic varchar(1000),receiverProfilePic varchar(1000),PRIMARY KEY (id));",
    RENTER:
    "CREATE TABLE renter ( renterID varchar(255) NOT null,numOfFavs int,PRIMARY KEY (renterID));",
    FAVOURITES:
    "CREATE TABLE favourites ( listingID varchar(255) NOT null,favouritedBy varchar(255) NOT null,PRIMARY KEY (listingID));",
    LISTINGS:
    "CREATE TABLE listings( listID varchar(255) NOT null,listedBy varchar(255) NOT null,size int NOT null,rent int not null,beds int not null,baths int not null,aptNo varchar(255),house varchar(255),road varchar(255) not null,block varchar(255) not null,location varchar(1000),latitude float not null,longitude float not null,vacancy int not null,listingArea varchar(255) not null,PRIMARY KEY (listID));",
    LISTER:
    "CREATE table lister( listerID varchar(255) not null,numOfListings int not null,totalRating int not null,totalRaters int not null,PRIMARY KEY (listerID));",
    AREA:
    "CREATE TABLE area(areaID varchar(255) not null,latitude float not null,longitude float not null,PRIMARY KEY (areaID));",
    REPORT:
    "create table report(reportID varchar(255) not null,reportedBy varchar(255) not null,reportedTo varchar(255) not null,reason varchar(1000) not null,PRIMARY KEY (reportID));",
    ADMIN:
    "CREATE TABLE admin(adminID varchar(255) not null,pass varchar(255) not null,PRIMARY KEY(adminID));",
}


const DROP =
{
    USER:
        " DROP TABLE users;"
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
                `SELECT name, email, userID, password FROM users WHERE ` +
                `email = '${EMAIL}' ; `
            );
        },
    GET_USERS_BASIC_INFO: "SELECT name, userID, profileImageLink FROM users",

    CHECK_LAST_MESSAGE:
    function CHECK_LAST_MESSAGE(ID) {
        return (
            `SELECT * FROM lastMessage WHERE lastMessage.id='${ID}';`
        );
    },

//     UPDATE_LISITING:
//     function CHECK_LAST_MESSAGE(ID) {
//         return (
//             `SELECT * FROM lastMessage WHERE lastMessage.id='${ID}';`
//         );
//     },


//     UPDATE listings SET vacancy='[value-14]' 
// WHERE listings.listID=''

}



const UPDATE =
{
    INSERT_NEW_USER:
        function INSERT_NEW_USER(USERNAME, USERID, EMAIL, PASSWORD) {
            return (
                `INSERT INTO users (userID, name, email, password, usertype) ` +
                ` VALUES('${USERID}', '${USERNAME}', '${EMAIL}', '${PASSWORD}', 'RENTER'); `
            );
        },
    INSERT_NEW_THREAD:
        function INSERT_NEW_THREAD(THREADID) {
            return (
                `INSERT into threads VALUES ("${THREADID}", 0);`
            );
        },
    INSERT_NEW_RENTER:
        function INSERT_NEW_RENTER(ID) {
            return (
                `INSERT into renter VALUES ("${ID}", 0);`
            );
        },
        INSERT_NEW_FAVORITE:
        function INSERT_NEW_FAVORITE(listingID, favouritedBy) {
            return (
                `INSERT into favourites VALUES ("${listingID}", "${favouritedBy}");`
            );
        },
        INSERT_NEW_LISTING:
        function INSERT_NEW_LISTING(listID, listedBy, size, rent, beds, baths, aptNo, house, road, block, location, latitude, longitude, vacancy, listingArea) {
            return (
                `INSERT INTO listings(listID, listedBy, size, rent, beds, baths, aptNo, house, road, block, location, latitude, longitude, vacancy, listingArea) 
                VALUES ('${listID}','${listedBy}',${size},${rent},${beds},${baths},'${aptNo}','${house}','${road}','${block}','${location}',${latitude},${longitude},${vacancy},'${listingArea}');`
            );
        },
        INSERT_NEW_LISTER:
        function INSERT_NEW_LISTER(listerID, numOfListings, totalRating, totalRaters) {
            return (
                `INSERT INTO lister(listerID, numOfListings, totalRating, totalRaters) 
                VALUES ('${listerID}',${numOfListings},${totalRating},${totalRaters});`
            );
        },
        INSERT_NEW_AREA:
        function INSERT_NEW_AREA(areaID, latitude, longitude) {
            return (
                `INSERT INTO area(areaID, latitude, longitude) 
                VALUES ('${areaID}',${latitude},${longitude});`
            );
        },
        INSERT_NEW_REPORT:
        function INSERT_NEW_REPORT(reportID, reportedBy, reportedTo, reason) {
            return (
                `INSERT INTO report(reportID, reportedBy, reportedTo, reason) VALUES ('${reportID}','${reportedBy}','${reportedTo}','${reason}');`
            );
        },
        
}

const QUERIES = {
    DBA: DBA,
    RETRIEVE: RETRIEVE,
    UPDATE: UPDATE
}

module.exports = QUERIES;