const socket = io(`http://localhost:5000/room`);

let username = null;

socket.on("update_messages", (messages) => {
  updateMessages(messages);
});

function updateMessages(messages) {
  const div_messages = document.querySelector("#messages");

  let listMessages = "<ul>";
  messages.forEach((message) => {
    console.log(message);

    let classLi = setClass(message.username);

    listMessages += `<li class="${classLi}">
                        <span class="username usernamegl"> 
                          ${message.username}
                        </span> 
                        <span class="msg msggl">
                          ${message.messages}
                        </span>
                      </li>`;
  });
  listMessages += "</ul>";

  div_messages.innerHTML = listMessages;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form_msg");
  username = localStorage.getItem("user");
  if (!username) {
    location.replace("http://localhost:5000");
  }
  document.querySelector(".name").innerHTML = username;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = document.forms["form_msg_name"]["msg"].value;
    document.forms["form_msg_name"]["msg"].value = "";
    socket.emit("new_connection", { username: username, messages: message });
  });
});

function setClass(user) {
  if (user == username) {
    return "you";
  } else {
    return "they";
  }
}
