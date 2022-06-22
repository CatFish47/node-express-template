var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
var path = require("path");

var app = express();

var server = http.createServer(app);

var port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

function startServer() {
    app.use(bodyParser.json({ limit: "16mb" }));
    app.use(express.static(path.join(__dirname, "public")));

    app.get("/", (req, res, next) => {
        var filePath = path.join(__dirname, "./index.html");
        res.sendFile(filePath);
    });

    app.post("/", (req, res, next) => {
        console.log(req.body);
        res.send("OK");
    });

    server.on("listening", () => {
        var addr = server.address(),
            bind =
                typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
        console.log("Listening on " + bind);
    });

    server.listen(port);
}

startServer();
