var params = {
  container: document.querySelector(".animation"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "chat.json",
};

var anim;
anim = lottie.loadAnimation(params);
