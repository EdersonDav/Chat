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
  console.log("OK");

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
      if (!resp.ok) {
        throw Error(resp.error);
      }
      console.log(resp);
    })
    .catch((error) => {
      console.log(error.message);
    });

  // "name":"Rafaela", 3
  // "username":"Rafa", 3
  // "email":"rafa@gmail.com", 6
  // "password":"123456789"  6
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
