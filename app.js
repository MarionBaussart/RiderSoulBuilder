const express = require('express');
const app = express();

// statics ressources
app.use(express.static('./front/pictures'));
app.use(express.static('./front/styles'));

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

app.use((req, res) => {
    res.status(404).sendFile("./front/error.html", {root : __dirname});
});

// listening on port 5001
app.listen(5001);
console.log('Waiting for request at port 5001');