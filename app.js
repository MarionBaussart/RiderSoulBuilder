const express = require('express');
const app = express();
const morgan = require('morgan');

// statics ressources
app.use(express.static('./front/pictures'));
app.use(express.static('./front/styles'));

// //example that give the date of the request
// app.use((req, res, next) => {
//     console.log("request succeed : " + Date().toString());
//     next(); // pass to the next function middleware
// });

// information about request in the terminal
app.use(morgan("dev"));

// routes
app.get('/home', (req, res) => {
    res.status(200).sendFile("./front/home.html", {root: __dirname});
});

app.get('/results', (req, res) => {
    res.status(200).sendFile("./front/results.html", {root: __dirname});
});

app.get('/', (req, res) => {
    res.status(300).redirect("/home");
});

// route not found
app.use((req, res) => {
    res.status(404).sendFile("./front/error.html", {root: __dirname});
});

//listening
app.listen(5001, () => {
    console.log("Waiting for requests at port 5001")
});
console.log("Error when server created");
