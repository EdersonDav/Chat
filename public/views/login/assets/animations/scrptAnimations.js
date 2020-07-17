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
