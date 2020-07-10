const room = window.location.pathname.replace(/\//g, "");
console.log(room);

const socket = io(`http://localhost:5000/${room}`);

let username = null;

socket.on("update_messages", (messages) => {
  updateMessages(messages);
});

function updateMessages(messages) {
  const div_messages = document.querySelector("#messages");

  let listMessages = "<ul>";
  messages.forEach((message) => {
    console.log(message);

    listMessages += `<li class="they">
                        <span class="username"> 
                          ${message.username}
                        </span> 
                        <span class="msg">
                          ${message.messages}
                        </span>
                      </li>`;
  });
  listMessages += "</ul>";

  div_messages.innerHTML = listMessages;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form_msg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!username) {
      alert("Before entering the chat, register your username");
      return;
    }
    document.querySelector(".name").innerHTML = username;
    const message = document.forms["form_msg_name"]["msg"].value;
    document.forms["form_msg_name"]["msg"].value = "";
    socket.emit("new_connection", { username: username, messages: message });
  });

  const form_user = document.querySelector("#form_user");
  form_user.addEventListener("submit", (e) => {
    e.preventDefault();
    username = document.forms["form_user_name"]["user"].value;
    if (username) {
      form_user.style.display = "none";
    }
  });
});
