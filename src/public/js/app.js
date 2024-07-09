const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage (type, playload) {
    const msg = {type, playload };
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
    console.log("New message: ", message.data);
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server X");
});

function handleSumit(event){
    event.preventDefault();
    const  input = messageForm.querySelector("input");
    socket.send(makeMessage("new_messgae", input.value));
    input.value = ""
}

function handleNickSumit (event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
}

messageForm.addEventListener("submit", handleSumit);
nickForm.addEventListener("submit", handleNickSumit)