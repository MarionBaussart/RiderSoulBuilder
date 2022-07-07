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


var getConfigWanted = async function(callback) {
    await connection.query("SELECT * FROM query", [], (err, queryR) => {
        if (err) throw err;
        var queryRObj = Object.values(JSON.parse(JSON.stringify(queryR)));
        callback(queryRObj);
    });
}

// extract possibles configurations with config wanted
var getPossibleConfig = async function (callback) {
    await getConfigWanted(function(queryRObj) {
        let characterName = queryRObj[0].character_name || '';
        let kartName = queryRObj[0].kart_name || '';
        let wheelName = queryRObj[0].wheel_name || '';
        let gliderName = queryRObj[0].glider_name || '';
        // const speed = queryR.speed;
        // const acceleration = queryR.acceleration;
        // const weight = queryR.weight;
        // const handling = queryR.handling;
        // const grip = queryR.grip;
        let firstQuery = 0;
        let sqlQuery = "SELECT * FROM configurations ";
        if (!(characterName.localeCompare('nervermind') === 1)) {
            if (firstQuery === 0) {
                sqlQuery = sqlQuery + "WHERE character_name = '" + characterName + "' ";
                firstQuery++;
            }
        }
        if (!(kartName.localeCompare('nervermind') === 1)) {
            if (firstQuery === 0) {
                sqlQuery = sqlQuery + "WHERE kart_name = '" + kartName + "' ";
                firstQuery++;
            } else {
                sqlQuery = sqlQuery + "AND kart_name = '" + kartName + "' ";
            }
        }
        if (wheelName.localeCompare('nevermind')) {
            if (firstQuery === 0) {
                sqlQuery = sqlQuery + "WHERE wheel_name = '" + wheelName + "' ";
                firstQuery++;
            } else {
                sqlQuery = sqlQuery + "AND wheel_name = '" + wheelName + "' ";
            }
        }
        if (!(gliderName.localeCompare('nervermind') === 1)) {
            if (firstQuery === 0) {
                sqlQuery = sqlQuery + "WHERE glider_name = '" + gliderName + "' ";
            } else {
                sqlQuery = sqlQuery + "AND glider_name = '" + gliderName + "' ";
            }
        }
        connection.query(sqlQuery, function (err, configPossibles, fields) {
            if (err) throw err;
            console.log(sqlQuery);
            console.log(queryRObj);
            console.log(queryRObj[0].character_name);
            callback(configPossibles);
        });
    });
}

var objPossibleConfig = async function(callback) {
    await getPossibleConfig(function (configPossibles) {
        var configPossiblesObj = Object.values(JSON.parse(JSON.stringify(configPossibles)));
        callback(configPossiblesObj);
    });
}

// Get three best config
var compareConfig = async function() {
    await objPossibleConfig (function(configPossiblesObj) {
        getConfigWanted(function(queryRObj) {
            const speed = queryRObj[0].speed;
            const acceleration = queryRObj[0].acceleration;
            const weight = queryRObj[0].weight;
            const handling = queryRObj[0].handling;
            const grip = queryRObj[0].grip;
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
                let diffS = Math.abs(configPossiblesObj[i].speed - speed);
                let diffA = Math.abs(configPossiblesObj[i].acceleration - acceleration);
                let diffW = Math.abs(configPossiblesObj[i].weight - weight);
                let diffH = Math.abs(configPossiblesObj[i].handling - handling);
                let diffG = Math.abs(configPossiblesObj[i].grip - grip);
                let diff = [diffS, diffA, diffW, diffH, diffG];
                differences.push(diff);
                differencesSpeed.push(diffS);
                differencesAcceleration.push(diffA);
                differencesSum.push(diffS + diffA + diffW + diffH + diffG);
            }
            // use priority speed or acceleration
            const priority =  speed > acceleration ? 'speed' : 'acceleration';
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
            // retrieves the three best config by priority
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
            // console.log(characterName.localeCompare('nervermind'));
            // console.log(kartName.localeCompare('nervermind'));
            // console.log(wheelName.localeCompare('nervermind'));
            // console.log(gliderName.localeCompare('nervermind'));


            // create and update table results
            connection.query("TRUNCATE TABLE results", function(err, results) {
                if (err) throw err;
                let sqlResult = "INSERT INTO results (character_name, kart_name, wheel_name, glider_name, speed, acceleration, weight, handling, grip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                connection.query(sqlResult, [oneBestConfig.character_name, oneBestConfig.kart_name, oneBestConfig.wheel_name, oneBestConfig.glider_name,
                                            oneBestConfig.speed, oneBestConfig.acceleration, oneBestConfig.weight, oneBestConfig.handling, oneBestConfig.grip,
                                            twoBestConfig.character_name, twoBestConfig.kart_name, twoBestConfig.wheel_name, twoBestConfig.glider_name,
                                            twoBestConfig.speed, twoBestConfig.acceleration, twoBestConfig.weight, twoBestConfig.handling, twoBestConfig.grip,
                                            threeBestConfig.character_name, threeBestConfig.kart_name, threeBestConfig.wheel_name, threeBestConfig.glider_name,
                                            threeBestConfig.speed, threeBestConfig.acceleration, threeBestConfig.weight, threeBestConfig.handling, threeBestConfig.grip],
                                            function (err) {
                    if (err) throw err;
                    console.log(sqlResult);

                    // connection.end();
                });
            });
        });
    });

}

compareConfig();

module.exports = { compareConfig };
//