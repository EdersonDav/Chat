//Page register
var animPageParams = {
  container: document.querySelector(".animation"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "./assets/animations/chat.json",
};

var animPage;
animPage = lottie.loadAnimation(animPageParams);
animPage.setSpeed(0.8);

//Success
var animSuccessParams = {
  container: document.querySelector(".animationSuccess"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "./assets/animations/success.json",
};

var animSuccess;
animSuccess = lottie.loadAnimation(animSuccessParams);
animSuccess.setSpeed(0.5);

//Error
var animErrorParams = {
  container: document.querySelector(".animationError"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "./assets/animations/error.json",
};

var animError;
animError = lottie.loadAnimation(animErrorParams);
animError.setSpeed(0.5);

//Loading
var loadingParams = {
  container: document.querySelector(".animationloading"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "./assets/animations/loading.json",
};

var animloading;
animloading = lottie.loadAnimation(loadingParams);
animloading.setSpeed(1);
