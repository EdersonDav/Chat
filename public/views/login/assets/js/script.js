//Messages
let endMessage = document.querySelector("#endMessage");
let status = 0;

let email = document.querySelector("#email");
let password = document.querySelector("#password");

function loginUser() {
  animationLoading("on");
  loginInfo = {
    email: email.value,
    password: password.value,
  };
  console.log(loginInfo);
  const options = {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
      Accept: "application/json",
    }),
    body: JSON.stringify(loginInfo),
  };
  console.log(JSON.stringify(loginInfo));
  fetch("http://localhost:5000/login", options)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((resp) => {
      console.log("entrou");
      if (status != 200) {
        animationLoading("off");
        registerErrorOrSuccess(resp.message, status);
      } else {
        localStorage.setItem("user", resp.user);
        animationLoading("off");
        location.replace("http://localhost:5000/room");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function registerErrorOrSuccess(message) {
  document.querySelector(".animationError").style.display = "block";
  if (endMessage.classList.contains("successTxt")) {
    endMessage.classList.remove("successTxt");
  }
  endMessage.classList.add("errorTxt");
  endMessage.innerHTML = message;
  animError.play();
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
