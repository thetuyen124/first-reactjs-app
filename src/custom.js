var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-200px";
  }
  if (currentScrollPos > 100) {
    document.getElementById("navbar").style.backgroundColor =
      "rgb(0, 0, 0, 0.6)";
  } else {
    document.getElementById("navbar").style.backgroundColor = "unset";
  }
  prevScrollpos = currentScrollPos;
};
