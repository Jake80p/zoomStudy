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

function handleConnection(socket){
    console.log(socket);
}

wss.on("connection", (socket) => {
    console.log("Connected to Broswer");
    socket.on("close", () => console.log("Disconnected from the Browser"));
    socket.on("message", () => {console.log(message)});
    socket.send("hello!!");
})



server.listen(3000, handleListen);