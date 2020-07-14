var params = {
  container: document.querySelector(".animation"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "./assets/js/chat.json",
};

var anim;
anim = lottie.loadAnimation(params);
