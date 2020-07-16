//Animation paramns
var animPageParams = {
  container: document.querySelector(".animation"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "./assets/js/chat.json",
};

var animPage;
animPage = lottie.loadAnimation(animPageParams);
animPage.setSpeed(0.8);

var animSuccessParams = {
  container: document.querySelector(".animationSuccess"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "./assets/js/success.json",
};

var animSuccess;
animSuccess = lottie.loadAnimation(animSuccessParams);
animSuccess.setSpeed(0.5);

var animErrorParams = {
  container: document.querySelector(".animationError"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "./assets/js/error.json",
};

var animError;
animError = lottie.loadAnimation(animErrorParams);
animError.setSpeed(0.5);

//Messages
let endMessage = document.querySelector("#endMessage");
let status = 0;

//Input fields
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
        registerError(resp.message);
      } else {
        registerSuccess("User created successfully");
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

function registerError(message) {
  document.querySelector(".animationError").style.display = "none";
  document.querySelector(".animationSuccess").style.display = "none";

  document.querySelector(".animationError").style.display = "block";
  if (endMessage.classList.contains("successTxt")) {
    endMessage.classList.remove("successTxt");
  }
  endMessage.classList.add("errorTxt");
  endMessage.innerHTML = message;
  animError.play();
}

function registerSuccess(message) {
  document.querySelector(".animationError").style.display = "none";
  document.querySelector(".animationSuccess").style.display = "none";

  document.querySelector(".animationSuccess").style.display = "block";
  if (endMessage.classList.contains("errorTxt")) {
    endMessage.classList.remove("errorTxt");
  }
  endMessage.classList.add("successTxt");
  endMessage.innerHTML = message;
  animSuccess.play();
}
