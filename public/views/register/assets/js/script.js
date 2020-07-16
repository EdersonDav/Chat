//Animation paramns
var params = {
  container: document.querySelector(".animation"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "./assets/js/chat.json",
};

var anim;
anim = lottie.loadAnimation(params);

let messageToBackEnd = "";
let status = 0;
let name = document.querySelector("#name");
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirmPassword");

//New user
function register() {
  // event.preventDefault();
  let valid = validField();
  if (valid != "Ok") {
    alert(valid);
    return;
  }

  let passwordMatch = validatePassword();
  if (!passwordMatch) {
    alert("Password not Match");
    return;
  }

  let userInfo = {
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value,
  };
  const options = {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(userInfo),
  };
  fetch("http://localhost:5000/register", options)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((resp) => {
      if (status != 200) {
        messageToBackEnd = resp.message;
      } else {
        messageToBackEnd = "User created";
        clearFields();
      }
    });
}

function validatePassword() {
  return password.value == confirmPassword.value;
}

function validField() {
  //get password values
  let error;
  if (name.value.length < 3) {
    error = "Please lengthen name to the minimum 3 characters";
  } else if (username.value.length < 3) {
    error = "Please lengthen username to the minimum 3 characters";
  } else if (password.value.length < 6) {
    error = "Please lengthen password to the minimum 6 characters";
  } else {
    error = `Ok`;
  }
  return error;
}

function clearFields() {
  document.querySelector("#name").value = "";
  document.querySelector("#username").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#confirmPassword").value = "";
}
