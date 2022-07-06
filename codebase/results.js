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
let kartName = 'nevermind';
let wheelName = 'nevermind';
let gliderName = 'nevermind';
const speed = 5;
const acceleration = 6;
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

// extract possibles configurations with config wanted
var getPossibleConfig = function (characterName, kartName, wheelName, gliderName, callback) {
    let sqlQuery = "SELECT * FROM configurations ";
    if (!(characterName.localeCompare('nervermind') === 1)) {
        sqlQuery = sqlQuery + "WHERE character_name = '" + characterName + "' ";
    }
    if (!(kartName.localeCompare('nervermind') === 1)) {
        sqlQuery = sqlQuery + "AND kart_name = '" + kartName + "' ";
    }
    if (wheelName.localeCompare('nevermind')) {
        sqlQuery = sqlQuery + "AND wheel_name = '" + wheelName + "' ";
    }
    if (!(gliderName.localeCompare('nervermind') === 1)) {
        sqlQuery = sqlQuery + "AND glider_name = '" + gliderName + "' ";
    }
    connection.query(sqlQuery, function (err, configPossibles, fields) {
        if (err) throw err;
        console.log(sqlQuery);
        callback(configPossibles);
    });
}

var objPossibleConfig = async function(characterName, kartName, wheelName, gliderName, callback) {
    await getPossibleConfig(characterName, kartName, wheelName, gliderName, function (configPossibles) {
        var configPossiblesObj = Object.values(JSON.parse(JSON.stringify(configPossibles)));
        callback(configPossiblesObj);
    });
}

// Get three best config
var compareConfig = async function(characterName, kartName, wheelName, gliderName) {
    await objPossibleConfig (characterName, kartName, wheelName, gliderName, function(configPossiblesObj) {
        let differences = [];
        let differencesSpeed =[];
        let differencesAcceleration =[];
        let differencesSum =[];
        let indexMinSpeed = [];
        let indexMinAcceleration = [];
        let indexMinS = [];
        let indexMinA = [];
        // Tab of the distance between possible configs and wanted config
        for (i=0; i<configPossiblesObj.length; i++) {
            let diffS = Math.abs(configPossiblesObj[i].speed - configWanted.speed);
            let diffA = Math.abs(configPossiblesObj[i].acceleration - configWanted.acceleration);
            let diffW = Math.abs(configPossiblesObj[i].weight - configWanted.weight);
            let diffH = Math.abs(configPossiblesObj[i].handling - configWanted.handling);
            let diffG = Math.abs(configPossiblesObj[i].grip - configWanted.grip);
            let diff = [diffS, diffA, diffW, diffH, diffG];
            differences.push(diff);
            differencesSpeed.push(diffS);
            differencesAcceleration.push(diffA);
            differencesSum.push(diffS + diffA + diffW + diffH + diffG);
        }
        // use priority speed or acceleration
        if (priority.localeCompare('speed') === 0) {
            let minSpeed = Math.min(...differencesSpeed);
            for (i=0; i<differencesSpeed.length; i++) {
                if (differencesSpeed[i] === minSpeed) {
                    indexMinSpeed.push(i);
                }
            }
        }
        if (priority.localeCompare('acceleration') === 0) {
            let minAcceleration = Math.min(...differencesAcceleration);
            for (i=0; i<differencesAcceleration.length; i++) {
                if (differencesAcceleration[i] === minAcceleration) {
                    indexMinAcceleration.push(i);
                }
            }
        }
        // retrieves the three best config by their index
        var oneBestConfig ={};
        var twoBestConfig ={};
        var threeBestConfig ={};

        if (indexMinAcceleration.length > 0) {
            for (i=0; i<indexMinAcceleration.length ; i = i + indexMinAcceleration.length/4) {
                indexMinA.push(indexMinAcceleration[i]);
            }
            Object.assign(oneBestConfig, configPossiblesObj[indexMinA[0]]);
            Object.assign(twoBestConfig, configPossiblesObj[indexMinA[1]]);
            Object.assign(threeBestConfig, configPossiblesObj[indexMinA[2]]);
        } else if (indexMinSpeed.length > 0) {
            for (i=0; i<indexMinSpeed.length ; i = i + indexMinSpeed.length/4) {
                indexMinS.push(indexMinSpeed[i]);
            }
            Object.assign(oneBestConfig, configPossiblesObj[indexMinS[0]]);
            Object.assign(twoBestConfig, configPossiblesObj[indexMinS[1]]);
            Object.assign(threeBestConfig, configPossiblesObj[indexMinS[2]]);
        }

        console.log(oneBestConfig);
        console.log(twoBestConfig);
        console.log(threeBestConfig);
        console.log(characterName.localeCompare('nervermind'));
        console.log(kartName.localeCompare('nervermind'));
        console.log(wheelName.localeCompare('nervermind'));
        console.log(gliderName.localeCompare('nervermind'));

        connection.end();
    });
}

compareConfig(characterName, kartName, wheelName, gliderName);
