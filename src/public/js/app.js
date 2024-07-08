const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("to Server");
});

socket.addEventListener("message", (message) => {
    console.log("New mesasge: ", message.data);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server X");
});

setTimeout(() => {
    socket.send("hello from the browser!");
}, 10000)