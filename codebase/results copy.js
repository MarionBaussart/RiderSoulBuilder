const mysql = require('mysql');

//connection to mySQL
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Carbone12.",
    database: "rider_soul_builder"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to database rider_soul_builder');
});
module.exports = connection;

let characterName = 'Daisy';
let kartName = 'Comet';
let wheelName = 'nevermind';
let gliderName = 'Plane Glider';
const speed = 4;
const acceleration = 5;
const weight = 0;
const handling = 4;
const grip = 4;

const configWanted = {'characterName': characterName,
                      'kartName': kartName,
                      'wheelName': wheelName,
                      'gliderName': gliderName,
                      'speed': speed,
                      'acceleration': acceleration,
                      'weight': weight,
                      'handling': handling,
                      'grip': grip};

const priority =  configWanted['speed'] > configWanted['acceleration'] ? 'speed' : 'acceleration';
let differencesSpeed = [];

// const characteristicObj = {'speed': speed, 'acceleration': acceleration, 'weight': weight, 'handling': handling, 'grip': grip};





// extract possibles configurations with config wanted
var getPossibleConfig = function (characterName, kartName, wheelName, gliderName, callback) {
    let sqlQuery = "SELECT * FROM configurations ";
    // if (!characterName.localeCompare('nervermind')) {
        sqlQuery = sqlQuery + "WHERE character_name = '" + characterName + "' ";
    // }
    if (kartName.localeCompare('nervermind')) {
        sqlQuery = sqlQuery + "AND kart_name = '" + kartName + "' ";
    }
    if (wheelName.localeCompare('nevermind')) {
        sqlQuery = sqlQuery + "AND wheel_name = '" + wheelName + "' ";
    }
    if (gliderName.localeCompare('nervermind')) {
        sqlQuery = sqlQuery + "AND glider_name = '" + gliderName + "' ";
    }
    connection.query(sqlQuery, function (err, configPossibles, fields) {
        if (err) throw err;
        callback(configPossibles);
    });
}

var objPossibleConfig = function(characterName, kartName, wheelName, gliderName, callback) {
    getPossibleConfig(characterName, kartName, wheelName, gliderName, function (configPossibles) {
        var configPossiblesObj = Object.values(JSON.parse(JSON.stringify(configPossibles)));
        callback(configPossiblesObj);
    });
}

var compareConfig = function(characterName, kartName, wheelName, gliderName) {
    objPossibleConfig (characterName, kartName, wheelName, gliderName, function(configPossiblesObj) {
        // console.log(configPossiblesObj);
        // console.log(configWanted.speed);
        for (i=0; i<configPossiblesObj.length; i++) {
            let diffS = Math.abs(configPossiblesObj[i].speed - configWanted.speed);
            differencesSpeed.push(diffS);
        }

        let minSpeed = Math.min(...differencesSpeed);
        console.log(differencesSpeed);
        console.log(minSpeed);
        console.log(differencesSpeed.indexOf(minSpeed));
        // console.log(configPossiblesObj[1].speed);
        // comparaison



        connection.end();
    });

    // var differences = [];
    // for (const config of Object.values(configPossibles.speed)) {
    //     let diffS = Math.abs(configWanted['speed'] - config);
    //     //let diffA = Math.abs(configWanted['acceleration'] - config['acceleration']);
    //     differences.push(diffS);
    // }
    // console.log(differences);
}

// console.log(configObj);
// console.log(characteristicObj);

// printPossibleConfig("Daisy", "Mr. Scooty", "Standard", "Cloud Glider");
compareConfig(characterName, kartName, wheelName, gliderName);

//console.log(configWanted);
// console.log(priority);
// compareConfig(characterName, kartName, wheelName, gliderName);