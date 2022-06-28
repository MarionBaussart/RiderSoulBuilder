const http = require("http");
const fs = require('fs');
const uuid = require("uuid")

const server = http.createServer((req, res) => {
    console.log(uuid.v4());

    //header
    res.setHeader("content-type", "text/html");

    //response for client
    let file = "";
    if (req.url === "/home") {
        file = "../front/home.html";
    } else if (req.url === "/result") {
        file = "../front/result.html";
    } else {
        file = "../front/error.html";
    }

    // read html file and send response
    fs.readFile(file, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });

});

server.listen(5001, "localhost", () => {
    console.log("Listening on port 5001");
});
