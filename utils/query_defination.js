
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
    GET_NUM_OF_FAV:
        function GET_NUM_OF_FAV(ID) {
            return (
                `SELECT numOfFavs FROM renter WHERE renter.renterID='${ID}';`
            );
        },
    GET_NUM_OF_LISTING:
        function GET_NUM_OF_LISTING(ID) {
            return (
                `SELECT lister.numOfListings FROM lister WHERE lister.listerID='${ID}';`
            );
        },
    GET_LISTINGS:
        function GET_LISTINGS(ID) {
            return (
                `SELECT * from listings WHERE listings.listedBy='${ID}';`
            );
        },
    GET_LISTER:
        function GET_LISTER(ID) {
            return (
                `SELECT * from lister WHERE lister.listerID='${ID}';`
            );
        },
    EXISTS:
        function EXISTS(ID) {
            return (
                `SELECT * from lastMessage WHERE lastMessage.id='${ID}';`
            );
        },
    GET_HISTORY:
        function GET_HISTORY(ID) {
            return (
                `SELECT * from lastMessage WHERE 1;`
            );
        },
    GET_USER:
        function GET_USER(ID) {
            return (
                `SELECT * from users WHERE 1;`
            );
        },
    GET_MESSAGES:
        function GET_MESSAGES(ID) {
            return (
                `SELECT * from messages WHERE 1 order by timeSent;`
            );
        },
    GET_ALL_LISTING:
        function GET_ALL_LISTING(ID) {
            return (
                `SELECT * from listings WHERE 1;`
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
    INSERT_NEW_FAVOURITE:
        function INSERT_NEW_FAVOURITE(listingID, favouritedBy) {
            return (
                `INSERT INTO favourites(listingID, favouritedBy) VALUES  ('${listingID}','${favouritedBy}');`
            );
        },
    UPDATE_RENTER_NUM_OF_FAV:
        function UPDATE_RENTER_NUM_OF_FAV(newNumOfFav, renterID) {
            return (
                `UPDATE renter SET numOfFavs=${newNumOfFav} WHERE renter.renterID='${renterID}';`
            );
        },

    CHANGE_VACANCY:
        function CHANGE_VACANCY(listID, vacancy) {
            return (
                `UPDATE listings SET vacancy=${vacancy} WHERE listings.listID='${listID}';`
            );
        },
    UPDATE_NUM_OF_LISTING:
        function UPDATE_NUM_OF_LISTING(listID, numOfListings) {
            return (
                `UPDATE lister SET numOfListings=${numOfListings} WHERE lister.listerID='${listID}';`
            );
        },


    CHANGE_RATING:
        function CHANGE_RATING(listerID, totalRating, totalRaters) {
            return (
                `UPDATE lister SET totalRating=${totalRating},totalRaters=${totalRaters} WHERE lister.listerID='${listerID}';`
            );
        },
    SEND_MESSAGE:
        function SEND_MESSAGE(msgID, senderID, receiverID, text, timeSent, senderProfImgLink, threadID, senderName) {
            return (
                `INSERT INTO messages(msgID, senderID, receiverID, text, timeSent, senderProfImgLink, threadID, senderName) 
                VALUES ('${msgID}','${senderID}','${receiverID}','${text}','${timeSent}','${senderProfImgLink}','${threadID}','${senderName}');`
            );
        },
    INSERT_NEW_HISTORY:
        function INSERT_NEW_HISTORY(id, sentBy, receivedBy, time, senderProfilePic, receiverProfilePic) {
            return (
                `INSERT INTO lastMessage(id, sentBy, receivedBy, time, senderProfilePic, receiverProfilePic) 
                VALUES ('${id}','${sentBy}','${receivedBy}','${time}','${senderProfilePic}','${receiverProfilePic}');`
            );
        },
    UPDATE_NEW_HISTORY:
        function INSERT_NEW_HISTORY(id, sentBy, receivedBy, time, senderProfilePic, receiverProfilePic) {
            return (
                `UPDATE lastMessage SET sentBy='${sentBy}',receivedBy='${receivedBy}',time='${time}',senderProfilePic='${senderProfilePic}',receiverProfilePic='${receiverProfilePic}' 
                WHERE lastMessage.id='${id}';`
            );
        },

    // INSERT INTO favourites(listingID, favouritedBy) VALUES ('[value-1]','[value-2]');
    // INSERT_NEW_FAVOURITE

}




const QUERIES = {
    DBA: DBA,
    RETRIEVE: RETRIEVE,
    UPDATE: UPDATE
}

module.exports = QUERIES;