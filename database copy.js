const express = require('express');
const app = express();
const port = 5501;
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

// get the character information
var getCharacterInfos = function (name, callback) {
    let sqlQuery = "SELECT * FROM characters WHERE name = '" + name + "'";
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        callback(result);
    });
}

// print character information
var printCharacterInfos = function(name) {
    getCharacterInfos(name, function(result) {
        console.log(JSON.stringify(result));
        connection.end();
    })
}

// get the specific configuration with character name and specific speed, acceleration
var getConfig = function (charName, kartName, callback) {
    let sqlQuery = "SELECT * FROM configurations WHERE character_name = '" + charName + "' AND kart_name = '" + kartName + "'";
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        callback(result);
    });
}

// print specific config
var printConfig = function(name, kartName) {
    getConfig(name, kartName, function(result) {
        console.log(JSON.stringify(result, ['wheel_name', 'glider_name','speed', 'acceleration'], '\t'));
        connection.end();
    })
}

// print configuration

printConfig("Yoshi", "Mr. Scooty");

// // listening on port ?
// app.listen(port, () => {
//     console.log("Aplication à l'écoute sur le port ${port}")
// });
