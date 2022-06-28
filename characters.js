const express = require('express');
const app = express();

app.set("view engine", "ejs");
/* GET characters name */
app.get('/', (req, res) => {
    res.render('characters', {
                title: 'Characters list',
                characters: ["p1", "p2"]
            });
        });

app.listen(5001, () => {
    console.log("listening on : http://localhost:5001/");
});
