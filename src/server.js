import http from "http";
import {WebSocket} from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");// 퍼그 설정
app.set("views", __dirname + "/views"); //경로설정
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req,res) => res.render("home"));
app.get("/*", (res,req) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

function onSocketClose () {
    console.log("Disconnected from the Browser")
}

const sockets = [];
wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("Connected to Browser");
    socket.on("close",onSocketClose);
    socket.on("message", (msg) => {
        const message = msg.toString('utf8');
        const messageParsed = JSON.parse(message);
        switch (messageParsed.type) {
            case "new_message" :
                sockets.forEach((aSoket) => aSoket.send(messageParsed.playload));
            case "nickname" :
                socket["nickname"] = messageParsed.playload;
        }
    });
});

server.listen(3000, handleListen);