// JS script that contains the functions for comparaison of possible configurations

const mysql = require('mysql');

// connection to mySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Carbone12.',
  database: 'rider_soul_builder'
});

connection.connect(function (err) {
  if (err) throw err;
});
module.exports = connection;

const getConfigWanted = async function (callback) {
  await connection.query('SELECT * FROM query', [], (err, queryR) => {
    if (err) throw err;
    const queryRObj = Object.values(JSON.parse(JSON.stringify(queryR)));
    callback(queryRObj);
  });
};

// extract possibles configurations with config wanted
const getPossibleConfig = async function (callback) {
  await getConfigWanted(function (queryRObj) {
    const characterName = queryRObj[0].character_name || '';
    const kartName = queryRObj[0].kart_name || '';
    const wheelName = queryRObj[0].wheel_name || '';
    const gliderName = queryRObj[0].glider_name || '';
    const nervermind = 'nervermind';
    let firstQuery = 0;
    let sqlQuery = 'SELECT * FROM configurations ';
    if (characterName !== nervermind) {
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
      callback(configPossibles);
    });
  });
};

const objPossibleConfig = async function (callback) {
  await getPossibleConfig(function (configPossibles) {
    const configPossiblesObj = Object.values(JSON.parse(JSON.stringify(configPossibles)));
    callback(configPossiblesObj);
  });
};

// Get three best config
const compareConfig = async function () {
  await objPossibleConfig(function (configPossiblesObj) {
    getConfigWanted(function (queryRObj) {
      const speed = queryRObj[0].speed;
      const acceleration = queryRObj[0].acceleration;
      const weight = queryRObj[0].weight;
      const handling = queryRObj[0].handling;
      const grip = queryRObj[0].grip;
      const differences = [];
      const differencesSpeed = [];
      const differencesAcceleration = [];
      const differencesSum = [];
      const indexMinSpeed = [];
      const indexMinAcceleration = [];
      const indexMinS = [];
      const indexMinA = [];
      // Tab of the distance between possible configs and wanted config
      for (let i = 0; i < configPossiblesObj.length; i++) {
        const diffS = Math.abs(configPossiblesObj[i].speed - speed);
        const diffA = Math.abs(configPossiblesObj[i].acceleration - acceleration);
        const diffW = Math.abs(configPossiblesObj[i].weight - weight);
        const diffH = Math.abs(configPossiblesObj[i].handling - handling);
        const diffG = Math.abs(configPossiblesObj[i].grip - grip);
        const diff = [diffS, diffA, diffW, diffH, diffG];
        differences.push(diff);
        differencesSpeed.push(diffS);
        differencesAcceleration.push(diffA);
        differencesSum.push(diffS + diffA + diffW + diffH + diffG);
      }
      // use priority speed or acceleration
      const priority = speed > acceleration ? 'speed' : 'acceleration';
      if (priority.localeCompare('speed') === 0) {
        const minSpeed = Math.min(...differencesSpeed);
        for (let i = 0; i < differencesSpeed.length; i++) {
          if (differencesSpeed[i] === minSpeed) {
            indexMinSpeed.push(i);
          }
        }
      }
      if (priority.localeCompare('acceleration') === 0) {
        const minAcceleration = Math.min(...differencesAcceleration);
        for (let i = 0; i < differencesAcceleration.length; i++) {
          if (differencesAcceleration[i] === minAcceleration) {
            indexMinAcceleration.push(i);
          }
        }
      }
      // retrieves the three best config by priority
      const oneBestConfig = {};
      const twoBestConfig = {};
      const threeBestConfig = {};

      if (indexMinAcceleration.length > 0) {
        for (let i = 0; i < indexMinAcceleration.length; i = i + indexMinAcceleration.length / 4) {
          indexMinA.push(indexMinAcceleration[i]);
        }
        Object.assign(oneBestConfig, configPossiblesObj[indexMinA[0]]);
        Object.assign(twoBestConfig, configPossiblesObj[indexMinA[1]]);
        Object.assign(threeBestConfig, configPossiblesObj[indexMinA[2]]);
      } else if (indexMinSpeed.length > 0) {
        for (let i = 0; i < indexMinSpeed.length; i = i + indexMinSpeed.length / 4) {
          indexMinS.push(indexMinSpeed[i]);
        }
        Object.assign(oneBestConfig, configPossiblesObj[indexMinS[0]]);
        Object.assign(twoBestConfig, configPossiblesObj[indexMinS[1]]);
        Object.assign(threeBestConfig, configPossiblesObj[indexMinS[2]]);
      }

      // create and update table results
      connection.query('TRUNCATE TABLE results', function (err, results) {
        if (err) throw err;
        const sqlResult = 'INSERT INTO results (character_name, kart_name, wheel_name, glider_name, speed, acceleration, weight, handling, grip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(sqlResult, [oneBestConfig.character_name, oneBestConfig.kart_name, oneBestConfig.wheel_name, oneBestConfig.glider_name,
          oneBestConfig.speed, oneBestConfig.acceleration, oneBestConfig.weight, oneBestConfig.handling, oneBestConfig.grip,
          twoBestConfig.character_name, twoBestConfig.kart_name, twoBestConfig.wheel_name, twoBestConfig.glider_name,
          twoBestConfig.speed, twoBestConfig.acceleration, twoBestConfig.weight, twoBestConfig.handling, twoBestConfig.grip,
          threeBestConfig.character_name, threeBestConfig.kart_name, threeBestConfig.wheel_name, threeBestConfig.glider_name,
          threeBestConfig.speed, threeBestConfig.acceleration, threeBestConfig.weight, threeBestConfig.handling, threeBestConfig.grip],
        function (err) {
          if (err) throw err;

          // connection.end();
        });
      });
    });
  });
};

module.exports = { compareConfig };
