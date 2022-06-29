const express = require('express');
const app = express();
const mysql = require('mysql');
const myconnection = require('express-myconnection');

const db = {
    host : 'localhost',
    user : 'root',
    password : 'Carbone12.',
    database : 'rider_soul_builder',
}

// extraction of data
app.use(express.urlencoded({extended: false}));

// connection to database
app.use(myconnection(mysql, db, 'pool'));

// view engine
app.set('view engine', 'ejs');
app.set('views', 'front');

// statics ressources
app.use(express.static('./front/pictures'));
app.use(express.static('./front/styles'));

// routes
app.get('/', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        } else {
            connection.query('SELECT name FROM characters', [], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).render('home', {result});
                }
            });
        }
    });
});

// retrieve the chosen character
app.post('/character', (req, res) => {
    //console.log(req.body);
    let character = req.body.name;
});

app.get('/results', (req, res) => {
    res.status(200).render('results');
});

app.use((req, res) => {
    res.status(404).render('error');
});

// listening on port 5001
app.listen(5001);
console.log('Waiting for request at port 5001');