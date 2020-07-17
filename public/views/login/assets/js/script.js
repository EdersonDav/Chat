//Messages
let endMessage = document.querySelector("#endMessage");
let status = 0;

function loginUser() {
  console.log("foi");
  animationLoading("on");
  registerErrorOrSuccess("error test");
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
