const express = require('express');
const app = express();
const mysql = require('mysql');
const myconnection = require('express-myconnection');
const results = require('./codebase/results');
// import { compareConfig, objPossibleConfig, getPossibleConfig } from './codebase/results.js';

const db = {
  host: 'localhost',
  user: 'root',
  password: 'Carbone12.',
  database: 'rider_soul_builder'
};

// extraction of data
app.use(express.urlencoded({ extended: false }));

// connection to database
app.use(myconnection(mysql, db, 'pool'));

// view engine
app.set('view engine', 'ejs');
app.set('views', 'front');

// statics ressources
app.use(express.static('./front/pictures'));
app.use(express.static('./front/pictures/characters'));
app.use(express.static('./front/pictures/karts'));
app.use(express.static('./front/pictures/wheels'));
app.use(express.static('./front/pictures/gliders'));
app.use(express.static('./front/styles'));

// home page
app.get('/', (req, res) => {
  req.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      connection.query('SELECT name FROM characters', [], (err, characterName) => {
        connection.query('SELECT name FROM karts', [], (err, kartName) => {
            connection.query('SELECT name FROM wheels', [], (err, wheelName) => {
                connection.query('SELECT name FROM gliders', [], (err, gliderName) => {
                    if (err) {
                    console.log(err);
                    } else {
                    res.status(200).render('home', { characterName, kartName, wheelName, gliderName });
                    }
                });
            });
        });
      });
    }
  });
});

// retrieve data client
app.post('/characteristic', (req, res) => {
    let characterName = 'nevermind';
    let kartName = 'nevermind';
    let wheelName = 'nevermind';
    let gliderName = 'nevermind';
    // let speed = 'nevermind';
    // let acceleration = 'nevermind';
    // let weight = 'nevermind';
    // let handling = 'nevermind';
    // let grip = 'nevermind';

    // assigned characteristic wanted if client checked the checkbox
    if (req.body.checkChar === 'on') {
        characterName = req.body.character;
    }
    if (req.body.checkKart === 'on') {
        kartName = req.body.kart;
    }
    if (req.body.checkWheel === 'on') {
        wheelName = req.body.wheels;
    }
    if (req.body.checkGlider === 'on') {
        gliderName = req.body.glider;
    }
    const speed = req.body.speed;
    const acceleration = req.body.acceleration;
    const weight = req.body.weight;
    const handling = req.body.handling;
    const grip = req.body.grip;

    // SET table with the characteristics wanted
    req.getConnection((err, connection) => {
        if (err) {
          console.log(err);
        } else {
          const sqlQuery = "UPDATE query SET character_name = ?, kart_name = ?, wheel_name = ?, glider_name = ?, speed = ?, acceleration = ?, weight = ?, handling = ?, grip = ?";
          connection.query(sqlQuery, [characterName, kartName, wheelName, gliderName, speed, acceleration, weight, handling, grip], (err, queryTable) => {
            if (err) {
                console.log(err);
                } else {
                  results.compareConfig();
                  setTimeout((callback) => {
                    res.status(300).redirect('/results');
                  }, 2000);

                }
          });
        }
    });

    //
});

// result page
app.get('/results', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
          console.log(err);
        } else {
          connection.query("SELECT * FROM query", [], async (err, queryResults) => {
            if (err) {
                console.log(err);

            } else {

              await connection.query("SELECT * FROM results", [], (err, tableResults) => {
                if (err) {
                  console.log(err);
                } else {

                  res.status(200).render('results', { queryResults, tableResults});
                }
              });
            }
          });
        }
    });
});

// incorrect URL
app.use((req, res) => {
  res.status(404).render('error');
});

// listening on port 5000
app.listen(5000, () => {
  console.info('Listening on port 5000');
});
