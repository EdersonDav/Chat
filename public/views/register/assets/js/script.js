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
  let valid = validField();
  if (valid != "Ok") {
    registerErrorOrSuccess(valid, 300);
  }

  let passwordMatch = validatePassword();
  if (!passwordMatch) {
    registerErrorOrSuccess("Password not Match", 300);
    return;
  }
  animationLoading("on");
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
        animationLoading("off");
        registerErrorOrSuccess(resp.message, status);
      } else {
        animationLoading("off");
        registerErrorOrSuccess("User created successfully", status);
        clearFields();
        setTimeout(() => {
          location.replace("http://localhost:5000/");
        }, 3000);
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

function registerErrorOrSuccess(message, status) {
  document.querySelector(".animationError").style.display = "none";
  document.querySelector(".animationSuccess").style.display = "none";

  if (status != 200) {
    document.querySelector(".animationError").style.display = "block";
    if (endMessage.classList.contains("successTxt")) {
      endMessage.classList.remove("successTxt");
    }
    endMessage.classList.add("errorTxt");
    endMessage.innerHTML = message;
    animError.play();
  } else {
    document.querySelector(".animationSuccess").style.display = "block";
    if (endMessage.classList.contains("errorTxt")) {
      endMessage.classList.remove("errorTxt");
    }
    endMessage.classList.add("successTxt");
    endMessage.innerHTML = message;
    animSuccess.play();
  }
}
function animationLoading(status) {
  let btn = document.querySelector("#btn");
  let loading = document.querySelector(".animationloading");

  if (status == "on") {
    btn.style.display = "none";
    loading.style.display = "block";
  } else {
    btn.style.display = "block";
    loading.style.display = "none";
  }
}

function showOrHidePassword(element) {
  let nextElement = element.nextSibling.nextElementSibling;
  if (element.classList.contains("hide")) {
    element.classList.remove("hide");
    element.classList.add("eye");
    hideShow(nextElement);
  } else {
    element.classList.add("hide");
    element.classList.remove("eye");
    hideShow(nextElement);
  }
}

function hideShow(element) {
  if (element.type === "password") {
    element.type = "text";
  } else {
    element.type = "password";
  }
}
