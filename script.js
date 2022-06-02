const socket = io("http://192.168.1.4:3000");

const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

const appendMessage = (message, userName) => {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.innerText = message;
  messageContainer.appendChild(messageDiv);
};

const name = prompt("what is your name?");

appendMessage("You joined");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});
socket.on("user-connected", (data) => {
  console.log("connected");
  appendMessage(`${data} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", message);
  messageInput.value = "";
  appendMessage(`You: ${message}`);
});
