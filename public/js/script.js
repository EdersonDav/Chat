const socket = io("http://localhost:5000");

socket.on("update_messages", (messages) => {
  updateMessages(messages);
});

function updateMessages(messages) {
  const div_messages = document.querySelector("#messages");

  let listMessages = "<ul>";
  messages.forEach((message) => {
    listMessages += `<li>${message}</li>`;
  });
  listMessages += "</ul>";

  div_messages.innerHTML = listMessages;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form_msg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = document.forms["form_msg_name"]["msg"].value;
    document.forms["form_msg_name"]["msg"].value = "";
    socket.emit("new_connection", { messages: message });
    console.log(message);
  });
});
